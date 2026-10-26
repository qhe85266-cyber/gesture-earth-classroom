import {useEffect,useRef,useState} from 'react';
import {Camera,CameraOff,Hand,LoaderCircle,LockKeyhole,MoveHorizontal,Pause} from 'lucide-react';
import {GestureEngine,type GestureResult} from './gesture';
const base=import.meta.env.BASE_URL;
const modeText={waiting:'等待手掌进入画面',paused:'已暂停 · 张开手掌继续',rotate:'单手旋转',zoom:'双手缩放'};
export default function HandControl({onGesture}:{onGesture:(r:GestureResult)=>void}){
 const [enabled,setEnabled]=useState(false),[attempt,setAttempt]=useState(0),[status,setStatus]=useState('摄像头未开启'),[error,setError]=useState(''),[ready,setReady]=useState(false),[gestureMode,setGestureMode]=useState<GestureResult['mode']>('waiting');
 const video=useRef<HTMLVideoElement>(null),canvas=useRef<HTMLCanvasElement>(null),callback=useRef(onGesture);callback.current=onGesture;
 useEffect(()=>{
  if(!enabled)return;
  let cancelled=false,stream:MediaStream|null=null,tracker:import('@mediapipe/tasks-vision').HandLandmarker|null=null,raf=0,last=0,lastVideo=-1;
  const engine=new GestureEngine();
  const dispose=()=>{cancelAnimationFrame(raf);const ownedStream=stream;stream=null;ownedStream?.getTracks().forEach(t=>t.stop());if(video.current?.srcObject===ownedStream)video.current.srcObject=null;const ownedTracker=tracker;tracker=null;try{ownedTracker?.close();}finally{engine.reset();if(video.current?.srcObject===null)canvas.current?.getContext('2d')?.clearRect(0,0,320,240);}};
  const fail=(e:unknown)=>{if(cancelled)return;dispose();setReady(false);setStatus('摄像头不可用');const name=e instanceof Error?e.name:'';const message=e instanceof Error?e.message:'';setError(message==='SecureContextRequired'?'当前页面无法使用摄像头。请通过 HTTPS 或本机 localhost 打开；鼠标操作仍可使用。':name==='NotAllowedError'?'摄像头权限未获允许。请在地址栏权限设置中允许后重试；鼠标操作仍可使用。':name==='NotFoundError'?'未找到摄像头。请连接摄像头后重试。':name==='NotReadableError'?'摄像头可能被其他程序占用，请关闭相关程序后重试。':'手势初始化或识别失败，请重试。你仍可通过鼠标操作地球。');};
  async function start(){
   try{
    setError('');setReady(false);setStatus('正在准备手势识别…');
    if(!navigator.mediaDevices?.getUserMedia)throw new Error('SecureContextRequired');
    const vision=await import('@mediapipe/tasks-vision');
    if(cancelled)return;
    const files=await vision.FilesetResolver.forVisionTasks(`${base}wasm`);
    if(cancelled)return;
    const options={baseOptions:{modelAssetPath:`${base}models/hand_landmarker.task`,delegate:'GPU' as const},runningMode:'VIDEO' as const,numHands:2,minHandDetectionConfidence:0.6,minHandPresenceConfidence:0.6,minTrackingConfidence:0.6};
    try{tracker=await vision.HandLandmarker.createFromOptions(files,options);}catch{if(cancelled)return;tracker=await vision.HandLandmarker.createFromOptions(files,{...options,baseOptions:{...options.baseOptions,delegate:'CPU'}});}
    if(cancelled){dispose();return;}
    setStatus('等待摄像头授权…');
    const acquired=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:480},facingMode:'user'},audio:false});
    if(cancelled){acquired.getTracks().forEach(t=>t.stop());dispose();return;}
    stream=acquired;stream.getVideoTracks().forEach(t=>t.addEventListener('ended',()=>{if(!cancelled)fail(new Error('CameraEnded'));}));
    const v=video.current;if(!v){dispose();return;}v.srcObject=stream;await v.play();
    if(cancelled){dispose();return;}
    setReady(true);setStatus(modeText.waiting);
    function frame(now:number){
     if(cancelled)return;
     try{
      if(document.hidden){engine.reset();lastVideo=-1;}
      else if(v&&tracker&&v.readyState>=2&&now-last>=55&&v.currentTime!==lastVideo){
       last=now;lastVideo=v.currentTime;
       const prediction=tracker.detectForVideo(v,now);const result=engine.update(prediction.landmarks);callback.current(result);setGestureMode(result.mode);setStatus(prev=>prev===modeText[result.mode]?prev:modeText[result.mode]);
       const ctx=canvas.current?.getContext('2d');if(ctx){ctx.clearRect(0,0,320,240);ctx.strokeStyle='#a5e5cf';ctx.fillStyle='#d8fff1';ctx.lineWidth=2;for(const hand of prediction.landmarks){for(const {start,end} of vision.HandLandmarker.HAND_CONNECTIONS){ctx.beginPath();ctx.moveTo(hand[start].x*320,hand[start].y*240);ctx.lineTo(hand[end].x*320,hand[end].y*240);ctx.stroke();}for(const pt of hand){ctx.beginPath();ctx.arc(pt.x*320,pt.y*240,2.5,0,Math.PI*2);ctx.fill();}}}
      }
      raf=requestAnimationFrame(frame);
     }catch(e){fail(e);}
    }
    raf=requestAnimationFrame(frame);
   }catch(e){fail(e);}
  }
  void start();return()=>{cancelled=true;dispose();};
 },[enabled,attempt]);
 return <section className="camera-card" aria-label="手势控制">
  <div className="section-heading"><span className="section-icon"><Hand size={18}/></span><h2>隔空操控</h2><span className={`camera-badge ${ready?'active':''}`}><i/>{ready?'实时识别':error&&enabled?'连接失败':'待开启'}</span></div>
  <div className={`camera-preview ${enabled?'show':''}`}><video ref={video} playsInline muted/><canvas ref={canvas} width={320} height={240}/>{enabled&&!ready&&!error&&<div className="camera-loading"><LoaderCircle className="spin"/><span>{status}</span></div>}</div>
  <p className="camera-status" role="status">{enabled?status:'伸出手，让世界靠近。'}</p>
  {error&&enabled&&<p role="alert" className="error-message">{error}</p>}
  <div className="gesture-guide">
   <div className={`gesture-step ${ready&&gestureMode==='rotate'?'is-active':''}`}><span className="gesture-icon"><Hand size={18}/></span><span><b>张开手掌并移动</b><small>单手旋转地球</small></span></div>
   <div className={`gesture-step ${ready&&gestureMode==='zoom'?'is-active':''}`}><span className="gesture-icon"><MoveHorizontal size={18}/></span><span><b>双手拉开 / 靠近</b><small>双手缩放地球</small></span></div>
   <div className={`gesture-step ${ready&&gestureMode==='paused'?'is-active':''}`}><span className="gesture-icon"><Pause size={18}/></span><span><b>握拳或移出画面</b><small>暂停手势操作</small></span></div>
  </div>
  <button className={enabled?'secondary wide camera-toggle':'primary wide camera-toggle'} onClick={()=>{setEnabled(!enabled);setError('');setReady(false);setGestureMode('waiting');}}>{enabled?<CameraOff size={17}/>:<Camera size={17}/>} {enabled?'关闭摄像头':'开启摄像头体验'}</button>
  {enabled&&error&&<button className="text-button" onClick={()=>setAttempt(a=>a+1)}>重新尝试</button>}
  <small className="camera-privacy"><LockKeyhole size={12}/> 本机识别 · 画面不上传</small>
 </section>;
}
