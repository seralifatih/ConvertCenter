import { Breadcrumbs } from "@/components/breadcrumbs";
import { ColorToolWidget } from "@/components/color-tool-widget";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HEX to HSL Converter",
  description: "Convert HEX colors to HSL instantly with live output, color preview, and copy-ready values.",
  path: "/hex-to-hsl",
  keywords: ["hex to hsl", "hex color to hsl", "convert hex to hsl"],
});

export default function HexToHslPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "HEX to HSL Converter", path: "/hex-to-hsl" },
        ])}
      />
      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">color tool</span>
          <Breadcrumbs items={[{ label: "ConvertCenter", href: "/" }, { label: "hex-to-hsl" }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">HEX to HSL Converter</h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert HEX colors to HSL instantly with live output, color preview, and copy-ready values.
            </p>
          </div>
        </div>
      </section>
      <ColorToolWidget defaults={{ hex: "#FF6B6B" }} mode="hexToHsl" />
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <h2 className="section-title">How it helps</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            HSL is often easier to reason about when adjusting hue, saturation, and lightness in a
            design system. This page turns a HEX color into a more tweakable format instantly.
          </p>
        </UtilityCard>
        <UtilityCard>
          <h2 className="section-title">Common uses</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Translate brand colors into HSL for theme adjustments and state variants.</p>
            <p>Check hue and lightness values while building design tokens.</p>
            <p>Preview the source color while copying formatted HSL output.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
