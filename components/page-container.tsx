import { cx } from "@/lib/cx";

export function PageContainer({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <div className={cx("mx-auto w-full max-w-[1060px]", className)}>{children}</div>;
}
