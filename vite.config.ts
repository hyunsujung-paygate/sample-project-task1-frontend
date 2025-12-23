import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

/**
 * Vite 설정 파일
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // API 프록시 설정 (CORS 문제 해결)
      '/api': {
        target: 'https://port-0-sample-project-task1-backend-mjghfzfo9b552830.sel3.cloudtype.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path, // 경로 그대로 전달
      },
    },
  },
});

