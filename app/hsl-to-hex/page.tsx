import { Breadcrumbs } from "@/components/breadcrumbs";
import { ColorToolWidget } from "@/components/color-tool-widget";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HSL to HEX Converter",
  description: "Convert HSL colors to HEX instantly with a live preview and copy-ready HEX output.",
  path: "/hsl-to-hex",
  keywords: ["hsl to hex", "convert hsl to hex", "hsl color converter"],
});

export default function HslToHexPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "HSL to HEX Converter", path: "/hsl-to-hex" },
        ])}
      />
      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">color tool</span>
          <Breadcrumbs items={[{ label: "ConvertCenter", href: "/" }, { label: "hsl-to-hex" }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">HSL to HEX Converter</h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert HSL colors to HEX instantly with a live preview and copy-ready HEX output.
            </p>
          </div>
        </div>
      </section>
      <ColorToolWidget defaults={{ hue: "355", saturation: "100", lightness: "71" }} mode="hslToHex" />
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <h2 className="section-title">How it helps</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            HSL is useful for selecting colors by hue and adjusting lightness, but many CSS
            variables and design references still need HEX. This page converts those values quickly.
          </p>
        </UtilityCard>
        <UtilityCard>
          <h2 className="section-title">Common uses</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Turn HSL design tokens into HEX for CSS variables and codebases.</p>
            <p>Validate HSL ranges before exporting colors into a theme system.</p>
            <p>Preview the resulting color while copying a clean HEX code.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
