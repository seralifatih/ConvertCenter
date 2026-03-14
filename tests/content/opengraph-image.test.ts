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
      title: "kg → lb Converter",
      subtitle: "Instant unit conversion",
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
