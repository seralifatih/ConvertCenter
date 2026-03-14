import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getBrowseCategory } from "@/lib/content/categories";
import { getLaunchPage } from "@/lib/content/pages";
import { siteConfig } from "@/lib/site";
import { units } from "@/lib/conversion/units";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type OpenGraphImageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function getImageCopy(slugOrCategory: string) {
  const browseCategory = getBrowseCategory(`/${slugOrCategory}`);

  if (browseCategory) {
    return {
      eyebrow: "Category hub",
      title: browseCategory.title,
      subtitle: "Fast conversion tools",
    };
  }

  const page = getLaunchPage(slugOrCategory);

  if (!page) {
    return null;
  }

  if (page.kind === "text") {
    return {
      eyebrow: "Text conversion",
      title: page.title,
      subtitle: "Instant text formatting",
    };
  }

  return {
    eyebrow: "Unit conversion",
    title: `${units[page.from].shortLabel} \u2192 ${units[page.to].shortLabel} Converter`,
    subtitle: "Instant unit conversion",
  };
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { category } = await params;
  const copy = getImageCopy(category);

  if (!copy) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, rgb(12, 16, 20) 0%, rgb(15, 23, 28) 55%, rgb(18, 33, 34) 100%)",
          color: "#f3f6f6",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "56px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            color: "#99b1ad",
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {copy.eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "900px" }}>
          <div
            style={{
              color: "#f7fbfa",
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1.02,
            }}
          >
            {copy.title}
          </div>
          <div
            style={{
              color: "#9be4cf",
              display: "flex",
              fontSize: 34,
              letterSpacing: "-0.03em",
            }}
          >
            {copy.subtitle}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(153, 177, 173, 0.28)",
              borderRadius: "999px",
              color: "#f3f6f6",
              display: "flex",
              fontSize: 28,
              padding: "16px 24px",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              color: "#99b1ad",
              display: "flex",
              fontSize: 22,
            }}
          >
            convertcenter.org
          </div>
        </div>
      </div>
    ),
    size,
  );
}
