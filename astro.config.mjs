// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://incimathcal.github.io',
  // 用户站点从根路径发布，不设 base
  integrations: [sitemap({ filter: (page) => page !== 'https://incimathcal.github.io/ispirare/' })],
});
