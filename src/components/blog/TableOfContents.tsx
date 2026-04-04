'use client';

import { useState } from 'react';
import type { HeadingItem } from '@/lib/heading-id';

interface Props {
  headings: HeadingItem[];
  title: string;
}

export function TableOfContents({ headings, title }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label={title}
      className="my-10 rounded-2xl border border-surface-tertiary bg-surface overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-secondary transition-colors"
      >
        <span className="font-semibold text-content-primary flex items-center gap-2 text-base">
          <span aria-hidden="true">📋</span>
          {title}
        </span>
        <span className="text-content-muted text-xs font-medium">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ol className="px-6 pb-5 pt-1 space-y-0.5 border-t border-surface-tertiary">
          {headings.map((h, i) => (
            <li key={i} style={{ paddingLeft: `${(h.level - 1) * 14}px` }}>
              <a
                href={`#${h.id}`}
                className="text-sm text-brand-600 hover:text-brand-800 hover:underline transition-colors leading-loose block"
              >
                {h.level === 1 || h.level === 2 ? (
                  <span className="font-medium">{h.text}</span>
                ) : (
                  <span className="text-content-secondary hover:text-brand-700">{h.text}</span>
                )}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
