import {forwardRef,memo,useCallback,useEffect,useImperativeHandle,useMemo,useRef,useState} from 'react';
import Globe,{type GlobeMethods} from 'react-globe.gl';
import {AmbientLight,DirectionalLight,MeshPhongMaterial,TextureLoader,SRGBColorSpace,type Texture} from 'three';
import {grid,specials,rivers,type GeoPath,type Label} from './geography';
import type {GestureResult} from './gesture';
export type Feature={type:'Feature';geometry:{type:string;coordinates:unknown};properties:Record<string,unknown>;id?:string;name?:string;lat?:number;lng?:number;kind?:string};
export type Layers={china:boolean;names:boolean;countries:boolean;capitals:boolean;grid:boolean;special:boolean;terrain:boolean;rivers:boolean};
export type Place={id:string;name:string;lat:number;lng:number;kind:string;labelLat?:number;labelLng?:number;capital?:string;description?:string;detail?:string;feature?:Feature;aliases?:string[]};
export type GlobeHandle={fly:(p:Partial<{lat:number;lng:number;altitude:number}>)=>void;zoom:(factor:number)=>void;gesture:(r:GestureResult)=>void};
export type GlobeProps={world:Feature[];provinces:Feature[];auxiliary:Feature[];layers:Layers;places:Place[];selected:Place|null;annotationsVisible:boolean;onSelect:(p:Place)=>void;onReady:()=>void;onMetrics:(v:{fps:number;drawCalls:number})=>void};
const asFeature=(o:object)=>o as Feature;
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const surfaceUrl=`${import.meta.env.BASE_URL}textures/earth-blue-marble-july.jpg`;
const labelLatitude=(o:object)=>(o as Place).labelLat??(o as Place).lat;
const labelLongitude=(o:object)=>(o as Place).labelLng??(o as Place).lng;
const setLabelHemisphereVisibility=(el:HTMLElement,visible:boolean)=>{el.dataset.visible=String(visible);el.style.visibility=visible?'visible':'hidden';};
const chinaIds=new Set(['CHN','TWN','HKG','MAC']);
const GlobeView=forwardRef<GlobeHandle,GlobeProps>(function GlobeView({world,provinces,auxiliary,layers,places,selected,annotationsVisible,onSelect,onReady,onMetrics},ref){
 const mount=useRef<HTMLDivElement>(null),globe=useRef<GlobeMethods|undefined>(undefined);const [size,setSize]=useState({width:800,height:700});const [ready,setReady]=useState(false);const [hover,setHover]=useState<string|null>(null);const [contextLost,setContextLost]=useState(false);
 const [surface,setSurface]=useState<Texture|null>(null),[surfaceError,setSurfaceError]=useState(false);
 useEffect(()=>{let cancelled=false,loaded:Texture|undefined;const timer=setTimeout(()=>{if(!cancelled)setSurfaceError(true);},20000);new TextureLoader().load(surfaceUrl,texture=>{clearTimeout(timer);if(cancelled){texture.dispose();return;}loaded=texture;texture.colorSpace=SRGBColorSpace;setSurface(texture);},undefined,()=>{clearTimeout(timer);if(!cancelled)setSurfaceError(true);});return()=>{cancelled=true;clearTimeout(timer);loaded?.dispose();};},[]);
 const material=useMemo(()=>new MeshPhongMaterial({color:'#ffffff',map:surface,shininess:6,specular:'#14243a'}),[surface]);
 useEffect(()=>()=>material.dispose(),[material]);
 useEffect(()=>{if(!mount.current)return;const observer=new ResizeObserver(entries=>{const r=entries[0].contentRect;setSize({width:Math.round(r.width),height:Math.round(r.height)});});observer.observe(mount.current);return()=>observer.disconnect();},[surface]);
 const id=(f:Feature)=>String(f.properties.adcode??f.properties.ADM0_A3??f.id);
 const selectLabel=useRef(onSelect),selectedId=useRef(selected?.id),labelSerial=useRef(0);
 selectLabel.current=onSelect;selectedId.current=selected?.id;
 // three-globe clears all CSS2D objects whenever htmlElement changes identity.
 // Keep the factory stable across hover, telemetry and camera status updates.
 const createLabel=useCallback((o:object)=>{
  const p=o as Place,el=document.createElement('button');
  el.className=`map-label ${p.kind} ${selectedId.current===p.id?'selected':''}`;
  el.textContent=p.name;el.dataset.placeId=p.id;el.dataset.kind=p.kind;
  el.dataset.labelInstance=String(++labelSerial.current);
  el.dataset.priority=selectedId.current===p.id?'0':p.kind==='province'?'1':'2';
  el.title=p.capital?`${p.name} · ${p.capital}`:p.name;
  // Start hidden until its first measured collision pass; never flash a new batch.
  el.style.opacity='0';el.style.pointerEvents='none';
  el.addEventListener('click',event=>{event.stopPropagation();selectLabel.current(p);});
  return el;
 },[]);
 useEffect(()=>{mount.current?.querySelectorAll<HTMLElement>('.map-label').forEach(el=>{
  const active=el.dataset.placeId===selected?.id;el.classList.toggle('selected',active);
  el.dataset.priority=active?'0':el.dataset.kind==='province'?'1':'2';
 });},[selected?.id]);
 const handleReady=useCallback(()=>{setReady(true);onReady();},[onReady]);
 const polygons=useMemo(()=>[...world.filter(f=>!chinaIds.has(String(f.properties.ADM0_A3))),...(layers.china?provinces:world.filter(f=>chinaIds.has(String(f.properties.ADM0_A3))))],[world,provinces,layers.china]);
 const paths=useMemo(()=>{
  const result:GeoPath[]=[...(layers.grid?grid:[]),...(layers.special?specials:[]),...(layers.rivers?rivers:[])];
  // Boundary auxiliaries are kept distinct from the 34 administrative regions.
  if(layers.china)for(const f of auxiliary){const polygons=f.geometry.type==='MultiPolygon'?f.geometry.coordinates as number[][][][]:[f.geometry.coordinates as number[][][]];for(const polygon of polygons)for(const ring of polygon)result.push({name:'边界辅助线',kind:'grid',points:ring.map(([lng,lat])=>[lat,lng])});}
  return result;
 },[layers.grid,layers.special,layers.rivers,layers.china,auxiliary]);
 const labels=useMemo(()=>{
  const result:Place[]=[];
  if(!annotationsVisible)return result;
  for(const p of places){
   if(p.kind==='province'&&layers.china&&layers.names)result.push(p);
   else if(p.kind==='country'&&layers.countries&&layers.names&&(!layers.china||p.id!=='CHN'))result.push(p);
   else if(p.kind==='capital'&&layers.capitals)result.push(p);
   else if(p.kind==='terrain'&&layers.terrain)result.push(p);
   else if(p.kind==='river'&&layers.rivers)result.push(p);
   else if(p.kind==='special'&&layers.special)result.push(p);
  }
  return result;
 },[places,layers,annotationsVisible]);
 function fly(p:Partial<{lat:number;lng:number;altitude:number}>){globe.current?.pointOfView(p,700);}
 useImperativeHandle(ref,()=>({fly,zoom(factor){const g=globe.current;if(g)g.pointOfView({altitude:Math.max(0.45,Math.min(4,g.pointOfView().altitude*factor))},250);},gesture(r){const g=globe.current;if(!g)return;const p=g.pointOfView();if(r.mode==='rotate')g.pointOfView({lat:Math.max(-82,Math.min(82,p.lat+r.dy*150)),lng:((p.lng+r.dx*200+540)%360)-180},0);else if(r.mode==='zoom')g.pointOfView({altitude:Math.max(0.45,Math.min(4,p.altitude*Math.exp(-r.zoom)))},0);}}),[]);
 useEffect(()=>{if(!ready||!globe.current)return;const g=globe.current;const light=new DirectionalLight('#ffffff',1.65);light.position.copy(g.camera().position);light.position.y+=100;g.lights([new AmbientLight('#ffffff',1.65),light]);if(material.map)material.map.anisotropy=Math.min(8,g.renderer().capabilities.getMaxAnisotropy());g.renderer().setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));g.controls().minDistance=145;g.controls().maxDistance=500;g.pointOfView({lat:30,lng:105,altitude:2},0);
  const canvas=g.renderer().domElement;const lost=(event:Event)=>{event.preventDefault();setContextLost(true);};canvas.addEventListener('webglcontextlost',lost);
  let frames=0,start=performance.now(),raf=0,lastLabels=0;const frame=(now:number)=>{frames++;light.position.copy(g.camera().position);light.position.y+=100;light.position.x-=60;
   if(now-lastLabels>240&&mount.current){lastLabels=now;const used:DOMRect[]=[];const bounds=mount.current.getBoundingClientRect();
    const els=Array.from(mount.current.querySelectorAll<HTMLElement>('.map-label')).sort((a,b)=>Number(a.dataset.priority)-Number(b.dataset.priority)||Number(b.style.opacity==='1')-Number(a.style.opacity==='1')); 
    for(const el of els){
     if(el.dataset.visible!=='true')continue;
     const b=el.getBoundingClientRect(),retained=el.style.opacity==='1';
     // Wider clearance for newly admitted labels keeps close neighbours from swapping.
     const gap=retained?2:5;
     const blocked=b.width===0||b.height===0||b.left<bounds.left+4||b.right>bounds.right-4||b.top<bounds.top+46||b.bottom>bounds.bottom-70||used.some(r=>b.left<r.right+gap&&b.right>r.left-gap&&b.top<r.bottom+gap&&b.bottom>r.top-gap);
     const opacity=blocked?'0':'1';
     if(el.style.opacity!==opacity){el.style.opacity=opacity;el.style.pointerEvents=blocked?'none':'auto';}
     if(!blocked)used.push(b);
    }
   }if(now-start>=2000){onMetrics({fps:Math.round(frames*1000/(now-start)),drawCalls:g.renderer().info.render.calls});frames=0;start=now;}raf=requestAnimationFrame(frame);};raf=requestAnimationFrame(frame);return()=>{cancelAnimationFrame(raf);canvas.removeEventListener('webglcontextlost',lost);};
 },[ready,onMetrics,material]);
 const selectable=(f:Feature)=>places.find(p=>p.id===id(f));
 if(contextLost)throw new Error('WebGL context lost');
 if(surfaceError)throw new Error('Earth surface texture failed to load');
 if(!surface)return null;
 return <div className="globe-mount" ref={mount}><Globe ref={globe} width={size.width} height={size.height} backgroundColor="#000000" globeMaterial={material} atmosphereColor="#5b9bdc" atmosphereAltitude={0.065} globeCurvatureResolution={2} animateIn={false} onGlobeReady={handleReady} polygonsData={polygons} polygonGeoJsonGeometry={o=>asFeature(o).geometry as never} polygonAltitude={0.003} polygonCapColor={o=>{const f=asFeature(o),key=id(f);if(selected?.id===key)return 'rgba(73,177,255,0.22)';if(hover===key&&selectable(f))return 'rgba(150,208,255,0.09)';return 'rgba(0,0,0,0)';}} polygonSideColor={()=>'rgba(0,0,0,0)'} polygonStrokeColor={o=>selected?.id===id(asFeature(o))?'#8ed6ff':asFeature(o).properties.adcode?'rgba(222,239,255,0.26)':layers.countries?'rgba(207,226,243,0.21)':'rgba(0,0,0,0)'} polygonCapCurvatureResolution={2} polygonsTransitionDuration={0} polygonLabel={o=>{const p=selectable(asFeature(o));return p?`<div class="map-tooltip">${escape(p.name)}</div>`:'';}} onPolygonHover={o=>setHover(o?id(asFeature(o)):null)} onPolygonClick={o=>{const p=selectable(asFeature(o));if(p)onSelect(p);}} pathsData={paths} pathPoints={o=>(o as GeoPath).points} pathPointLat={p=>(p as number[])[0]} pathPointLng={p=>(p as number[])[1]} pathColor={(o:object)=>(o as GeoPath).kind==='river'?'#7bd8f0':(o as GeoPath).kind==='special'?'#ecc986':'rgba(190,222,223,0.24)'} pathStroke={o=>(o as GeoPath).kind==='grid'?0.35:1.1} pathResolution={2} pathPointAlt={0.009} pathTransitionDuration={0} htmlElementsData={labels} htmlLat={labelLatitude} htmlLng={labelLongitude} htmlAltitude={0.012} htmlElement={createLabel} htmlElementVisibilityModifier={setLabelHemisphereVisibility} htmlTransitionDuration={0}/></div>;
});
export default memo(GlobeView);
