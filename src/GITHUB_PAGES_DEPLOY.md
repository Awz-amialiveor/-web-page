# 部署到 GitHub Pages - 详细步骤

## 📋 你的项目信息
- **仓库名**: `oj-web-page`
- **用户名**: `Awz-amialiveor`
- **网站地址**: https://awz-amialiveor.github.io/oj-web-page/
- **部署文件夹**: `/docs` (从main分支)

## ⚠️ 重要提示
由于GitHub Pages只能托管静态网站，**Community页面的提交功能将无法保存数据**。用户可以填写表单，但刷新后数据会丢失。这仅适合作为演示/作品集展示。

---

## 🚀 部署步骤

### 方法1: 手动部署（推荐新手）

#### 步骤1: 准备文件
你需要把 Figma Make 中的所有代码文件复制到你的本地 `oj-web-page` 仓库。

**需要复制的文件和文件夹**:
```
oj-web-page/
├── components/
│   ├── CalculationPage.tsx
│   ├── CommunityPage.tsx
│   ├── Footer.tsx
│   ├── MainPage.tsx
│   ├── Navigation.tsx
│   ├── ServicePage.tsx
│   ├── TestPage.tsx
│   ├── figma/
│   │   └── ImageWithFallback.tsx
│   └── ui/
│       └── (所有UI组件)
├── styles/
│   └── globals.css
├── utils/
│   ├── api.ts
│   └── supabase/
│       └── info.tsx
├── App.tsx
├── index.html
├── package.json
├── vite.config.ts (需要创建)
└── tsconfig.json
```

#### 步骤2: 创建必要的配置文件

**package.json** (如果没有的话):
```json
{
  "name": "homecoming-website",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "vite build && rm -rf docs && mv dist docs"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^11.11.17",
    "lucide-react": "^0.468.0",
    "sonner": "^2.0.3",
    "recharts": "^2.15.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.1",
    "typescript": "^5.6.3",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49"
  }
}
```

**vite.config.ts** (重要！设置base路径):
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/oj-web-page/', // 你的仓库名
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});
```

**index.html** (确保在根目录):
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Homecoming - Architects of the Final Moment" />
    <title>Homecoming</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**src/main.tsx** (应用入口):
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### 步骤3: 调整文件结构
把所有文件放到 `src` 文件夹中：
```
src/
├── App.tsx
├── main.tsx
├── components/
├── styles/
└── utils/
```

#### 步骤4: 本地构建
在仓库目录中运行：
```bash
# 安装依赖
npm install

# 构建项目（会生成 docs 文件夹）
npm run build
```

#### 步骤5: 提交到GitHub
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

#### 步骤6: 等待部署
GitHub Pages会自动从main分支的/docs文件夹部署。等待1-2分钟后访问：
```
https://awz-amialiveor.github.io/oj-web-page/
```

---

### 方法2: 使用GitHub Actions自动部署

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to docs folder
        run: |
          rm -rf docs
          mv dist docs
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add docs
          git commit -m "Deploy to GitHub Pages" || echo "No changes to commit"
          git push
```

配置好后，每次push到main分支都会自动构建并部署。

---

## 🖼️ 处理图片资源

**重要**: Figma导入的图片使用了特殊路径 `figma:asset/...`，在GitHub Pages上需要转换。

### 选项1: 使用Unsplash替代图片
把所有装饰性图片替换为Unsplash。

### 选项2: 手动下载图片
1. 从Figma Make预览中下载所有图片
2. 放到 `src/assets/` 文件夹
3. 修改import路径：
```typescript
// 从:
import birdLogo from 'figma:asset/...';

// 改为:
import birdLogo from './assets/bird-logo.png';
```

---

## 🔧 已知限制

1. **Community页面**: 反馈提交功能无法保存数据
2. **Supabase功能**: 所有后端功能不可用
3. **仅用于展示**: 适合作为作品集/演示网站

---

## ✅ 检查清单

- [ ] 复制所有代码文件到本地仓库
- [ ] 创建 `vite.config.ts` 并设置base路径
- [ ] 创建 `src/main.tsx` 入口文件
- [ ] 调整文件结构（放入src文件夹）
- [ ] 处理图片资源路径
- [ ] 运行 `npm install`
- [ ] 运行 `npm run build` 测试构建
- [ ] 提交并push到GitHub
- [ ] 访问网站确认部署成功

---

## 🆘 需要帮助？

如果遇到问题，告诉我：
1. 错误信息是什么
2. 在哪一步卡住了

我可以帮你调试！
