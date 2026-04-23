import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { slugify } from '@/lib/heading-id';
import { Cta } from '@/components/blog/mdx/Cta';
import { Callout } from '@/components/blog/mdx/Callout';
import { CopyHeadingLinkButton } from '@/components/blog/mdx/CopyHeadingLinkButton';

function childrenToText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join('');
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    return childrenToText(props.children);
  }
  return '';
}

function makeHeading(Tag: 'h2' | 'h3' | 'h4') {
  return function Heading({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) {
    const id = slugify(childrenToText(children));
    const headingClassName = ['group', className].filter(Boolean).join(' ');

    return (
      <Tag id={id || undefined} className={headingClassName} {...props}>
        <span>{children}</span>
        {id ? <CopyHeadingLinkButton headingId={id} /> : null}
      </Tag>
    );
  };
}

const components = {
  h2: makeHeading('h2'),
  h3: makeHeading('h3'),
  h4: makeHeading('h4'),
  Cta,
  Callout,

  /* Styled images */
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ''}
      className="rounded-2xl shadow-md w-full my-8 object-cover"
      loading="lazy"
      {...props}
    />
  ),

  /* Responsive video embeds (YouTube / Vimeo iframes in MDX) */
  iframe: ({ src, title, ...props }: React.IframeHTMLAttributes<HTMLIFrameElement>) => (
    <div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden shadow-md">
      <iframe
        src={src}
        title={title ?? 'Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        {...props}
      />
    </div>
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <article
      className="
        prose prose-gray max-w-none
        prose-headings:text-content-primary prose-headings:font-bold prose-headings:scroll-mt-24
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
        prose-h2:border-b prose-h2:border-surface-tertiary prose-h2:pb-3
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
        prose-p:text-content-secondary prose-p:leading-relaxed prose-p:my-4
        prose-a:text-brand-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
        prose-strong:text-content-primary prose-strong:font-semibold
        prose-em:text-content-secondary
        prose-code:bg-surface-tertiary prose-code:px-1.5 prose-code:py-0.5
        prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-content-primary
        prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-dark-800 prose-pre:rounded-2xl prose-pre:shadow-md
        prose-pre:text-sm prose-pre:leading-relaxed
        prose-blockquote:border-l-4 prose-blockquote:border-brand-500
        prose-blockquote:bg-brand-50 prose-blockquote:rounded-r-xl
        prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:my-8
        prose-blockquote:not-italic prose-blockquote:text-content-secondary
        prose-ul:text-content-secondary prose-ol:text-content-secondary
        prose-li:leading-relaxed prose-li:my-1
        prose-hr:border-surface-tertiary prose-hr:my-10
        prose-img:rounded-2xl prose-img:shadow-md prose-img:my-8
        prose-table:text-sm prose-thead:bg-surface-tertiary
        prose-th:text-content-primary prose-th:font-semibold
        prose-td:text-content-secondary
      "
    >
      <MDXRemote source={source} components={components} />
    </article>
  );
}
