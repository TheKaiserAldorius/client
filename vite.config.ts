import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/reactjs-template',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    // React plugin
    react(),
    // Поддержка путей из tsconfig.json
    tsconfigPaths(),
    // Локальный SSL для dev (по желанию)
    process.env.HTTPS && mkcert(),
  ],
  publicDir: './public',
  server: {
    // Доступен в локальной сети
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
