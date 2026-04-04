import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPostSlugs, getAlternatePosts } from '@/lib/blog';
import { JsonLd } from '@/components/ui/JsonLd';
import { blogPostingSchema, breadcrumbSchema } from '@/lib/schemas';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pricentrix.com';

// generateStaticParams receives plain parent params (not a Promise)
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const slugs = getPostSlugs(params.locale);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  const base = locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}`;
  const canonicalUrl = `${base}/blog/${post.slug}`;

  // Build hreflang alternates via translationKey
  const hreflang: Record<string, string> = { [locale]: canonicalUrl };
  if (post.translationKey) {
    const alts = getAlternatePosts(post.translationKey, locale, [...routing.locales]);
    for (const alt of alts) {
      const altBase = alt.locale === 'es' ? SITE_URL : `${SITE_URL}/${alt.locale}`;
      hreflang[alt.locale] = `${altBase}/blog/${alt.slug}`;
    }
  }
  hreflang['x-default'] = hreflang['es'] ?? canonicalUrl;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflang,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      ...(post.image && { images: [{ url: `${SITE_URL}${post.image}` }] }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const localeBase = locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}`;

  const breadcrumbs = [
    { name: 'Home', url: locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}` },
    { name: t('title'), url: `${localeBase}/blog` },
    { name: post.title, url: `${localeBase}/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd schema={blogPostingSchema(post, locale)} />
      <JsonLd schema={breadcrumbSchema(breadcrumbs)} />

      <div className="max-w-3xl mx-auto px-5 py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-sm text-brand-600 hover:text-brand-800 transition-colors mb-8 inline-block"
        >
          {t('backToBlog')}
        </Link>

        {/* Header */}
        <header className="mb-10">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-content-primary mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-content-secondary mb-4">{post.description}</p>
          <div className="flex items-center gap-3 text-sm text-content-muted">
            {post.author && <span>{post.author}</span>}
            {post.author && <span>·</span>}
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </header>

        {/* Cover image */}
        {post.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-2xl mb-10 object-cover max-h-96"
          />
        )}

        {/* MDX Content */}
        <article className="prose prose-gray max-w-none prose-headings:text-content-primary prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={post.content} />
        </article>
      </div>
    </>
  );
}
