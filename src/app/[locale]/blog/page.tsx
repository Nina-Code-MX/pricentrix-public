import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { JsonLd } from '@/components/ui/JsonLd';
import { blogListSchema } from '@/lib/schemas';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pricentrix.com';
  const base = locale === 'es' ? siteUrl : `${siteUrl}/${locale}`;

  return {
    title: t('blogTitle'),
    description: t('blogDescription'),
    alternates: {
      canonical: `${base}/blog`,
      languages: {
        es: `${siteUrl}/blog`,
        en: `${siteUrl}/en/blog`,
        'x-default': `${siteUrl}/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts(locale);

  return (
    <>
      <JsonLd schema={blogListSchema(posts, locale)} />
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-content-primary mb-3">{t('title')}</h1>
          <p className="text-content-secondary text-lg">{t('description')}</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-content-muted">{t('noPostsLocale')}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
