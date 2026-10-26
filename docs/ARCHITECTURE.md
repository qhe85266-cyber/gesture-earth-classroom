# 技术结构

## 运行方式

React + TypeScript + Vite 构建浏览器应用，react-globe.gl / Three.js 渲染 WebGL 地球，MediaPipe Tasks Vision 在用户授权摄像头后处理手部关键点。应用没有后台服务、账号、数据库或 API 密钥。

地图、地球纹理、识别模型、WASM 均随仓库提供，构建后复制到同源静态目录。手势识别资源在开启摄像头时加载，摄像头默认关闭，关闭后释放媒体流。

## 主要模块

| 文件 | 职责 |
| --- | --- |
| src/App.tsx | 数据加载、教学图层、区域检索、应用状态与快捷键 |
| src/GlobeView.tsx | 地球、边界、教学要素、镜头控制、标签避让与复用 |
| src/HandControl.tsx | 摄像头生命周期、MediaPipe 初始化与识别循环 |
| src/gesture.ts | 关键点到旋转 / 双手缩放 / 暂停的状态转换 |
| src/ReadingDialog.tsx | 使用原生 dialog 顶层显示可读文档并管理键盘焦点 |
| src/regionCatalog.ts | 省级行政区与亚洲国家的检索目录及详情 |
| src/geography.ts | 教学地形、河流与特殊纬线的概化展示数据 |
| src/style.css | 黑色课堂展示界面与响应式面板布局 |

## 标签与弹窗

地球标签通过稳定的 DOM 工厂和节点复用创建，避免帧率统计或选中状态更新时清空重建。标签进行可见半球判断、优先级排序与碰撞避让。原生文档弹窗打开时隐藏地球标签，关闭后恢复。

## 构建与部署

npm run build 执行 TypeScript 检查并输出 dist/。Vite 的 base 为相对路径。服务器仅提供静态文件，摄像头线上使用需要 HTTPS。

仓库包含复现所需的模型、纹理与 WASM 二进制，最大的单个资源约 10.64 MiB。无需 Git LFS，也不需要在网站使用者设备上安装开发环境。

scripts/serve.mjs 仅供本地预览，默认监听 127.0.0.1:4173，为 WASM 与模型提供文件类型，不将不存在的二进制请求回退为首页 HTML。

## 验证边界

自动回归覆盖手势逻辑和静态服务。真实摄像头、Windows 设备、投影与学校网络需现场验证。地理数据属于概览示意，来源和核验限制见 数据核验.md。
