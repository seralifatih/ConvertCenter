import { Breadcrumbs } from "@/components/breadcrumbs";
import { ColorToolWidget } from "@/components/color-tool-widget";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "RGB to HEX Converter",
  description: "Convert RGB colors to HEX instantly with this free online RGB to HEX converter.",
  path: "/rgb-to-hex",
  keywords: ["rgb to hex", "rgb color converter", "convert rgb to hex", "rgb colors to hex"],
});

export default function RgbToHexPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "RGB to Hex Converter", path: "/rgb-to-hex" },
        ])}
      />
      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">color tool</span>
          <Breadcrumbs items={[{ label: "ConvertCenter", href: "/" }, { label: "rgb-to-hex" }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">RGB to HEX Converter</h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert RGB colors to HEX instantly with this free online RGB to HEX converter.
            </p>
          </div>
        </div>
      </section>
      <ColorToolWidget defaults={{ blue: "107", green: "107", red: "255" }} mode="rgbToHex" />
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <h2 className="section-title">How it helps</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            RGB values are common in graphics software, color pickers, and browser tools, while
            hex is still the quickest format for many design systems and CSS variables. This page
            gives you the converted hex value without leaving the workflow.
          </p>
        </UtilityCard>
        <UtilityCard>
          <h2 className="section-title">Common uses</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Turn RGB channels into hex for CSS variables and theme tokens.</p>
            <p>Match browser inspector values with design-system color references.</p>
            <p>Preview the exact color before copying the generated hex code.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
