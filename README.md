# 董冉 · 内容策划作品集

静态个人作品集，包含四个项目、旅行相册与播客订阅。

本地开发：`npm run dev`，默认端口 3000。无需安装依赖。

GitHub Pages：Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save。

网站入口为 `index.html`，个人生活页为 `life.html`。全部图片使用仓库内的相对路径。

旅行地图使用本地 Natural Earth 1:110m 陆地数据（public domain），由 Canvas 绘制正射投影地球，无需外部地图服务或密钥。

Cloudflare Workers：仓库包含 `wrangler.jsonc`，`npx wrangler deploy` 会自动执行 `npm run build`，仅将 `dist/` 中的网页与资源发布。不要使用 `--assets .`，也不要将资源目录设置成仓库根目录。若面板已有该参数，将部署命令改为 `npx wrangler deploy`。

Cloudflare Pages：构建命令 `npm run build`，输出目录 `dist`。
