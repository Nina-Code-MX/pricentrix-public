import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getPostBySlug, getPostSlugs, getAlternatePosts } from '@/lib/blog';
import { JsonLd } from '@/components/ui/JsonLd';
import { blogPostingSchema, breadcrumbSchema } from '@/lib/schemas';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { MdxContent } from '@/components/blog/MdxContent';
import { extractHeadings } from '@/lib/heading-id';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pricentrix.com';

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

  const headings = extractHeadings(post.content);

  return (
    <>
      <JsonLd schema={blogPostingSchema(post, locale)} />
      <JsonLd schema={breadcrumbSchema(breadcrumbs)} />

      <div className="max-w-4xl mx-auto px-5 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-sm text-brand-600 hover:text-brand-800 transition-colors mb-10 inline-flex items-center gap-1 font-medium"
        >
          {t('backToBlog')}
        </Link>

        {/* Article header */}
        <header className="mt-8 mb-0">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1 rounded-full font-medium tracking-wide uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-content-primary mb-5 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Description / subtitle */}
          <p className="text-xl text-content-secondary leading-relaxed mb-8">{post.description}</p>

          {/* Author (left) + Date (right) — two-column row */}
          <div className="grid grid-cols-2 gap-4 py-5 border-t border-b border-surface-tertiary">
            <div>
              <p className="text-xs text-content-muted uppercase tracking-wide mb-1">
                {t('author')}
              </p>
              {post.author ? (
                post.authorUrl ? (
                  <a
                    href={post.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-content-primary hover:text-brand-600 transition-colors"
                  >
                    {post.author}
                  </a>
                ) : (
                  <span className="font-semibold text-content-primary">{post.author}</span>
                )
              ) : (
                <span className="font-semibold text-content-muted">—</span>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-content-muted uppercase tracking-wide mb-1">
                {t('publishedOn')}
              </p>
              <time dateTime={post.date} className="font-semibold text-content-primary">
                {new Date(post.date).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.dateModified && post.dateModified !== post.date && (
                <p className="text-xs text-content-muted mt-1">
                  {t('updatedOn')}{' '}
                  {new Date(post.dateModified).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Cover image (optional, below author/date) */}
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="w-full rounded-2xl mt-8 mb-2 object-cover max-h-[30rem] shadow-md"
          />
        )}

        {/* Table of Contents */}
        <TableOfContents headings={headings} title={t('tableOfContents')} />

        {/* Article Content */}
        <MdxContent source={post.content} />
      </div>
    </>
  );
}
