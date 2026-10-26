import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
const root=fileURLToPath(new URL('../dist/',import.meta.url)),port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.wasm':'application/wasm','.task':'application/octet-stream','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png'};
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');let path=resolve(root,'.'+decodeURIComponent(url.pathname));
  if(path!==resolve(root)&&!path.startsWith(resolve(root)+sep)){res.writeHead(403).end();return;}
  if((await stat(path)).isDirectory())path=resolve(path,'index.html');
  const data=await readFile(path);
  res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(data);
 }catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Not found');}
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`端口 ${port} 已被占用，请关闭之前的预览窗口后重试。`:'本地服务启动失败，请检查 dist 文件夹与端口设置。');process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>{
 const url=`http://127.0.0.1:${port}`;console.log(`Gesture Earth 本地预览：${url}\n关闭此窗口即可停止。`);
 if(process.argv.includes('--open')){
  const [command,args]=process.platform==='darwin'?['open',[url]]:process.platform==='win32'?['cmd',['/c','start','',url]]:['xdg-open',[url]];
  const browser=spawn(command,args,{stdio:'ignore'});browser.on('error',()=>console.log('请手动打开上面的本地地址。'));
 }
});
