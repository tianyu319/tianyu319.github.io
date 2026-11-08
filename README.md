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

## 手机图片优化

首页与作品页在899px及以下屏幕宽度时通过picture/source加载640px宽的WebP版本（quality 68），桌面端继续使用原图；作品大图查看保留原始图片。资源位于dist/assets/mobile/，清单与体积统计在manifest.json。更新图片后运行python3 scripts/build-mobile-images.py，再运行python3 scripts/sync-preview.py。

## 音乐播放与上传

播放器使用本地分发的 APlayer v1.10.1。悬浮窗在首页、作品页和音乐管理页显示，默认不自动播放、不预下载音频；支持暂停、歌单、进度和音量。管理入口为music.html。上传歌曲到dist/assets/music/并提交，Pages工作流会运行scripts/build-music-library.py生成公共歌单。仅选择本机文件为试听，不会上传；大部分浏览器需要用户点击后才播放。页面跳转会暂停音乐，返回后保留公共歌单的曲目与进度。
本地双击预览前，运行python3 scripts/build-music-library.py同步内嵌歌单。歌曲音频不内置示例，等待网站所有者上传。
