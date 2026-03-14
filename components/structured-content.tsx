import type { StructuredContent } from "@/lib/config/conversion-registry";

export function StructuredContentView({ content }: { content: StructuredContent }) {
  return (
    <div className="space-y-4">
      <h2 className="section-title text-base sm:text-lg">{content.title}</h2>
      {content.sections.map((section) => (
        <section className="space-y-3" key={section.heading}>
          <h3 className="text-sm font-medium text-[color:var(--text)] sm:text-base">
            {section.heading}
          </h3>
          {section.paragraphs.map((paragraph) => (
            <p className="text-sm leading-7 text-[color:var(--muted)]" key={paragraph}>
              {paragraph}
            </p>
          ))}
          {section.listItems?.length ? (
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[color:var(--muted)]">
              {section.listItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
