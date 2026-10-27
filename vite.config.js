import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { minify as htmlMinify } from 'html-minifier-terser';
import { minify as terserMinify } from 'terser';
import { compression } from 'vite-plugin-compression2';

/**
 * Custom Vite plugin to pre-render initial component HTML directly into index.html
 * (Instant FCP & LCP, zero client innerHTML churn, zero layout shift)
 */
function prerenderHtmlPlugin() {
  return {
    name: 'prerender-html',
    enforce: 'pre',
    async transformIndexHtml(html) {
      const { createPresetsHeaderHtml, createPresetCardHtml } = await import('./js/components/presets.js');
      const { PRESET_CARDS } = await import('./js/data/offer-data.js');
      const {
        createStep1Html,
        createStep2Html,
        createStep3Html,
        createStep4Html,
        createStep5Html,
        createFutureStepsBannerHtml,
        createFormActionsHtml,
      } = await import('./js/components/steps.js');
      const { createSummaryCardHtml } = await import('./js/components/summary.js');

      let newHtml = html;

      // 1. Presets Section
      const presetsRegex = /(<section class="presets-section" id="presets-section"[^>]*>)([\s\S]*?)(<\/section>)/i;
      const presetsHtml = `
      <section class="presets-section" id="presets-section" aria-label="Strategiczne warianty współpracy i ścieżki rozwoju">
        ${createPresetsHeaderHtml()}
        <div class="presets-cards-grid" role="group" aria-label="Warianty współpracy">
          ${PRESET_CARDS.map(createPresetCardHtml).join('')}
        </div>
      </section>`;
      newHtml = newHtml.replace(presetsRegex, () => presetsHtml);

      // 2. Steps Form
      const formRegex = /(<form id="offer-calc-form" class="calc-form"[^>]*>)([\s\S]*?)(<\/form>)/i;
      const stepsHtml = `
      <form id="offer-calc-form" class="calc-form" novalidate>
        ${createStep1Html()}
        ${createStep2Html()}
        <div class="future-steps-container" id="future-steps-container">
          ${createFutureStepsBannerHtml()}
          <div class="future-steps-content" id="future-steps-content">
            ${createStep3Html()}
            ${createStep4Html()}
            ${createStep5Html()}
          </div>
        </div>
        ${createFormActionsHtml()}
      </form>`;
      newHtml = newHtml.replace(formRegex, () => stepsHtml);

      // 3. Summary Column
      const summaryRegex = /(<aside class="calc-summary-column" id="calc-summary-column"[^>]*>)([\s\S]*?)(<\/aside>)/i;
      const summaryHtml = `
      <aside class="calc-summary-column" id="calc-summary-column" aria-label="Podsumowanie wyceny">
        ${createSummaryCardHtml()}
      </aside>`;
      newHtml = newHtml.replace(summaryRegex, () => summaryHtml);

      // 4. Mobile Bar Info
      const mobileBarRegex = /(<button type="button" class="mobile-bar-info-btn" id="mobile-bar-info"[^>]*>)([\s\S]*?)(<\/button>)/i;
      const mobileBarHtml = `
      <button type="button" class="mobile-bar-info-btn" id="mobile-bar-info" aria-label="Przewiń do pełnego podsumowania wyceny">
        <div class="mobile-bar-tag-row">
          <span class="mobile-bar-phase-badge default-phase">Miesiące 1–3</span>
          <span class="mobile-bar-note">Najniższa: <strong>3\u00A0900\u00A0zł/mies.</strong> (od 4. m-ca)</span>
        </div>
        <div class="mobile-bar-price-wrap">
          <span class="mobile-bar-price-val">4\u00A0650,00\u00A0zł</span>
          <span class="mobile-bar-suffix">/mies.</span>
          <span class="mobile-bar-tax-badge">NETTO</span>
        </div>
      </button>`;
      newHtml = newHtml.replace(mobileBarRegex, () => mobileBarHtml);

      return newHtml;
    },
  };
}

/**
 * Custom Vite plugin to inline CSS directly into HTML (Zero render-blocking stylesheet requests)
 */
function inlineCssPlugin() {
  return {
    name: 'inline-css',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx || !ctx.bundle) return html;
      let newHtml = html;
      for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
        if (fileName.endsWith('.css') && chunk.type === 'asset') {
          const cssContent = typeof chunk.source === 'string' ? chunk.source : chunk.source.toString('utf-8');
          const cleanName = path.basename(fileName);
          const linkRegex = new RegExp(`<link[^>]+href="[^"]*${cleanName}"[^>]*>`, 'i');
          if (linkRegex.test(newHtml)) {
            newHtml = newHtml.replace(linkRegex, `<style>${cssContent}</style>`);
          }
        }
      }
      return newHtml;
    },
  };
}

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
    prerenderHtmlPlugin(),
    inlineCssPlugin(),
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
