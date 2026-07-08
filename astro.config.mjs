// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://juansac.dev',
  integrations: [
    sitemap({
      // es ↔ en alternates in the sitemap, mirroring the on-page hreflang.
      i18n: {
        defaultLocale: 'en',
        locales: { es: 'es', en: 'en' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // /en/* used to be the live English routes; they are now redirects to the
  // unprefixed (English) equivalents so existing indexed/shared links still work.
  redirects: {
    '/en': '/',
    '/en/blog': '/blog',
    '/en/blog/[slug]': '/blog/[slug]',
  },
});
