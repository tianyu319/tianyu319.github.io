# 张天宇 · 个人视觉设计网站

基于 8B Design Studio 模板，采用橙色主题。

页面源文件与部署文件均为 `dist/index.html`，CSS 和 JavaScript 内嵌。图片位于 `dist/assets/`。无需安装依赖或构建。

本地预览：`python3 -m http.server 4173 --directory dist`

保留模板的滚动动画；配图均为示意，不代表个人作品。个人照片与标志由网站所有者提供。

模板来源：https://github.com/8bsite/design-studio-website-template
许可与图片来源见 LICENSE、CREDITS.md。

## 作品案例页

`dist/works.html` 为作品浏览页。样式和交互分别位于 `dist/assets/works.css`、`dist/assets/works.js`。

案例内容在 `dist/assets/projects.json` 中管理：id 为唯一英文标识，category 可选 poster / commerce / brand / social；title、image、focus、description 分别对应标题、图片、设计方向与案例说明。替换真实作品时，同时更新页面和弹窗中的示意声明，保留尚未替换素材的明确标注。

## 免费 GitHub Pages 托管

公开仓库可使用 GitHub Free 的 Pages。上传后到 Settings → Pages，将 Source 设为 GitHub Actions；推送 main 分支会将 dist/ 部署到 /unoehc/tianyu/。示例网址格式：https://ztyu3191-ux.github.io/unoehc/tianyu/（尚未部署，不是已上线地址）。

该版本已将字体改为本地资源。不包含 Sites 内部项目配置、Git 历史、凭据或令牌。GitHub Pages 的大陆访问质量需上线后实测，不能保证所有运营商均稳定访问。
