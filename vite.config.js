import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // mở trình duyệt tự động
      filename: 'bundle-report.html',
      gzipSize: true,
      brotliSize: true
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      // '~comp': path.resolve(__dirname, './src/components'),
      // '~page': path.resolve(__dirname, './src/pages'),
      // '~hook': path.resolve(__dirname, './src/hooks'),
    }
  }
  
})
