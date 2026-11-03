import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Writes robots.txt (always) and sitemap.xml (only when VITE_SITE_URL is set)
 * into the build output, so no placeholder domain is ever published.
 */
function seoFiles(siteUrl: string | undefined): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const url = siteUrl ? siteUrl.replace(/\/?$/, '/') : undefined;
      const robots = ['User-agent: *', 'Allow: /', url ? `Sitemap: ${url}sitemap.xml` : ''].filter(Boolean).join('\n') + '\n';
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
      if (url) {
        const today = new Date().toISOString().slice(0, 10);
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`,
        });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // Relative base works on GitHub Pages project sites, user sites and Cloudflare Pages
    // because the portfolio is a single page with no client-side path routing.
    base: env.VITE_BASE_PATH || './',
    plugins: [react(), seoFiles(env.VITE_SITE_URL)],
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Keep React + motion in stable vendor chunks; Recharts stays in the lazy DataLab chunk.
          manualChunks(id) {
            if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react';
            if (id.includes('node_modules/framer-motion')) return 'motion';
          },
        },
      },
    },
  };
});
