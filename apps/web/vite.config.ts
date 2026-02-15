import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/jobscrolled/', 
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api/arbeitnow': {
        target: 'https://www.arbeitnow.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/arbeitnow/, '/api/job-board-api')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});