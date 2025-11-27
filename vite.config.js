import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      config: './postcss.config.cjs',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Ensure CSS is processed properly
      loader: { '.js': 'jsx' },
    },
  },
});
