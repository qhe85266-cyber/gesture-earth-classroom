import {useLayoutEffect,useRef} from 'react';
import {createPortal} from 'react-dom';
import {BookOpen,Camera,Compass,Hand,LockKeyhole,MousePointer2,X} from 'lucide-react';

type Props={kind:'help'|'sources';onClose:()=>void};
export default function ReadingDialog({kind,onClose}:Props){
 const dialog=useRef<HTMLDialogElement>(null);
 const isHelp=kind==='help';
 useLayoutEffect(()=>{
  const element=dialog.current;if(!element)return;
  const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const overflow=document.body.style.overflow;
  // Native modal dialogs live in the browser top layer, above CSS2D globe labels.
  element.showModal();document.body.style.overflow='hidden';
  return()=>{element.close();document.body.style.overflow=overflow;previous?.focus();};
 },[]);
 return createPortal(<dialog ref={dialog} className="reading-dialog" aria-labelledby="reading-title" onKeyDown={event=>{if(event.key!=='Tab')return;const buttons=Array.from(dialog.current?.querySelectorAll<HTMLElement>('button,a[href],input,select,textarea,[tabindex="0"]')??[]);if(!buttons.length)return;const first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
  <article className="reading-sheet">
   <header className="reading-header"><span className="reading-symbol">{isHelp?<Compass size={23}/>:<BookOpen size={23}/>}</span><div><p className="eyebrow">{isHelp?'开始探索':'地图资料'}</p><h2 id="reading-title">{isHelp?'操作指南':'数据来源与使用说明'}</h2></div><button className="icon-button" aria-label="关闭说明" autoFocus onClick={onClose}><X size={21}/></button></header>
   <div className="reading-body">{isHelp?<>
    <p className="reading-intro">选择你习惯的方式，把世界带进课堂。</p>
    <div className="instruction-columns"><section><div className="instruction-heading"><MousePointer2 size={20}/><h3>鼠标与键盘</h3></div><dl className="instruction-list"><div><dt>拖动地球</dt><dd>旋转视角</dd></div><div><dt>滚轮 / ＋ / －</dt><dd>放大或缩小</dd></div><div><dt>点击区域或标签</dt><dd>查看区域资料</dd></div><div><dt><kbd>R</kbd></dt><dd>复位到中国</dd></div><div><dt><kbd>H</kbd></dt><dd>切换专注展示</dd></div><div><dt><kbd>Esc</kbd></dt><dd>关闭说明或退出专注</dd></div></dl></section><section><div className="instruction-heading"><Hand size={20}/><h3>摄像头手势</h3></div><dl className="instruction-list"><div><dt>单手张开并移动</dt><dd>旋转地球</dd></div><div><dt>双手张掌拉开 / 靠近</dt><dd>放大 / 缩小</dd></div><div><dt>握拳或移出画面</dt><dd>暂停操作</dd></div></dl><p className="instruction-tip">保持正面照明，让手掌完整入镜。双手缩放时，请同时张开两个手掌。</p></section></div>
    <div className="reading-privacy"><LockKeyhole size={18}/><p>开启摄像头后才开始识别。图像只在当前浏览器处理，不上传、不保存；鼠标始终可用。</p></div>
   </>:<>
    <p className="reading-intro">了解地图的来源，也了解它适合怎样使用。</p>
    <section className="source-section"><span className="source-number">01</span><div><h3>自然地表</h3><p>NASA Earth Observatory · Blue Marble Next Generation，2004 年 7 月合成影像，包含地形与海底地形明暗。用于展示自然地貌，属于历史概览纹理，并非实时卫星影像。</p></div></section>
    <section className="source-section"><span className="source-number">02</span><div><h3>行政区与世界轮廓</h3><p>世界轮廓来自 Natural Earth 1:110m 公有领域概览数据；中国省级边界使用阿里云 DataV GeoAtlas 候选数据。两类数据精度不同，尚未完成地图审定、坐标系一致性及全部边界表达核验。</p></div></section>
    <section className="source-section"><span className="source-number">03</span><div><h3>教学图层</h3><p>山脉与高原为位置标注，河流为概化示意线路，不用于精确测量。亚洲目录包含跨洲国家；小区域可通过检索定位。特殊首都说明保留在区域资料中。</p></div></section>
    <div className="reading-notice"><BookOpen size={19}/><div><strong>课堂使用请结合审定教材</strong><p>当前版本是地理概览与互动展示工具，不作为正式审定教学地图。</p></div></div>
    <div className="reading-meta"><span>数据整理 · 2026-10-25</span><span>React · Three.js · MediaPipe</span></div>
   </>}</div>
   <footer className="reading-footer"><span><Camera size={14}/> 摄像头画面仅在本机处理</span><button className="primary" onClick={onClose}>返回地球 <span aria-hidden="true">↗</span></button></footer>
  </article>
 </dialog>,document.body);
}
