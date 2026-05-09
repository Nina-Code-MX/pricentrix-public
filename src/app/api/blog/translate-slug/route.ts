import { NextRequest, NextResponse } from 'next/server';
import { getAlternatePosts, getPostBySlug } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

function isLocale(value: string | null): value is Locale {
  return value !== null && routing.locales.includes(value as Locale);
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')?.trim();
  const from = req.nextUrl.searchParams.get('from');
  const to = req.nextUrl.searchParams.get('to');

  if (!slug || !isLocale(from) || !isLocale(to)) {
    return NextResponse.json({ slug: null });
  }

  const post = getPostBySlug(slug, from);
  if (!post?.translationKey) {
    return NextResponse.json({ slug: null });
  }

  const translated = getAlternatePosts(post.translationKey, from, [...routing.locales]).find(
    (item) => item.locale === to
  );

  return NextResponse.json({ slug: translated?.slug ?? null });
}
