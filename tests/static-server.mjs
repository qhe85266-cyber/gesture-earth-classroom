import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';
// Run from another directory to catch launcher/path regressions.
const script=fileURLToPath(new URL('../scripts/serve.mjs',import.meta.url));
const child=spawn(process.execPath,[script],{cwd:'/tmp',env:{...process.env,PORT:'43179'},stdio:['ignore','pipe','pipe']});
try{
 await Promise.race([once(child.stdout,'data'),once(child,'exit').then(()=>{throw new Error('Preview failed to start');}),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Preview startup timeout')),5000).unref())]);
 const base='http://127.0.0.1:43179';
 const page=await fetch(base);assert.equal(page.status,200);assert.match(await page.text(),/Gesture Earth/);
 const missing=await fetch(base+'/models/missing.task');assert.equal(missing.status,404);assert.doesNotMatch(await missing.text(),/<html/i);
 const wasm=await fetch(base+'/wasm/vision_wasm_internal.wasm');assert.equal(wasm.status,200);assert.equal(wasm.headers.get('content-type'),'application/wasm');assert.equal((await wasm.arrayBuffer()).byteLength>1000000,true);
 const model=await fetch(base+'/models/hand_landmarker.task');assert.equal(model.status,200);assert.equal((await model.arrayBuffer()).byteLength>7000000,true);
 const surface=await fetch(base+'/textures/earth-blue-marble-july.jpg');assert.equal(surface.status,200);assert.equal(surface.headers.get('content-type'),'image/jpeg');assert.equal((await surface.arrayBuffer()).byteLength>1000000,true);
 console.log('PASS: earth texture, preview outside project directory, page, resource 404, WASM MIME and model');
}finally{child.kill();}
