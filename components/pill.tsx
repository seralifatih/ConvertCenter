import clsx from "clsx";
import Link from "next/link";

type SharedPillProps = {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  mono?: boolean;
};

export function PillButton({
  children,
  active = false,
  className,
  mono = false,
  ...props
}: SharedPillProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-surface)] hover:text-[color:var(--accent-text)]",
        active
          ? "border-transparent bg-[color:var(--accent-surface)] text-[color:var(--accent-text)]"
          : "border-[color:var(--border)] bg-transparent",
        mono && "font-mono uppercase tracking-[0.14em]",
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export function PillLink({
  children,
  href,
  active = false,
  className,
  mono = false,
}: SharedPillProps & { href: string }) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-surface)] hover:text-[color:var(--accent-text)]",
        active
          ? "border-transparent bg-[color:var(--accent-surface)] text-[color:var(--accent-text)]"
          : "border-[color:var(--border)] bg-transparent",
        mono && "font-mono uppercase tracking-[0.14em]",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
