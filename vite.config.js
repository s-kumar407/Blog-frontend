import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    open: true,
    proxy: {
      // Add proxy configurations here if you have API routes
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  }
});


