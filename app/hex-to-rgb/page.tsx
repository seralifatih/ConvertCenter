import { Breadcrumbs } from "@/components/breadcrumbs";
import { ColorToolWidget } from "@/components/color-tool-widget";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HEX to RGB Converter",
  description: "Convert HEX color codes to RGB instantly with a live preview and copy-ready output.",
  path: "/hex-to-rgb",
  keywords: ["hex to rgb", "hex color converter", "convert hex to rgb", "hex color codes to rgb"],
});

export default function HexToRgbPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Hex to RGB Converter", path: "/hex-to-rgb" },
        ])}
      />
      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">color tool</span>
          <Breadcrumbs items={[{ label: "ConvertCenter", href: "/" }, { label: "hex-to-rgb" }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">HEX to RGB Converter</h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert HEX color codes to RGB instantly with a live preview and copy-ready output.
            </p>
          </div>
        </div>
      </section>
      <ColorToolWidget defaults={{ hex: "#FF6B6B" }} mode="hexToRgb" />
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <h2 className="section-title">How it helps</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Designers and frontend developers often move between hex values in design files and RGB
            values in code, canvas tools, or graphics APIs. This page gives you the translation
            instantly.
          </p>
        </UtilityCard>
        <UtilityCard>
          <h2 className="section-title">Common uses</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Convert a brand color into RGB for CSS, canvas, or WebGL work.</p>
            <p>Check design handoff values between Figma, code, and graphics tools.</p>
            <p>Preview the resulting color while copying the exact output string.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
