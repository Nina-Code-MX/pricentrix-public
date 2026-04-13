import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { routing } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pricentrix.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const base = locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;

    // Static pages
    entries.push(
      { url: base, changeFrequency: 'weekly', priority: 1.0 },
      { url: `${base}/blog`, changeFrequency: 'daily', priority: 0.8 },
      {
        url: `${base}${locale === routing.defaultLocale ? '/prueba-gratis' : '/free-trial'}`,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${base}${locale === routing.defaultLocale ? '/precios' : '/pricing'}`,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${base}${locale === routing.defaultLocale ? '/contacto' : '/contact'}`,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${base}${locale === routing.defaultLocale ? '/privacidad' : '/privacy'}`,
        changeFrequency: 'monthly',
        priority: 0.4,
      },
      {
        url: `${base}${locale === routing.defaultLocale ? '/terminos' : '/terms'}`,
        changeFrequency: 'monthly',
        priority: 0.4,
      }
    );

    // Blog posts
    const posts = getAllPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.dateModified ?? post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
