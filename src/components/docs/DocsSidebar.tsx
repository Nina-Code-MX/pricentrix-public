interface DocsSidebarSection {
  id: string;
  title: string;
}

interface Props {
  title: string;
  description: string;
  sections: DocsSidebarSection[];
}

export function DocsSidebar({ title, description, sections }: Props) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-3xl border border-surface-tertiary bg-white shadow-sm overflow-hidden lg:flex lg:max-h-[calc(100vh-7.5rem)] lg:flex-col">
        <div className="border-b border-surface-tertiary px-5 py-5 bg-surface-secondary">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{title}</p>
          <p className="mt-2 text-sm leading-6 text-content-secondary">{description}</p>
        </div>

        <nav aria-label={title} className="px-3 py-3 lg:flex-1 lg:overflow-y-auto">
          <ol className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block rounded-2xl px-3 py-2 text-sm leading-6 text-content-secondary transition-colors hover:bg-brand-50 hover:text-brand-800"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
