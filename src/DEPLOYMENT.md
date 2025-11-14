# Homecoming Website - GitHub Pages 部署指南

## ⚠️ 重要说明

由于本项目使用了 **Supabase 后端服务**（Community 页面的反馈存储功能），GitHub Pages 作为静态托管服务无法直接支持后端功能。

### 两种部署方案：

---

## 方案A：完整功能部署（推荐）

保留所有功能，包括 Community 页面的数据存储。

### 推荐平台：
- **Vercel** (推荐)
- **Netlify**
- **Cloudflare Pages**

### Vercel 部署步骤：

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Import Project"
4. 选择你的 `-web-page` 仓库
5. Vercel 会自动检测项目配置
6. 添加环境变量（在 Settings -> Environment Variables）：
   ```
   SUPABASE_URL=你的Supabase URL
   SUPABASE_ANON_KEY=你的Supabase匿名密钥
   SUPABASE_SERVICE_ROLE_KEY=你的Supabase服务密钥
   SUPABASE_DB_URL=你的Supabase数据库URL
   ```
7. 点击 "Deploy"

**优点**：
- ✅ 保留所有功能
- ✅ 自动部署（push 到 GitHub 自动更新）
- ✅ 免费额度充足
- ✅ 支持自定义域名

---

## 方案B：GitHub Pages 部署（仅前端展示）

如果你只想展示网站界面，可以使用 GitHub Pages，但 **Community 页面的提交功能将不可用**。

### GitHub Pages 部署步骤：

#### 步骤 1：准备仓库

确保你的仓库名称是：`你的用户名.github.io` 或者使用项目页面模式。

从截图看你的仓库名是 `-web-page`，所以访问地址会是：
```
https://你的用户名.github.io/-web-page/
```

#### 步骤 2：修改配置

在你的本地项目中，如果有 `vite.config.ts` 或类似配置文件，需要设置 base 路径：

```typescript
// vite.config.ts
export default {
  base: '/-web-page/', // 你的仓库名
}
```

#### 步骤 3：构建项目

在本地运行构建命令（通常是）：
```bash
npm run build
# 或
yarn build
```

这会生成一个 `dist` 文件夹。

#### 步骤 4：部署到 GitHub Pages

**方法1：使用 GitHub Actions（自动部署）**

创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

提交并 push 到 GitHub 后，GitHub Actions 会自动构建并部署。

**方法2：手动部署**

```bash
# 安装 gh-pages 工具
npm install -g gh-pages

# 部署 dist 文件夹
gh-pages -d dist
```

#### 步骤 5：启用 GitHub Pages

1. 进入仓库 Settings -> Pages
2. Source 选择 `gh-pages` 分支
3. 保存

几分钟后，你的网站就会在以下地址可用：
```
https://你的用户名.github.io/-web-page/
```

---

## ⚠️ GitHub Pages 限制说明

如果选择 GitHub Pages：

1. **Community 页面** - 用户提交的反馈不会被保存
2. **Supabase 功能** - 所有后端功能将无法使用
3. **仅展示用途** - 适合作为设计作品集展示

---

## 🎯 我的建议

**如果你想要完整功能**：
- 使用 **Vercel**（部署超简单，5分钟搞定）

**如果只是展示设计作品**：
- 使用 **GitHub Pages**（免费，但功能受限）

---

## 需要帮助？

告诉我你选择哪个方案，我可以帮你：
1. 创建所需的配置文件
2. 修改代码以适应部署平台
3. 提供详细的操作步骤

---

## 快速决策

回答以下问题：
1. 你需要 Community 页面的提交功能吗？
   - **需要** → 选择 Vercel
   - **不需要** → 可以用 GitHub Pages

2. 你是否有 Supabase 账号和配置？
   - **有** → 选择 Vercel
   - **没有** → 选择 GitHub Pages（展示模式）
