'use client';

import { useState } from 'react';

export function CopyHeadingLinkButton({ headingId }: { headingId: string }) {
  const [copied, setCopied] = useState(false);

  const copyHeadingUrl = async () => {
    if (typeof window === 'undefined') return;

    const url = `${window.location.origin}${window.location.pathname}#${headingId}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <span className="relative ml-2 inline-flex">
      <button
        type="button"
        aria-label="Copy heading link"
        title={copied ? 'Copied!' : 'Copy heading link'}
        onClick={copyHeadingUrl}
        className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-content-muted opacity-0 transition-all hover:bg-surface-tertiary hover:text-brand-700 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 1 0-7.07-7.07L11 4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L13 19"
          />
        </svg>
      </button>

      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-content-primary px-2 py-1 text-xs font-medium text-white shadow-sm transition-all duration-500 ${
          copied ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        Copied!
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-content-primary"
        />
      </span>
    </span>
  );
}
