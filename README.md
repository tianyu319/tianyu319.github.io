# 张天宇 · 个人视觉设计网站

基于 8B Design Studio 模板，采用橙色主题。

页面源文件与部署文件均为 `dist/index.html`，CSS 和 JavaScript 内嵌。图片位于 `dist/assets/`。无需安装依赖或构建。

本地预览：`python3 -m http.server 4173 --directory dist`

保留模板的滚动动画；首页模板配图为示意；作品案例页已导入网站所有者提供的作品素材。个人照片与标志同样由网站所有者提供。

模板来源：https://github.com/8bsite/design-studio-website-template
许可与图片来源见 LICENSE、CREDITS.md。

## 作品案例页

`dist/works.html` 为作品浏览页。样式和交互分别位于 `dist/assets/works.css`、`dist/assets/works.js`。

案例内容在 `dist/assets/projects.json` 中管理：id 为唯一英文标识，category 可选 poster / commerce / brand / local / packaging / illustration / social；title、image、focus、description 分别对应标题、图片、设计方向与案例说明。替换真实作品时，同时更新页面和弹窗中的示意声明，保留尚未替换素材的明确标注。

## 免费 GitHub Pages 托管

仓库为 tianyu319/tianyu319.github.io，使用 GitHub Actions 部署 GitHub Pages。推送 main 分支后自动发布 dist/，同时保留根路径与 /tianyu/ 路径。网站地址：https://tianyu319.github.io/。

该版本已将字体改为本地资源。不包含 Sites 内部项目配置、Git 历史、凭据或令牌。GitHub Pages 的大陆访问质量需上线后实测，不能保证所有运营商均稳定访问。
