import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://munzbjos.github.io',
  output: 'static',
  trailingSlash: 'always',
  server: { host: '127.0.0.1' },
  devToolbar: { enabled: false },
});
