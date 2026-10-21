# TAT趙の小站

个人站点源码 —— 基于 [Hexo 8](https://hexo.io/) + [Butterfly 5.7](https://butterfly.js.org/) 的静态博客，通过 GitHub Actions 自动构建并部署到 GitHub Pages，自定义域名 **tatzhao.top**。

- 线上地址：<https://tatzhao.top>
- 仓库：<https://github.com/TATZhaohn/blog>
- 作者：TAT趙（Maker / 硬件 / 开源项目记录）

## 站点内容

站点不只是文章列表，把散落在各平台的作品汇总成了 7 个板块：

| 板块 | 路径 | 内容 | 数量 |
| --- | --- | --- | --- |
| 首页 | `/` | 站内板块入口 + 最新视频 + 最新文章 | — |
| 视频 | `/videos/` | B 站投稿卡片墙，点卡片直接跳 B 站 | 251 条 |
| GitHub | `/projects/` | 公开仓库介绍文章 | 3 篇 |
| 3D 模型 | `/models/` | MakerWorld 模型介绍文章 | 13 篇 |
| 硬件项目 | `/hardware/` | 嘉立创 OSHUB 开源工程介绍文章 | 3 篇 |
| 壁纸 | `/wallpapers/` | 自用壁纸分享（静态图 / Wallpaper Engine 两类） | 持续更新 |
| 时间轴 | `/timeline/` | 按月汇总全站更新（视频 / 项目 / 模型 / 硬件） | — |

各板块卡片都支持排序切换（按日期 / 播放量 / Star / 用量等，再点一次切换升/降序）。

## 目录结构

```
blog/
├─ _config.yml                # Hexo 站点配置（标题/作者/url/永久链接/搜索）
├─ _config.butterfly.yml      # Butterfly 配置 + 大量自定义（见「主题定制」）
├─ package.json               # 依赖与脚本
├─ scripts/
│  └─ search-videos.js        # 构建时把视频条目合并进 search.xml
├─ source/
│  ├─ _data/
│  │  ├─ home_sections.yml    # 首页「站内板块」数据（名称/图标/数量/链接）
│  │  ├─ home_videos.yml      # 首页「最新视频」数据（6 条）
│  │  └─ videos-search.json   # 全量视频搜索数据（251 条）
│  ├─ _posts/
│  │  ├─ github/              # GitHub 项目文章（3 篇）
│  │  ├─ models/              # 3D 模型文章（13 篇）
│  │  ├─ hardware/            # 硬件项目文章（3 篇）
│  │  └─ hello-world.md       # 建站示例文章
│  ├─ videos/index.md         # 视频卡片墙
│  ├─ projects/index.md       # GitHub 板块页
│  ├─ models/index.md         # 3D 模型板块页
│  ├─ hardware/index.md       # 硬件板块页
│  ├─ wallpapers/index.md     # 壁纸页
│  ├─ timeline/index.md       # 时间轴页
│  ├─ img/
│  │  ├─ covers/              # 各类封面（video / github / makerworld / oshub）
│  │  ├─ wallpapers/          # 壁纸原图
│  │  ├─ avatar.webp          # 头像
│  │  ├─ favicon*.png         # 站点图标（16/32/64/180）
│  │  └─ top-plain.png        # 文章页顶部纯色遮罩图
│  ├─ categories/index.md     # 分类页
│  ├─ tags/index.md           # 标签页
│  └─ CNAME                   # tatzhao.top
├─ themes/butterfly/          # 主题源码（含 3 处本地定制，见下）
├─ .github/workflows/pages.yml  # 自动部署工作流
└─ public/                    # 构建产物（不提交）
```

## 内容维护

### 视频（251 条）

`source/videos/index.md` 是脚本生成后写入的静态 HTML 卡片墙，每张卡带 `id="BV号"` 锚点。视频数据来自 B 站：

- 全量数据 `source/_data/videos-search.json`（251 条：id / title / desc / url / date / season）
- 首页 6 条最新视频在 `source/_data/home_videos.yml`

要加新视频：取到 `bvid`、标题、封面（存 `source/img/covers/video-<bvid>.jpg`）、简介、播放量、发布日期，同步更新三个文件后重新构建。

### GitHub / 3D 模型 / 硬件（共 19 篇文章）

每项一篇文章，front-matter 需带 `permalink` 指定 URL（否则会按默认永久链接生成导致板块页卡片 404）：

```yaml
---
title: 项目名
date: 2026-10-20 12:00:00
categories:
  - GitHub项目        # 或 3D模型 / 硬件项目
tags:
  - ESP32
permalink: projects/仓库名/    # 或 models/<id>/ / hardware/<slug>/
cover: /img/covers/github/xxx.svg
description: 一句话介绍（列表页显示）
top_img: /img/top-plain.png
toc: true
---
```

文章正文建议结构：引用块（仓库/平台信息）→ 封面图 → 项目简介 → 功能特点 → 相关链接。硬件文章还会挂「相关视频」列表。

### 壁纸

`source/wallpapers/index.md` 里分「静态图片」和「Wallpaper Engine 动态壁纸」两类。图片放 `source/img/wallpapers/`，**按 `年-月` 命名**（如 `2026-10.webp`），卡片写法：

```html
<a class="wallpaper-item" href="/img/wallpapers/2026-10.webp" target="_blank">
  <img src="/img/wallpapers/2026-10.webp" alt="2026-10" loading="lazy">
  <span>2026-10</span>
</a>
```

### 时间轴

`source/timeline/index.md` 用 Butterfly 内建的 `{% timeline %}` 标签，按月分组，每个月份节点里列出该月新增的视频/项目/模型。新增内容后补一行即可：

```markdown
{% timeline 2026, #49b1f5 %}
<!-- timeline 10 月 -->
- 10-20 GitHub 项目：本站源码
- 10-12 3D 模型：P2S 辅助散热器
<!-- endtimeline %}
{% endtimeline %}
```

## 本地开发

环境要求：Node.js 20+、npm。

```bash
npm install        # 安装依赖
npm run clean      # 清理 public/ 与缓存
npm run server     # 本地预览，默认 http://localhost:4000
npm run build      # 生成静态文件到 public/
```

> 搜索索引里的视频条目由 `scripts/search-videos.js` 在构建结束时合并，**必须走完整的 `hexo generate` 流程**才会生成；只看旧产物会缺视频。

## 构建与部署

Push 到 `main` 后，GitHub Actions（`.github/workflows/pages.yml`）执行 `npm ci` → `hexo generate` → 部署到 GitHub Pages。首次配置、自定义域名、HTTPS 与故障排查见 [DEPLOY.md](DEPLOY.md)。

### 搜索为什么能搜到视频

Butterfly 的本地搜索默认只索引文章（`_config.yml` 里 `search.field: post`），视频是页面内容、不是文章，所以搜不到。这里用构建脚本补上：

- `scripts/search-videos.js` 监听 **`hexo.on('exit')`**（不能用 `after_generate` —— 那时路由还没落盘，`hexo clean` 后文件不存在会静默跳过）
- 构建产物 `public/search.xml` 生成后，把 `source/_data/videos-search.json` 里的 251 条视频以 `<entry data-video-entry="1">` 形式插入 `</search>` 之前
- 视频 URL 指向 `/videos/#BV号`，点搜索结果直接定位到对应卡片

## 主题定制

### `_config.butterfly.yml` 的 `inject.head`（大部分自定义都在这里）

- 顶部 header 半透明灰底（浅色 `rgba(128,128,128,.4)`，深色 `rgba(0,0,0,.5)`；首页 banner 深色下压暗到 `.85`）
- 首页 banner 顶部 22% 黑色遮罩（白字可读）
- 全局卡片墙样式（`.work-card` / `.works-page` / `.wallpaper-*` / `.home-section-*`）
- 板块页排序按钮 `.sort-bar` + 排序脚本
- 搜索弹窗美化
- 手机端优化（社交图标圆底、banner 高度、单列布局），标记为 `/* MOBILE-OPT-2026 */`
- favicon 的 3 个 `<link>`（**属性必须用单引号**：inject.head 是 YAML 双引号字符串，双引号会破坏 YAML）

### 主题源文件改动（升级主题时需要重新打补丁）

| 文件 | 改动 |
| --- | --- |
| `themes/butterfly/layout/includes/home-sections.pug` | 新增：首页「站内板块 + 最新视频」区块模板 |
| `themes/butterfly/layout/includes/layout.pug` | 在 header 与 `main` 之间插入该区块（判断用 `globalPageType === 'home'`，`pageType` 在这里恒为 `page`） |
| `themes/butterfly/languages/zh-CN.yml` | `hits_stats` 文案改成「共找到 N 条结果」 |

## 配置速查

| 项目 | 值 |
| --- | --- |
| 站点标题 | TAT趙の小站 |
| 域名 | tatzhao.top |
| 永久链接 | `:year/:month/:day/:title/`（文章另有 `permalink` 覆盖） |
| 时区 | Asia/Shanghai |
| 评论 | 未启用（Giscus 预留，步骤见 [DEPLOY.md](DEPLOY.md)） |
| GitHub | <https://github.com/TATZhaohn> |
| Bilibili | <https://space.bilibili.com/324056528> |
| MakerWorld | <https://makerworld.com.cn/@TATZhao> |
| 嘉立创 OSHUB | <https://oshwhub.com/tatzhao> |

## 待办

- [ ] 用 Giscus 启用评论
- [ ] 补全 B 站剩余 21 条早期视频（272 条中已采 251 条，其余受平台风控限制）
- [ ] 壁纸板块持续补充
