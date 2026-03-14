"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import {
  formatHslString,
  formatRgbString,
  hexToHsl,
  hexToRgb,
  hslToHex,
  hslToRgb,
  parseHexColor,
  parseHslColor,
  parseRgbColor,
  parseRgbString,
  rgbToHex,
} from "@/lib/color";

export type ColorToolMode = "hexToRgb" | "rgbToHex" | "hexToHsl" | "hslToHex";

type HexDefaults = {
  hex: string;
};

type RgbDefaults = {
  blue: string;
  green: string;
  red: string;
};

type HslDefaults = {
  hue: string;
  lightness: string;
  saturation: string;
};

type ColorToolWidgetProps =
  | {
      defaults: HexDefaults;
      mode: "hexToRgb" | "hexToHsl";
    }
  | {
      defaults: RgbDefaults;
      mode: "rgbToHex";
    }
  | {
      defaults: HslDefaults;
      mode: "hslToHex";
    };

function getModeLabels(mode: ColorToolMode) {
  switch (mode) {
    case "hexToRgb":
      return {
        badge: "rgb output",
        helper: "Paste a HEX color from a design file, brand guide, or CSS token.",
      };
    case "rgbToHex":
      return {
        badge: "hex output",
        helper: "Enter RGB channel values from browser tools, graphics software, or code.",
      };
    case "hexToHsl":
      return {
        badge: "hsl output",
        helper: "Convert a HEX color into HSL for hue, saturation, and lightness adjustments.",
      };
    case "hslToHex":
      return {
        badge: "hex output",
        helper: "Enter HSL values to generate a HEX color for CSS, themes, and design systems.",
      };
  }
}

export function ColorToolWidget(props: ColorToolWidgetProps) {
  const primaryId = useId();
  const redId = useId();
  const greenId = useId();
  const blueId = useId();
  const hueId = useId();
  const saturationId = useId();
  const lightnessId = useId();
  const [hexValue, setHexValue] = useState(
    props.mode === "hexToRgb" || props.mode === "hexToHsl" ? props.defaults.hex : "#FF6B6B",
  );
  const [redValue, setRedValue] = useState(props.mode === "rgbToHex" ? props.defaults.red : "255");
  const [greenValue, setGreenValue] = useState(
    props.mode === "rgbToHex" ? props.defaults.green : "107",
  );
  const [blueValue, setBlueValue] = useState(
    props.mode === "rgbToHex" ? props.defaults.blue : "107",
  );
  const [rgbTextValue, setRgbTextValue] = useState(
    props.mode === "rgbToHex"
      ? `${props.defaults.red}, ${props.defaults.green}, ${props.defaults.blue}`
      : "255, 107, 107",
  );
  const [hueValue, setHueValue] = useState(props.mode === "hslToHex" ? props.defaults.hue : "0");
  const [saturationValue, setSaturationValue] = useState(
    props.mode === "hslToHex" ? props.defaults.saturation : "100",
  );
  const [lightnessValue, setLightnessValue] = useState(
    props.mode === "hslToHex" ? props.defaults.lightness : "71",
  );

  const labels = getModeLabels(props.mode);
  const parsedHex = parseHexColor(hexValue);
  const parsedRgb = parseRgbColor(Number(redValue), Number(greenValue), Number(blueValue));
  const parsedHsl = parseHslColor(Number(hueValue), Number(saturationValue), Number(lightnessValue));

  let outputText = "";
  let errorMessage: string | null = null;
  let swatchColor: string | undefined;

  if (props.mode === "hexToRgb") {
    errorMessage = parsedHex.error;
    const rgb = hexToRgb(hexValue);
    outputText = rgb ? formatRgbString(rgb) : "Enter a valid HEX color.";
    swatchColor = parsedHex.value ?? undefined;
  } else if (props.mode === "rgbToHex") {
    const parsedFromText = parseRgbString(rgbTextValue);
    const activeRgb =
      rgbTextValue.trim() && !parsedFromText.error
        ? parsedFromText.value
        : parsedRgb.value;
    errorMessage =
      rgbTextValue.trim() && parsedFromText.error && !parsedRgb.value
        ? parsedFromText.error
        : parsedRgb.error;
    const hex = activeRgb ? rgbToHex(activeRgb.red, activeRgb.green, activeRgb.blue) : null;
    outputText = hex ?? "Enter valid RGB values between 0 and 255.";
    swatchColor = hex ?? undefined;
  } else if (props.mode === "hexToHsl") {
    errorMessage = parsedHex.error;
    const hsl = hexToHsl(hexValue);
    outputText = hsl ? formatHslString(hsl) : "Enter a valid HEX color.";
    swatchColor = parsedHex.value ?? undefined;
  } else {
    errorMessage = parsedHsl.error;
    const hex = hslToHex(Number(hueValue), Number(saturationValue), Number(lightnessValue));
    outputText = hex ?? "Enter valid HSL values for hue, saturation, and lightness.";
    const rgb = hslToRgb(Number(hueValue), Number(saturationValue), Number(lightnessValue));
    swatchColor = rgb ? rgbToHex(rgb.red, rgb.green, rgb.blue) ?? undefined : undefined;
  }

  const canCopy = !errorMessage;

  function resetValues() {
    if (props.mode === "hexToRgb" || props.mode === "hexToHsl") {
      setHexValue(props.defaults.hex);
      return;
    }

    if (props.mode === "rgbToHex") {
      setRedValue(props.defaults.red);
      setGreenValue(props.defaults.green);
      setBlueValue(props.defaults.blue);
      setRgbTextValue(`${props.defaults.red}, ${props.defaults.green}, ${props.defaults.blue}`);
      return;
    }

    if (props.mode === "hslToHex") {
      setHueValue(props.defaults.hue);
      setSaturationValue(props.defaults.saturation);
      setLightnessValue(props.defaults.lightness);
    }
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          {props.mode === "hexToRgb" || props.mode === "hexToHsl" ? (
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={primaryId}>
                hex color
              </label>
              <input
                aria-invalid={Boolean(errorMessage)}
                className="input-surface px-3 py-3 font-mono text-base"
                id={primaryId}
                onChange={(event) => setHexValue(event.target.value)}
                placeholder="#FF6B6B"
                type="text"
                value={hexValue}
              />
            </div>
          ) : null}

          {props.mode === "rgbToHex" ? (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="mono-kicker" htmlFor={primaryId}>
                  rgb input
                </label>
                <input
                  aria-invalid={Boolean(errorMessage)}
                  className="input-surface px-3 py-3 font-mono text-base"
                  id={primaryId}
                  onChange={(event) => setRgbTextValue(event.target.value)}
                  placeholder="255, 0, 0"
                  type="text"
                  value={rgbTextValue}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label className="mono-kicker" htmlFor={redId}>
                    red
                  </label>
                  <input
                    aria-invalid={Boolean(errorMessage)}
                    className="input-surface px-3 py-3 font-mono text-base"
                    id={redId}
                    max="255"
                    min="0"
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      setRedValue(nextValue);
                      setRgbTextValue(`${nextValue}, ${greenValue}, ${blueValue}`);
                    }}
                    type="number"
                    value={redValue}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="mono-kicker" htmlFor={greenId}>
                    green
                  </label>
                  <input
                    aria-invalid={Boolean(errorMessage)}
                    className="input-surface px-3 py-3 font-mono text-base"
                    id={greenId}
                    max="255"
                    min="0"
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      setGreenValue(nextValue);
                      setRgbTextValue(`${redValue}, ${nextValue}, ${blueValue}`);
                    }}
                    type="number"
                    value={greenValue}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="mono-kicker" htmlFor={blueId}>
                    blue
                  </label>
                  <input
                    aria-invalid={Boolean(errorMessage)}
                    className="input-surface px-3 py-3 font-mono text-base"
                    id={blueId}
                    max="255"
                    min="0"
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      setBlueValue(nextValue);
                      setRgbTextValue(`${redValue}, ${greenValue}, ${nextValue}`);
                    }}
                    type="number"
                    value={blueValue}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {props.mode === "hslToHex" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <label className="mono-kicker" htmlFor={hueId}>
                  hue
                </label>
                <input
                  aria-invalid={Boolean(errorMessage)}
                  className="input-surface px-3 py-3 font-mono text-base"
                  id={hueId}
                  max="360"
                  min="0"
                  onChange={(event) => setHueValue(event.target.value)}
                  type="number"
                  value={hueValue}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="mono-kicker" htmlFor={saturationId}>
                  saturation %
                </label>
                <input
                  aria-invalid={Boolean(errorMessage)}
                  className="input-surface px-3 py-3 font-mono text-base"
                  id={saturationId}
                  max="100"
                  min="0"
                  onChange={(event) => setSaturationValue(event.target.value)}
                  type="number"
                  value={saturationValue}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="mono-kicker" htmlFor={lightnessId}>
                  lightness %
                </label>
                <input
                  aria-invalid={Boolean(errorMessage)}
                  className="input-surface px-3 py-3 font-mono text-base"
                  id={lightnessId}
                  max="100"
                  min="0"
                  onChange={(event) => setLightnessValue(event.target.value)}
                  type="number"
                  value={lightnessValue}
                />
              </div>
            </div>
          ) : null}

          <p className="text-sm leading-7 text-[color:var(--muted)]">{labels.helper}</p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">{labels.badge}</span>
            <span className="section-badge">live</span>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-4">
            <div
              aria-hidden="true"
              className="h-12 w-12 rounded-xl border border-[color:var(--accent-text)]/30"
              style={swatchColor ? { backgroundColor: swatchColor } : undefined}
            />
            <p className="font-mono text-lg text-[color:var(--accent)] break-all">{outputText}</p>
          </div>
          {errorMessage ? (
            <p className="mt-3 text-sm leading-7 text-[color:#f6b3a8]">{errorMessage}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {canCopy ? <CopyButton text={outputText} /> : null}
            <PillButton aria-label="Clear color converter values" onClick={resetValues}>
              clear
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
