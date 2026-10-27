import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { minify as htmlMinify } from 'html-minifier-terser';
import { minify as terserMinify } from 'terser';
import { compression } from 'vite-plugin-compression2';

/**
 * Custom Vite plugin for HTML minification in production
 */
function htmlMinifyPlugin() {
  return {
    name: 'html-minify',
    enforce: 'post',
    async transformIndexHtml(html, ctx) {
      if (!ctx || !ctx.bundle) return html;
      return await htmlMinify(html, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      });
    },
  };
}

/**
 * Custom Vite plugin to minify static Service Worker in dist/
 */
function swMinifyPlugin() {
  return {
    name: 'sw-minify',
    enforce: 'post',
    async writeBundle(options) {
      const swPath = path.resolve(options.dir || 'dist', 'sw.js');
      if (fs.existsSync(swPath)) {
        const swContent = fs.readFileSync(swPath, 'utf-8');
        const minified = await terserMinify(swContent, {
          compress: {
            drop_console: true,
            drop_debugger: true,
            passes: 2,
          },
          mangle: true,
          format: {
            comments: false,
          },
        });
        if (minified.code) {
          fs.writeFileSync(swPath, minified.code, 'utf-8');
        }
      }
    },
  };
}

export default defineConfig({
  root: '.',
  plugins: [
    htmlMinifyPlugin(),
    swMinifyPlugin(),
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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      format: {
        comments: false,
      },
      mangle: {
        safari10: true,
      },
    },
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
      treeshake: true,
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
