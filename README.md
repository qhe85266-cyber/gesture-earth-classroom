# 地理视界 · Gesture Earth

用鼠标或摄像头手势探索三维地球的课堂展示工具。基于 React、TypeScript、react-globe.gl / Three.js 和 MediaPipe，支持纯静态部署。

**在线体验：[gesture-earth-classroom.pages.dev](https://gesture-earth-classroom.pages.dev/)**

## 功能

- 三维地球：NASA Blue Marble 自然地表、黑色背景与蓝色大气效果。
- 中国 34 个省级行政区检索、选中与资料展示。
- 亚洲 49 个国家课堂条目，支持首都位置与区域名称标注。
- 教学图层：省级区划、世界国界、经纬网、特殊纬线、山脉与高原、主要河流。
- 鼠标旋转与缩放，全球 / 中国 / 亚洲视角，以及全屏和专注展示。
- 摄像头手势：单手张掌移动旋转，双手张掌拉开 / 靠近缩放，握拳或移出画面暂停。
- 可滚动的操作说明和数据来源弹窗；打开文档时隐藏地球标签，避免遮挡内容。

摄像头默认关闭。视频帧在当前设备的浏览器中处理，不上传、不保存；无需后端、账号或 API 密钥。已取消单手拇指 / 食指缩放。

## 本地运行

需要 Node.js 22 LTS、npm，以及支持 WebGL 的现代浏览器。课堂目标设备为 Windows + Chrome / Edge。

```sh
npm ci
npm run dev
```

开发地址：`http://127.0.0.1:5173/`。

```sh
npm run build
node scripts/serve.mjs --open
```

构建输出位于 `dist/`，本地预览地址为 `http://127.0.0.1:4173/`。构建后也可以双击仓库中的 Windows / macOS 本地预览启动文件。请通过 HTTP 服务访问，不能直接用 `file://` 打开 `index.html`。

## 操作方式

| 操作 | 效果 |
| --- | --- |
| 鼠标左键拖动 / 滚轮 | 旋转 / 缩放地球 |
| 点击区域或检索条目 | 定位并查看资料 |
| 单手张掌后缓慢移动 | 旋转地球 |
| 双手张掌拉开 / 靠近 | 放大 / 缩小地球 |
| 握拳或手移出画面 | 暂停手势 |
| `R` / `H` / `Esc` | 复位中国视角 / 切换专注展示 / 关闭说明或退出专注 |

手势需要摄像头授权和良好照明。首次开启会加载仓库自带的模型与 WASM 文件；性能取决于设备。线上摄像头需要 HTTPS，本地可使用 localhost。

## 静态部署

1. 执行 `npm ci` 和 `npm run build`。
2. 将 `dist/` 里的内容上传到 Cloudflare Pages、EdgeOne Pages 或其他静态托管服务。
3. ZIP 上传时，确保 `index.html` 位于压缩包根目录；同时保留 `assets/`、`data/`、`models/`、`textures/`、`wasm/`。
4. 使用 HTTPS，并确认模型与 `.wasm` 请求返回正确的文件和 MIME 类型，而非首页 HTML。

项目使用相对资源路径，不依赖运行时外部 CDN。托管不需要常驻 Node.js 服务。Cloudflare Pages 通过 Git 构建时，构建命令为 `npm run build`，输出目录为 `dist`；现有在线站点采用手动上传，新提交不会自动发布。

构建成功后，可运行 `python3 scripts/package-local.py` 生成本地验收包。`outputs/`、`dist/` 和依赖缓存不纳入版本控制。

## 验证

```sh
npm run build
./node_modules/.bin/tsc src/gesture.ts --outDir work/test-build --target es2022 --module es2022 --skipLibCheck
node tests/gesture.mjs
node tests/static-server.mjs
```

测试覆盖手势模式切换、双手缩放、暂停、异常输入、单手双指不触发缩放，以及本地静态服务路径与资源类型。

## 项目结构

```text
src/                    界面、地球渲染、手势和地理目录
public/data/            中国与世界 GeoJSON
public/models/          MediaPipe 手部识别模型
public/wasm/            MediaPipe 浏览器运行资源
public/textures/        地球贴图与来源说明
scripts/                静态预览与本地打包
tests/                 手势与静态服务回归
docs/                  架构与地理数据核验记录
THIRD-PARTY-NOTICES.md   第三方组件和素材说明
```

## 数据与素材

地表使用 NASA Blue Marble Next Generation 的 2004 年 7 月历史合成影像。世界轮廓来自 Natural Earth 1:110m，中国省级边界来自阿里云 DataV GeoAtlas 候选数据。河流为概化线路，地形使用位置标注，不能用于精确测量。

当前版本用于地理概览与互动展示，不能代替审定教学地图。边界表达、数据时效和精度的核验情况见 [地理数据核验记录](docs/数据核验.md)；课堂使用请结合审定教材。

组件与素材声明见 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)，地球贴图来源见 [ATTRIBUTION.md](public/textures/ATTRIBUTION.md)。
