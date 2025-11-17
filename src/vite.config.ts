import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/wj-page/', // GitHub Pages base path - 修正为正确的仓库名
  build: {
    outDir: 'docs', // 输出到docs文件夹以便GitHub Pages部署
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});