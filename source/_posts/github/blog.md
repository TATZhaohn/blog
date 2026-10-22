---
title: "本站源码（Hexo + Butterfly）"
date: 2026-10-20 12:00:00
categories:
  - GitHub项目
tags: ["JavaScript", "GitHub"]
permalink: projects/blog/
cover: /img/covers/github/blog.svg
description: "基于 Hexo 8 + Butterfly 5.7 的静态博客，通过 GitHub Actions 自动构建并部署到 GitHub Pages，自定义域名 tatzhao.top。 - 线上地址：<https://tatzhao.top …"
top_img: /img/top-plain.png
toc: true
---
> 仓库：[blog](https://github.com/TATZhaohn/blog) · 语言 **JavaScript** · 更新于 2026-10-20

<img src="/img/covers/github/blog.svg" alt="本站源码（Hexo + Butterfly）" style="width:100%;border-radius:10px">

## 这是什么

这个博客站点的全部源码。基于 **Hexo 8.1.2 + Butterfly 5.7.0** 的静态博客，push 到 main 由 GitHub Actions 自动构建并部署到 GitHub Pages，绑定自定义域名 [tatzhao.top](https://tatzhao.top)。

## 技术栈

| 组件 | 说明 |
| --- | --- |
| Hexo 8.1.2 | 静态站点生成器 |
| Butterfly 5.7.0 | 主题：深色模式、本地搜索、pjax、timeline 标签 |
| GitHub Actions | push 到 main 自动构建部署 |
| GitHub Pages | 托管 + 自定义域名 |

## 目录结构

- `_config.yml` — Hexo 站点配置（标题 / 作者 / url / 永久链接）
- `_config.butterfly.yml` — 主题配置（导航 / 社交 / 深色 / 代码 / 搜索 / 页脚）
- `source/_posts/` — 文章；`source/{videos,projects,models,hardware,wallpapers,timeline}/` — 板块页
- `themes/butterfly/` — 主题（含自定义首页板块与布局钩子）
- `.github/workflows/pages.yml` — 自动部署流水线

## 本地跑起来

```bash

npm ci

npx hexo server    # http://localhost:4000

```

构建产物在 `public/`，执行 `npx hexo generate` 即可生成。

## 相关链接

- 🔗 [GitHub 仓库](https://github.com/TATZhaohn/blog)