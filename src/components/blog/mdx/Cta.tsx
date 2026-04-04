interface CtaProps {
  href: string;
  label: string;
  title?: string;
  description?: string;
  /** visual style: "primary" (blue filled) | "outline" | "banner" (dark block) */
  variant?: 'primary' | 'outline' | 'banner';
}

export function Cta({ href, label, title, description, variant = 'primary' }: CtaProps) {
  if (variant === 'banner') {
    return (
      <aside className="not-prose my-10 rounded-2xl bg-dark-800 text-white px-8 py-10 text-center shadow-lg">
        {title && <p className="text-xl font-bold mb-2">{title}</p>}
        {description && (
          <p className="text-slate-300 text-sm mb-6 max-w-lg mx-auto">{description}</p>
        )}
        <a
          href={href}
          className="inline-block px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-colors shadow-md"
        >
          {label}
        </a>
      </aside>
    );
  }

  if (variant === 'outline') {
    return (
      <aside className="not-prose my-8 rounded-2xl border-2 border-brand-600 px-8 py-8 flex flex-col sm:flex-row items-center gap-5">
        <div className="flex-1 text-left">
          {title && <p className="font-bold text-content-primary text-lg mb-1">{title}</p>}
          {description && <p className="text-content-secondary text-sm">{description}</p>}
        </div>
        <a
          href={href}
          className="shrink-0 inline-block px-6 py-3 rounded-xl border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white font-semibold text-sm transition-colors"
        >
          {label}
        </a>
      </aside>
    );
  }

  /* default: primary */
  return (
    <aside className="not-prose my-8 rounded-2xl bg-brand-50 border border-brand-100 px-8 py-8 flex flex-col sm:flex-row items-center gap-5">
      <div className="flex-1 text-left">
        {title && <p className="font-bold text-content-primary text-lg mb-1">{title}</p>}
        {description && <p className="text-content-secondary text-sm">{description}</p>}
      </div>
      <a
        href={href}
        className="shrink-0 inline-block px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-colors shadow-sm"
      >
        {label}
      </a>
    </aside>
  );
}
