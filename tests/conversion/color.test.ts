import { describe, expect, it } from "vitest";
import {
  formatHslString,
  formatRgbString,
  hexToHsl,
  hexToRgb,
  hslToRgb,
  hslToHex,
  parseHexColor,
  parseHslColor,
  parseRgbColor,
  parseRgbString,
  rgbToHsl,
  rgbToHex,
} from "@/lib/color";

describe("color conversions", () => {
  it("converts hex to rgb", () => {
    expect(hexToRgb("#FF6B6B")).toEqual({ blue: 107, green: 107, red: 255 });
  });

  it("supports short hex input", () => {
    expect(formatRgbString(hexToRgb("#0af")!)).toBe("rgb(0, 170, 255)");
  });

  it("converts rgb to hex", () => {
    expect(rgbToHex(255, 107, 107)).toBe("#FF6B6B");
  });

  it("formats rgb output consistently", () => {
    expect(formatRgbString({ blue: 0, green: 255, red: 0 })).toBe("rgb(0, 255, 0)");
  });

  it("converts hex to hsl", () => {
    expect(formatHslString(hexToHsl("#FF0000")!)).toBe("hsl(0, 100%, 50%)");
  });

  it("converts hsl to hex", () => {
    expect(hslToHex(0, 100, 50)).toBe("#FF0000");
  });

  it("round-trips rgb and hsl conversions for a representative color", () => {
    expect(rgbToHsl(255, 0, 0)).toEqual({ hue: 0, lightness: 50, saturation: 100 });
    expect(hslToRgb(0, 100, 50)).toEqual({ blue: 0, green: 0, red: 255 });
  });

  it("formats hsl output consistently", () => {
    expect(formatHslString({ hue: 210, lightness: 50, saturation: 100 })).toBe("hsl(210, 100%, 50%)");
  });

  it("returns clear validation errors for invalid hex", () => {
    expect(parseHexColor("#12").error).toBe("Enter a valid HEX color like #FF6B6B or #F66.");
  });

  it("returns null for invalid conversion inputs", () => {
    expect(hexToRgb("#12")).toBeNull();
    expect(hexToHsl("not-a-color")).toBeNull();
    expect(rgbToHex(300, 0, 0)).toBeNull();
    expect(hslToHex(361, 50, 50)).toBeNull();
  });

  it("returns clear validation errors for invalid rgb ranges", () => {
    expect(parseRgbColor(300, 0, 0).error).toBe("RGB values must stay between 0 and 255.");
  });

  it("supports comma-separated rgb input", () => {
    expect(parseRgbString("255, 0, 0").value).toEqual({ blue: 0, green: 0, red: 255 });
    expect(parseRgbString("rgb(0, 255, 0)").value).toEqual({ blue: 0, green: 255, red: 0 });
  });

  it("returns clear validation errors for invalid hsl values", () => {
    expect(parseHslColor(361, 50, 50).error).toBe(
      "Hue must be 0 to 360, and saturation/lightness must be 0% to 100%.",
    );
  });
});
