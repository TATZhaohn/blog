# TAT趙 的个人博客

基于 [Hexo 8](https://hexo.io/) + [Butterfly 5.7](https://butterfly.js.org/) 的静态博客，通过 GitHub Actions 自动构建并部署到 GitHub Pages，自定义域名 **tatzhao.top**。

- 线上地址：<https://tatzhao.top>
- GitHub 仓库：<https://github.com/TATZhaohn/blog>（建议 public，免费账户私有仓库无法使用 Pages）

## 目录结构

```
blog/
├─ _config.yml              # Hexo 站点配置（标题/作者/url/语言/永久链接）
├─ _config.butterfly.yml    # Butterfly 主题配置（导航/社交/深色/代码/搜索/页脚/Giscus 预留）
├─ package.json             # 依赖与脚本（npm run build 对应 hexo generate）
├─ package-lock.json        # 锁定版本，CI 用 npm ci 安装
├─ source/
│  ├─ _posts/               # 文章（Markdown）
│  ├─ tags/index.md         # 标签页（type: tags）
│  ├─ categories/index.md   # 分类页（type: categories）
│  └─ CNAME                 # 自定义域名：tatzhao.top
├─ themes/butterfly/        # 主题源文件（已删除 .git，跟随仓库提交）
├─ .github/workflows/pages.yml  # 自动部署工作流
└─ public/                  # 构建产物（不提交，由 CI 生成）
```

## 本地开发

环境要求：Node.js 20+、npm（或 pnpm）、Git。

```bash
npm install        # 安装依赖
npm run clean      # 清理 public/ 与缓存
npm run server     # 本地预览，默认 http://localhost:4000
npm run build      # 生成静态文件到 public/
```

> ⚠️ 本仓库最初在一台没有系统级 Node/npm 的 Windows 机器上搭建（仅 DSH 内置 Node v24 + 自解压 npm 可用），当时通过仓库上一级的 `scripts/env.sh` 注入 PATH 后再执行 npm。正常环境不需要这个脚本，直接 `npm install` 即可。

## 内容管理

新建文章：

```bash
npx hexo new "文章标题"
```

生成文件位于 `source/_posts/文章标题.md`，写完 Markdown 后在 front-matter 中补充分类/标签：

```yaml
---
title: 文章标题
date: 2026-10-20 20:00:00
categories:
  - 折腾记录
tags:
  - Hexo
  - 博客
---
```

新建独立页面（如「关于」）：

```bash
npx hexo new page about      # 生成 source/about/index.md
```

在 front-matter 里加 `type: about` 可让 Butterfly 使用关于页模板。

## 配置说明

### `_config.yml`（站点级）

| 配置 | 当前值 | 说明 |
| --- | --- | --- |
| `title` | `TAT趙` | 站点标题 |
| `author` | `TAT趙` | 作者 |
| `language` | `zh-CN` | 界面语言 |
| `timezone` | `Asia/Shanghai` | 时区 |
| `url` | `https://tatzhao.top` | 站点根地址（影响所有绝对链接） |
| `theme` | `butterfly` | 主题 |
| `syntax_highlighter` | `prismjs` | 代码高亮引擎 |

> 若以后改用 `https://TATZhaohn.github.io/blog` 访问，需要把 `url` 改为该地址、`root` 改为 `/blog/`，并删除 `source/CNAME`，否则资源路径会 404/白屏。

### `_config.butterfly.yml`（主题级）

已配置：

- **导航栏**：首页 / 标签 / 分类 / 归档
- **社交图标**：GitHub、Bilibili、Makerworld、嘉立创（OSHUB），带品牌色
- **作者卡片**：描述、GitHub 关注按钮
- **深色模式**：`autoChangeMode: 1`（跟随系统，右上角可手动切换）
- **代码块**：`theme: light`，工具栏显示语言与复制按钮
- **目录 TOC**：文章页开启
- **本地搜索**：`search.use: local_search`，预加载
- **字数统计**：`wordcount.enable: true`（依赖 `hexo-wordcount`）
- **页脚**：博主版权（`since: 2026`）+ 主题/框架版本
- **Giscus 评论**：已预留注入位（默认未启用），启用步骤见 [DEPLOY.md](DEPLOY.md)

## 变量速查

| 项目 | 值 |
| --- | --- |
| 仓库 | `TATZhaohn/blog` |
| 域名 | `tatzhao.top` |
| 署名 | TAT趙 |
| GitHub | <https://github.com/TATZhaohn> |
| Bilibili | <https://space.bilibili.com/324056528> |
| Makerworld | <https://makerworld.com.cn/@TATZhao> |
| 嘉立创 OSHUB | <https://oshwhub.com/tatzhao> |

## 部署

Push 到 `main` 分支后，GitHub Actions 自动执行 `npm ci` → `npm run build` → 部署到 GitHub Pages。首次配置、自定义域名、HTTPS、Giscus 启用与常见故障排查见 [DEPLOY.md](DEPLOY.md)。

## 当前待办

- [ ] 用 Giscus 启用评论（填写 repo / repo_id / category_id 并设 `comments.use: Giscus`）
- [ ] 替换默认 favicon 与头像（`img/favicon.png`、`img/butterfly-icon.png` 占位文件）
- [ ] 删除或改写 Hexo 自带的 Hello World 示例文章
- [ ] 补充「关于」页与友链（可选）
