import { Breadcrumbs } from "@/components/breadcrumbs";
import { ColorPickerWidget } from "@/components/color-picker-widget";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Color Picker – HEX, RGB, and HSL values",
  description: "Pick a color and copy its HEX, RGB, and HSL values instantly.",
  path: "/color-picker",
  keywords: ["color picker", "hex rgb hsl picker", "pick a color", "designer color tools"],
});

export default function ColorPickerPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Color Tools", path: "/color-tools" },
          { name: "Color Picker", path: "/color-picker" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">color tool</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "color-tools", href: "/color-tools" },
              { label: "color-picker" },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Color Picker
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Pick a color and copy its HEX, RGB, and HSL values instantly for CSS, design systems,
              prototypes, and developer handoff.
            </p>
          </div>
        </div>
      </section>

      <ColorPickerWidget />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <h2 className="section-title">Why use it</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Designers often need to move between visual picking and code-ready values quickly. This
            tool keeps that workflow simple by showing the three most common color formats together
            with independent copy actions.
          </p>
        </UtilityCard>
        <UtilityCard>
          <h2 className="section-title">Useful for</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Choosing UI accent colors and copying the exact value into CSS variables.</p>
            <p>Checking a picked color in RGB for canvas, graphics, or frontend code.</p>
            <p>Using HSL when you want to adjust hue, saturation, or lightness more intuitively.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
