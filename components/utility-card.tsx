import clsx from "clsx";

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
    <section className={clsx("panel-card p-4 sm:p-5", className)} {...props}>
      {children}
    </section>
  );
}
