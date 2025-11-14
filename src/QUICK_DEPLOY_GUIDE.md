# 🚀 快速部署指南 - 5步完成

## 📦 你需要做的事情

### 第1步: 下载所有文件
从Figma Make下载以下文件到你的本地 `oj-web-page` 仓库：

**核心配置文件**（已为你准备好）:
- ✅ `package.json`
- ✅ `vite.config.ts`
- ✅ `tsconfig.json`
- ✅ `tsconfig.node.json`
- ✅ `index.html`

**源代码**（需要放到 `src/` 文件夹中）:
```
src/
├── main.tsx (已创建)
├── App.tsx (从根目录移入)
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
│   └── ui/ (所有UI组件)
├── styles/
│   └── globals.css
└── utils/
    ├── api.ts
    └── supabase/
        └── info.tsx
```

### 第2步: 文件结构调整

你的仓库最终结构应该是：
```
oj-web-page/
├── .github/
│   └── workflows/
│       └── deploy.yml (可选，自动部署)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   ├── styles/
│   └── utils/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── README.md
```

### 第3步: 修改导入路径

因为 Figma 的图片使用 `figma:asset/...` 路径，在普通Vite项目中无法使用。

**选项A - 使用占位图片**（最简单）:

在 `src/components/MainPage.tsx` 中：
```typescript
// 把这行:
import birdLogo from 'figma:asset/cb6ac42902be51a5cc78f7d60921ff44772beaec.png';

// 改为:
const birdLogo = 'https://via.placeholder.com/100x100/000000/FFFFFF?text=HC';
```

在 `src/components/Footer.tsx` 中：
```typescript
// 把这行:
import qrCode from 'figma:asset/afd6dac42aea49630d14c72724574c63636a8a67.png';

// 改为:
const qrCode = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://awz-amialiveor.github.io/oj-web-page/';
```

**选项B - 使用本地图片**:
1. 创建 `src/assets/` 文件夹
2. 从Figma Make预览中保存图片到assets文件夹
3. 修改import:
```typescript
import birdLogo from './assets/bird-logo.png';
```

### 第4步: 在本地构建和测试

打开终端，进入你的 `oj-web-page` 文件夹：

```bash
# 安装依赖
npm install

# 本地预览（可选）
npm run dev

# 构建生产版本
npm run build
```

构建成功后，会生成 `docs/` 文件夹。

### 第5步: 提交到GitHub

```bash
git add .
git commit -m "Deploy Homecoming website to GitHub Pages"
git push origin main
```

等待1-2分钟，然后访问：
**https://awz-amialiveor.github.io/oj-web-page/**

---

## 🎯 简化版 - 如果遇到困难

### 最简单的方法：

1. **复制所有文件** 到你的本地仓库
2. **修改图片导入** (使用占位图片)
3. **运行命令**:
```bash
npm install
npm run build
git add docs
git commit -m "Build"
git push
```

---

## ⚠️ 常见问题

### Q: 构建失败，提示找不到模块？
**A**: 确保所有文件都在 `src/` 文件夹中，并且 `import` 路径正确。

### Q: 网站样式丢失？
**A**: 检查 `vite.config.ts` 中的 `base` 是否设置为 `/oj-web-page/`

### Q: 图片不显示？
**A**: 使用选项A的占位图片，或者下载真实图片到assets文件夹。

### Q: Community页面提交后数据消失？
**A**: 这是正常的，GitHub Pages不支持后端存储。这仅用于展示。

---

## 📞 需要帮助？

如果在任何步骤卡住了，告诉我：
1. 你在哪一步
2. 错误信息是什么
3. 截图

我会帮你解决！🎉
