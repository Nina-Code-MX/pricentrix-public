import type { BlogPost } from './blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pricentrix.com';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pricentrix',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
  };
}

export function websiteSchema(locale: string) {
  const localeUrl = locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pricentrix',
    url: localeUrl,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${localeUrl}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function softwareAppSchema(locale: string) {
  const descriptions: Record<string, string> = {
    es: 'Plataforma de inteligencia de precios para ecommerce y retail.',
    en: 'Price intelligence platform for ecommerce and retail teams.',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pricentrix',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    inLanguage: locale,
    description: descriptions[locale] ?? descriptions['es'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function blogPostingSchema(post: BlogPost, locale: string) {
  const base = locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}`;
  const postUrl = `${base}/blog/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: postUrl,
    inLanguage: locale,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    ...(post.image && {
      image: [`${SITE_URL}${post.image}`],
    }),
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author,
          ...(post.authorUrl && { url: post.authorUrl }),
        }
      : {
          '@type': 'Organization',
          name: 'Pricentrix',
          url: SITE_URL,
        },
    publisher: {
      '@type': 'Organization',
      name: 'Pricentrix',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogListSchema(
  posts: { title: string; slug: string; date: string; description: string }[],
  locale: string
) {
  const base = locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    url: `${base}/blog`,
    inLanguage: locale,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${base}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.description,
    })),
  };
}

export function documentationPageSchema({
  locale,
  title,
  description,
  path,
}: {
  locale: string;
  title: string;
  description: string;
  path: string;
}) {
  const base = locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: `${base}${path}`,
    inLanguage: locale,
    author: {
      '@type': 'Organization',
      name: 'Pricentrix',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pricentrix',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  };
}
