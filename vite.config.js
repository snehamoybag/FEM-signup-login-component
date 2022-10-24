import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
// vite.config.js
export default {
  // config options
  root,
  build : {
    outDir,
    emptyOutDir: true,
    rollUpOptions: {
      input: {
        main : resolve(root, 'index.html')
      }
    }
  }
}
