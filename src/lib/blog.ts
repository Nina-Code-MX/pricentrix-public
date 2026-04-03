import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPostMeta {
  title: string;
  slug: string;
  date: string;
  dateModified?: string;
  description: string;
  image?: string;
  tags?: string[];
  author?: string;
  authorUrl?: string;
  translationKey?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function getPostSlugs(locale: string): string[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  const dir = path.join(BLOG_DIR, locale);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    title: data.title ?? '',
    slug: data.slug ?? slug,
    date: data.date ? String(data.date) : '',
    dateModified: data.dateModified ? String(data.dateModified) : undefined,
    description: data.description ?? '',
    image: data.image ?? undefined,
    tags: data.tags ?? [],
    author: data.author ?? undefined,
    authorUrl: data.authorUrl ?? undefined,
    translationKey: data.translationKey ?? undefined,
    content,
  };
}

export function getAllPosts(locale: string): BlogPostMeta[] {
  const slugs = getPostSlugs(locale);
  return slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Find alternate locale versions of a post by translationKey */
export function getAlternatePosts(
  translationKey: string,
  currentLocale: string,
  locales: string[]
): { locale: string; slug: string }[] {
  const alternates: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    if (locale === currentLocale) continue;
    const slugs = getPostSlugs(locale);
    for (const slug of slugs) {
      const post = getPostBySlug(slug, locale);
      if (post?.translationKey === translationKey) {
        alternates.push({ locale, slug: post.slug });
        break;
      }
    }
  }

  return alternates;
}
