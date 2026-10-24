import { defineConfig } from 'astro/config';

// Vorschau auf GitHub Pages (Projektseite). base muss zu BASIS in src/inhalt.ts passen.
// Wurzel-relative Links im HTML ergänzt scripts/basis.mjs nach dem Build.
export default defineConfig({
  site: process.env.SITE_ORIGIN ?? 'https://tillheidrich.github.io',
  base: process.env.SITE_BASE ?? '/kenwarf-website',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  server: { port: 4303, host: '127.0.0.1' },
  devToolbar: { enabled: false },
});
