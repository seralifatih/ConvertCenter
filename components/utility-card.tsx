import { cx } from "@/lib/cx";

export function UtilityCard({
  children,
  className,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}> &
  React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cx("panel-card p-5 sm:p-6", className)} {...props}>
      {children}
    </section>
  );
}
