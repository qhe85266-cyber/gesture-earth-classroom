import assert from 'node:assert/strict';
import {GestureEngine} from '../work/test-build/gesture.js';
const hand=(x=0,open=true)=>{const h=Array.from({length:21},()=>({x:.4+x,y:.6}));h[0]={x:.4+x,y:.8};for(const i of [5,9,13,17])h[i]={x:.4+x+(i-9)*.005,y:.65};for(const i of [8,12,16,20]){h[i-2]={x:.4+x,y:.55};h[i]={x:.4+x,y:open?.3:.68};}return h;};
const e=new GestureEngine();
assert.equal(e.update([]).mode,'waiting');
assert.equal(e.update([hand()]).dx,0);
assert.ok(e.update([hand(.02)]).dx>0);
assert.equal(e.update([hand(.02,false)]).mode,'paused');
assert.equal(e.update([hand(.03)]).dx,0);
e.reset();e.update([hand(-.1),hand(.1)]);assert.ok(e.update([hand(-.15),hand(.15)]).zoom>0);
assert.equal(e.update([hand(-.2,false),hand(.2,false)]).mode,'paused');
assert.equal(e.update([hand(-.2),hand(.2,false)]).zoom,0);
assert.equal(e.update([[{x:NaN,y:0}]]).mode,'waiting');
e.reset();e.update([hand()]);assert.equal(e.update([hand(.3)]).dx,0);
console.log('PASS: gesture motion, pause, mode reset, zoom, invalid input and discontinuity');

// A single two-finger pose must remain paused even while the fingertips move.
const twoFingers=(gap=.1)=>{
 const h=hand(0,false);
 h[6]={x:.4,y:.51};h[8]={x:.4,y:.43};h[4]={x:.4+gap,y:.43};
 return h;
};
e.reset();
for(const gap of [.08,.15,.03]){
 const result=e.update([twoFingers(gap)]);
 assert.equal(result.mode,'paused');
 assert.equal(result.zoom,0,'single-hand fingertip movement never zooms');
 assert.equal(result.dx,0);assert.equal(result.dy,0);
}
assert.equal(e.update([hand()]).dx,0,'two-finger pause resets rotation baseline');
e.reset();e.update([hand(-.1),hand(.1)]);
assert.ok(e.update([hand(-.15),hand(.15)]).zoom>0);
assert.equal(e.update([twoFingers()]).zoom,0,'single two-finger pose stops two-hand zoom');
assert.equal(e.update([hand(-.1),hand(.1)]).zoom,0,'resuming two-hand zoom resets baseline');
assert.ok(e.update([hand(-.05),hand(.05)]).zoom<0,'two palms moving together zoom out');
assert.equal(e.update([twoFingers(),hand(.2)]).mode,'paused');
assert.equal(e.update([]).zoom,0,'lost hands stop zoom');
assert.equal(e.update([hand(-.1),hand(.1)]).zoom,0,'lost hands reset zoom baseline');
console.log('PASS: single two-finger exclusion, two-palm zoom directions and pause transitions');
