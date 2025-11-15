# 🚀 GitHub Pages 部署步骤

## 当前配置

✅ 仓库名称: `wj-page`  
✅ 用户名: `Awz-amialivor`  
✅ 部署地址: https://awz-amialivor.github.io/wj-page/

---

## 📋 配置文件已完成

以下配置文件已经正确设置：

1. ✅ `vite.config.ts` - base 路径设置为 `/wj-page/`
2. ✅ `package.json` - 包含 build 和 deploy 脚本
3. ✅ `tsconfig.json` - TypeScript 配置完成
4. ✅ `index.html` - HTML 入口文件
5. ✅ `/src/main.tsx` - React 入口文件
6. ✅ `/workflows/deploy.yml` - GitHub Actions 自动部署配置

---

## 🔧 部署方法

### 方法 1: GitHub Actions 自动部署（推荐）✨

**workflow 文件位置应该是：**
```
.github/workflows/deploy.yml
```

**当前位置是：**
```
/workflows/deploy.yml  ❌ 错误位置
```

**需要移动文件到正确位置：**

在你的本地项目中：
```bash
# 创建 .github/workflows 目录
mkdir -p .github/workflows

# 移动 workflow 文件
mv workflows/deploy.yml .github/workflows/deploy.yml

# 删除旧目录
rm -rf workflows
```

或者手动操作：
1. 在项目根目录创建 `.github` 文件夹
2. 在 `.github` 里创建 `workflows` 文件夹
3. 把 `deploy.yml` 移动到 `.github/workflows/` 里面

**然后提交代码：**
```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push
```

GitHub Actions 会自动：
- 安装依赖
- 构建项目到 `docs` 文件夹
- 提交 docs 文件夹到仓库
- 触发 GitHub Pages 部署

---

### 方法 2: 本地手动部署

如果不想用 GitHub Actions：

```bash
# 1. 本地构建
npm run build

# 2. 提交 docs 文件夹
git add docs -f
git commit -m "Deploy to GitHub Pages"
git push
```

---

## ⚙️ GitHub 仓库设置

1. 进入你的仓库: https://github.com/Awz-amialivor/wj-page
2. 点击 `Settings` → `Pages`
3. 在 "Build and deployment" 下：
   - **Source**: 选择 `Deploy from a branch`
   - **Branch**: 选择 `main` 分支
   - **Folder**: 选择 `/docs` 文件夹
4. 点击 `Save`

---

## ⚠️ 重要提醒

### Community 页面功能限制

因为使用 GitHub Pages（静态托管），**Community 页面的提交功能将不可用**：

- ❌ 用户提交的反馈不会保存到数据库
- ❌ Supabase 后端功能无法使用
- ✅ 页面可以正常显示，但提交按钮点击后数据不会保存

**如果需要完整功能，建议改用：**
- [Vercel](https://vercel.com) - 免费且支持后端
- [Netlify](https://netlify.com) - 同样支持后端功能

---

## 🔍 检查部署状态

### 1. 检查 GitHub Actions
- 进入仓库的 `Actions` 标签
- 查看最新的 workflow 运行状态
- 如果失败，点击查看错误日志

### 2. 检查部署文件
- 确认 `docs` 文件夹已经生成
- 确认 `docs` 文件夹已提交到 GitHub

### 3. 访问网站
- 等待 3-5 分钟让 GitHub Pages 更新
- 访问: https://awz-amialivor.github.io/wj-page/

---

## 🐛 常见问题

### Q1: 网站显示 404
**原因**: base 路径配置错误  
**解决**: 确认 `vite.config.ts` 中的 `base: '/wj-page/'` 与仓库名一致

### Q2: CSS/JS 加载失败
**原因**: 资源路径错误  
**解决**: 检查浏览器控制台，确认资源路径是否正确

### Q3: GitHub Actions 失败
**原因**: 权限问题  
**解决**: 
1. 进入 `Settings` → `Actions` → `General`
2. 滚动到 "Workflow permissions"
3. 选择 "Read and write permissions"
4. 保存

### Q4: 图片/SVG 无法显示
**原因**: Figma 资源路径问题  
**解决**: 确保所有 `figma:asset/` 导入在构建时正确处理

---

## 📝 下一步

1. **移动 workflow 文件**到正确位置：`.github/workflows/deploy.yml`
2. **提交所有更改**到 GitHub
3. **等待自动部署**完成（约 2-3 分钟）
4. **访问网站**测试

---

## 🎉 完成！

如果一切顺利，你的网站将在以下地址访问：

**https://awz-amialivor.github.io/wj-page/**

享受你的反乌托邦 Homecoming 网站！ 🖤✨
