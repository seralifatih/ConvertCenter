import Link from "next/link";

type Breadcrumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted-strong)]"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
            {item.href ? (
              <Link className="hover:text-[color:var(--text)]" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 ? <span className="opacity-60">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
