interface CalloutProps {
  children: React.ReactNode;
  /** "info" | "warning" | "tip" | "danger" */
  type?: 'info' | 'warning' | 'tip' | 'danger';
  title?: string;
}

const styles = {
  info: {
    wrapper: 'bg-blue-50 border-blue-400 text-blue-900',
    icon: 'ℹ️',
  },
  tip: {
    wrapper: 'bg-green-50 border-green-400 text-green-900',
    icon: '💡',
  },
  warning: {
    wrapper: 'bg-amber-50 border-amber-400 text-amber-900',
    icon: '⚠️',
  },
  danger: {
    wrapper: 'bg-red-50 border-red-400 text-red-900',
    icon: '🚨',
  },
};

export function Callout({ children, type = 'info', title }: CalloutProps) {
  const s = styles[type];
  return (
    <aside className={`not-prose my-6 rounded-r-xl border-l-4 px-5 py-4 ${s.wrapper}`}>
      <p className="font-semibold text-sm mb-1 flex items-center gap-1.5">
        <span>{s.icon}</span>
        {title ?? type.charAt(0).toUpperCase() + type.slice(1)}
      </p>
      <div className="text-sm leading-relaxed [&_p]:my-1 [&_a]:underline">{children}</div>
    </aside>
  );
}
