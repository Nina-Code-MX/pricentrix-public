import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { BlogPostMeta } from '@/lib/blog';

export function BlogCard({ post }: { post: BlogPostMeta }) {
  const t = useTranslations('blog');
  const locale = useLocale();

  return (
    <article className="bg-surface border border-surface-tertiary rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      )}
      {!post.image && (
        <div className="w-full h-48 bg-surface-tertiary flex items-center justify-center text-content-muted text-sm">
          📝 Blog
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs text-content-muted mb-2">
          {t('publishedOn')}{' '}
          {new Date(post.date).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <h2 className="font-bold text-content-primary text-lg mb-2 leading-snug">{post.title}</h2>
        <p className="text-content-secondary text-sm mb-4 flex-1">{post.description}</p>
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
        <Link
          href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
          className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
        >
          {t('readMore')} →
        </Link>
      </div>
    </article>
  );
}
