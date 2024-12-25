import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  define: {
    'global': 'globalThis',
    'process.env': process.env,
  },
  resolve: {
    alias: {
      process: path.resolve(__dirname, 'node_modules/process/browser.js'),
      stream: path.resolve(__dirname, 'node_modules/stream-browserify'),
      zlib: path.resolve(__dirname, 'node_modules/browserify-zlib'),
      util: path.resolve(__dirname, 'node_modules/util'),
    },
  },
});