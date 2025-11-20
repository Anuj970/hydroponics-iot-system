import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    sourcemap: true,
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true
  },
  envDir: './',
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
});