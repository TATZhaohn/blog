# 部署说明（GitHub Pages + 自定义域名）

> 版本信息：Hexo 8.1.2 / Butterfly v5.7.0（master commit `f223b1888b42b2b336068e6c959ed90a3cd7c8f3`，2026-08-04）/ hexo-generator-searchdb 1.5.0。

> 本文件面向「把本仓库发布到线上」的操作者。所有敏感凭据（PAT、SSH key、Giscus 值）都只在本地/浏览器使用，**不要写进仓库**。

## 0. 一次性准备

1. 在 GitHub 创建仓库 `TATZhaohn/blog`，**Public 可见性**（免费账户的 Pages 仅支持公开仓库）。
2. 仓库 Settings → **Pages** → Build and deployment → Source 选择 **GitHub Actions**。
3. 域名 `tatzhao.top` 在 DNS 服务商处准备解析（见第 3 节）。

## 1. 首次推送

本机已初始化 Git 仓库并提交到 `main` 分支。推送前先确认 Git 身份（仓库级即可，不污染全局）：

```bash
cd blog
git config user.name "TAT 趙"
git config user.email "TATZhaohn@users.noreply.github.com"   # 可换成你 GitHub 账号的 noreply 邮箱
```

### 方式 A：HTTPS + 个人访问令牌（PAT）

在 GitHub → Settings → Developer settings → Personal access tokens 生成一个 fine-grained token，权限勾选目标仓库的 **Contents: Read and write**（以及推送 `main` 所需的最小权限）。

```bash
git remote add origin https://github.com/TATZhaohn/blog.git
git push -u origin main
# 用户名为 TATZhaohn，密码处粘贴 PAT
```

> 也可让 Git 凭据管理器记住：`git config --global credential.helper manager`（Windows）/ `osxkeychain`（macOS）。

### 方式 B：SSH

```bash
git remote add origin git@github.com:TATZhaohn/blog.git
git push -u origin main
```

（需先在 GitHub 配置 SSH 公钥。）

推送成功后，仓库 Actions 页面应出现 **Deploy Hexo to GitHub Pages** 工作流，`build` 与 `deploy` 两个 job 均变绿。

## 2. 工作流说明

`.github/workflows/pages.yml`：

- 触发：push 到 `main`、手动 `workflow_dispatch`
- 权限：`contents: read`、`pages: write`、`id-token: write`
- 构建：`actions/setup-node@v4`（Node 20）+ `npm ci`（依赖 `package-lock.json`）+ `npx hexo generate`
- 部署：`actions/upload-pages-artifact@v3` → `actions/deploy-pages@v4`，产物目录 `./public`
- 并发组 `pages`，`cancel-in-progress: false`（正在运行的部署不会被新推送取消）

> **注意**：`npm ci` 要求 `package-lock.json` 与 `package.json` 完全一致；改动依赖后务必本地跑一次 `npm install` 并提交新 lock 文件，否则 CI 会报 `npm ci can only install packages when your package.json and package-lock.json are in sync`。

## 3. 自定义域名 tatzhao.top

仓库内 `source/CNAME` 内容为 `tatzhao.top`，构建时会复制到 `public/CNAME` 并随部署发布。

DNS 解析（二选一）：

- **CNAME**：`tatzhao.top` → `TATZhaohn.github.io`（部分 DNS 商不允许根域名 CNAME，用下面的 A 记录）
- **A 记录**：`tatzhao.top` → GitHub Pages 的四个 IP（以 GitHub 官方文档为准）：
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **AAAA**（可选，IPv6）：`2606:50c0:8000::153`、`2606:50c0:8001::153`、`2606:50c0:8002::153`、`2606:50c0:8003::153`

然后在仓库 Settings → Pages → **Custom domain** 填入 `tatzhao.top` 并保存；等 DNS 生效（分钟级到 24 小时）后勾选 **Enforce HTTPS**。

> GitHub 的 Custom domain 设置会自动生成/更新 `CNAME` 文件；若页面提示 `CNAME already taken`，说明该域名被其他仓库占用，需先在旧仓库移除。

## 4. 本地预览

```bash
cd blog
npm install
npm run server        # 或 npx hexo server --port 4000
```

构建检查：

```bash
npx hexo generate
```

## 5. 启用 Giscus 评论（当前未启用）

1. 在 <https://giscus.app> 用 GitHub 账号完成配置：选择仓库 `TATZhaohn/blog`、Discussion 分类（需先在仓库 Settings → General → Features 勾选 Discussions 并创建分类，如 `Announcements`）。
2. 复制生成的 `data-repo`、`data-repo-id`、`data-category`、`data-category-id`。
3. 编辑 `_config.butterfly.yml`：
   - 把 `comments.use` 从空改为 `Giscus`
   - 在 `inject.head` 中取消 `<script async src="https://giscus.app/client.js" ...>` 那行注释，替换 `YOUR_REPO` / `YOUR_REPO_ID` / `YOUR_CATEGORY_ID` 三个占位符
4. 本地 `npx hexo generate` 确认无报错后提交。

## 6. 常见故障排查

| 现象 | 原因与处理 |
| --- | --- |
| Actions 红叉在 `npm ci` | lock 与 package.json 不同步：本地 `npm install` 后提交 `package-lock.json`；或删除 lock 重新生成。 |
| Actions 红叉在 build | 看日志具体报错；常见为 Node 版本过低（workflow 已固定 20）、主题文件缺失（`themes/butterfly` 是否提交）。 |
| 页面 404 / 白屏 | `_config.yml` 的 `url` 与 `root` 不匹配自定义域名；资源路径以 `/` 开头，未配置 CNAME/域名时会指向 GitHub 根域。 |
| 自定义域名显示 `Domain's DNS record could not be retrieved` | DNS 未生效或记录类型/值不对；等待或按第 3 节修正。 |
| `Enforce HTTPS` 无法勾选 | 等证书签发（域名解析正确后通常几分钟到几小时）；或先保存 Custom domain 再刷新。 |
| 新文章没更新到线上 | 确认 push 到 `main`（不是其他分支）；Actions 是否成功；浏览器强刷缓存。 |
| 搜索无结果 | `search.use: local_search` 与 `hexo-generator-searchdb` 插件需同时生效，构建后 `public/search.xml` 应存在（`_config.yml` 的 `search.path` 决定文件名）。 |

## 7. 回滚

在 GitHub 仓库的 **Deployments** 或 Actions 历史中重新运行此前成功的部署，或在本地 `git revert` 后重新 push。
