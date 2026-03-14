import clsx from "clsx";

export function PageContainer({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <div className={clsx("mx-auto w-full max-w-[1060px]", className)}>{children}</div>;
}
