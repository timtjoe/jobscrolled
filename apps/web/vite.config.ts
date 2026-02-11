import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/jobScrolled/', 
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});