import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell-card px-5 py-12 text-center sm:px-8">
      <span className="mono-kicker">404</span>
      <h1 className="mt-4 text-3xl font-medium tracking-[-0.04em]">Page not found</h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
        That conversion route is not in the launch set yet. Use the homepage search or jump
        back into one of the category hubs.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link className="utility-chip font-mono uppercase tracking-[0.12em]" href="/">
          home
        </Link>
        <Link
          className="utility-chip font-mono uppercase tracking-[0.12em]"
          href="/weight-converter"
        >
          weight hub
        </Link>
        <Link
          className="utility-chip font-mono uppercase tracking-[0.12em]"
          href="/text-converter"
        >
          text hub
        </Link>
      </div>
    </section>
  );
}
