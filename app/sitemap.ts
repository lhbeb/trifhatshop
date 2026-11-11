import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [['/', 1], ['/faq', 0.7], ['/shipping', 0.5], ['/returns', 0.5], ['/contact', 0.5], ['/terms', 0.3], ['/privacy', 0.3]];
  return pages.map(([path, priority]) => ({ url: `${SITE_URL}${path === '/' ? '' : path}`, lastModified: new Date(), priority }));
}
