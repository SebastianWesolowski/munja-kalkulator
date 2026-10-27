import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  root: '.',
  plugins: [
    // Pre-compress assets with Gzip for static servers (e.g. Nginx gzip_static on)
    compression({
      algorithm: 'gzip',
      threshold: 1024, // Only compress files > 1KB
    }),
    // Pre-compress assets with Brotli for modern servers (e.g. Nginx brotli_static on)
    compression({
      algorithm: 'brotliCompress',
      threshold: 1024,
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    reportCompressedSize: true,
  },
  server: {
    port: 8080,
    open: false,
  },
  preview: {
    port: 8080,
    open: false,
  },
});
