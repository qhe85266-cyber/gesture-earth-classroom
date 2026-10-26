export type Landmark = {x:number;y:number;z?:number};
export type GestureResult = {mode:'waiting'|'paused'|'rotate'|'zoom';dx:number;dy:number;zoom:number};
const distance=(a:Landmark,b:Landmark)=>Math.hypot(a.x-b.x,a.y-b.y);
const clamp=(n:number,min:number,max:number)=>Math.max(min,Math.min(max,n));
export class GestureEngine {
  private previous:{x:number;y:number;distance:number;mode:string}|null=null;
  reset(){this.previous=null;}
  update(hands:Landmark[][]):GestureResult {
    const result:GestureResult={mode:'waiting',dx:0,dy:0,zoom:0};
    if(!hands.length||hands.some(h=>h.length!==21||h.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))){this.reset();return result;}
    const palm=(h:Landmark[])=>({x:(h[0].x+h[5].x+h[9].x+h[13].x+h[17].x)/5,y:(h[0].y+h[5].y+h[9].y+h[13].y+h[17].y)/5});
    const isOpen=(h:Landmark[])=>{const size=distance(h[0],h[9]);return size>=0.015&&[8,12,16,20].filter(i=>distance(h[0],h[i])>distance(h[0],h[i-2])*1.15&&distance(h[0],h[i])>size*1.25).length>=3;};
    const a=palm(hands[0]);
    if(hands.some(h=>!isOpen(h))){this.reset();result.mode='paused';return result;}
    if(hands.length>=2){
      const d=distance(a,palm(hands[1]));result.mode='zoom';
      if(this.previous?.mode==='zoom'&&this.previous.distance>0.04&&d>0.04){const delta=Math.log(d/this.previous.distance);result.zoom=Math.abs(delta)>0.008?clamp(delta,-0.12,0.12)*0.65:0;}
      this.previous={...a,distance:d,mode:'zoom'};return result;
    }
    result.mode='rotate';
    if(this.previous?.mode==='rotate'){
      const dx=a.x-this.previous.x,dy=a.y-this.previous.y;
      // Ignore discontinuities (occlusion or a different hand) and cap per-frame motion.
      if(Math.hypot(dx,dy)<0.15){result.dx=Math.abs(dx)>0.002?clamp(dx,-0.035,0.035)*0.55:0;result.dy=Math.abs(dy)>0.002?clamp(dy,-0.035,0.035)*0.55:0;}
    }
    this.previous={...a,distance:0,mode:'rotate'};return result;
  }
}
