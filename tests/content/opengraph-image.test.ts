import { describe, expect, it } from "vitest";
import OpenGraphImage, {
  contentType,
  getImageCopy,
  size,
} from "../../app/[category]/opengraph-image";

describe("opengraph image route", () => {
  it("returns the expected copy for a converter page", () => {
    const copy = getImageCopy("kg-to-lbs");

    expect(copy).toEqual({
      eyebrow: "Unit conversion",
      title: "kg -> lb Converter",
      subtitle: "Instant unit conversion",
    });
  });

  it("returns the expected copy for a math calculator page", () => {
    expect(getImageCopy("average-calculator")).toEqual({
      eyebrow: "Math calculator",
      title: "Average Calculator",
      subtitle: "Instant browser-based math tool",
    });
  });

  it("returns the expected copy for an interactive calculator page", () => {
    expect(getImageCopy("watts-to-amps")).toEqual({
      eyebrow: "Interactive tool",
      title: "Watts to Amps Calculator",
      subtitle: "Instant browser-based calculator",
    });
  });

  it("returns text-specific copy for an interactive text tool", () => {
    expect(getImageCopy("readability-checker")).toEqual({
      eyebrow: "Text utility",
      title: "Readability Checker",
      subtitle: "Interactive browser-based text tool",
    });
  });

  it("returns generator-specific copy for an interactive generator tool", () => {
    expect(getImageCopy("random-password-generator")).toEqual({
      eyebrow: "Generator tool",
      title: "Random Password Generator",
      subtitle: "Interactive browser-based random generator",
    });
  });

  it("returns developer-specific copy for an interactive dev-data tool", () => {
    expect(getImageCopy("regex-tester")).toEqual({
      eyebrow: "Developer tool",
      title: "Regex Tester",
      subtitle: "Interactive browser-based developer utility",
    });
  });

  it("returns category-specific copy for new SEO, social, and micro utility tools", () => {
    expect(getImageCopy("meta-tag-generator")).toEqual({
      eyebrow: "SEO tool",
      title: "Meta Tag Generator",
      subtitle: "Interactive browser-based marketing utility",
    });
    expect(getImageCopy("hashtag-generator")).toEqual({
      eyebrow: "Social tool",
      title: "Hashtag Generator",
      subtitle: "Interactive browser-based social utility",
    });
    expect(getImageCopy("color-contrast-checker")).toEqual({
      eyebrow: "Design utility",
      title: "Color Contrast Checker",
      subtitle: "Interactive browser-based micro utility",
    });
  });

  it("returns image-specific copy for an interactive image tool", () => {
    expect(getImageCopy("png-to-jpg")).toEqual({
      eyebrow: "Image tool",
      title: "PNG to JPG",
      subtitle: "Interactive browser-based image utility",
    });
  });

  it("returns file-specific copy for an interactive file tool", () => {
    expect(getImageCopy("pdf-to-text")).toEqual({
      eyebrow: "File tool",
      title: "PDF to Text",
      subtitle: "Interactive browser-based PDF utility",
    });
  });

  it("responds successfully for a sample converter page", async () => {
    const response = await OpenGraphImage({
      params: Promise.resolve({
        category: "kg-to-lbs",
      }),
    });

    expect(response).toBeInstanceOf(Response);
    expect(response.headers.get("content-type")).toContain(contentType);
    expect(size).toEqual({ width: 1200, height: 630 });
    await expect(response.arrayBuffer()).resolves.toBeInstanceOf(ArrayBuffer);
  });
});
