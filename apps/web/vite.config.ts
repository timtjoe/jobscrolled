import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/jobscrolled/', 
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});