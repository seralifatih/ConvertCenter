"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import { formatHslString, formatRgbString, hexToHsl, hexToRgb } from "@/lib/color";

const DEFAULT_HEX = "#FF6B6B";

type ColorValueRowProps = {
  label: string;
  value: string;
};

function ColorValueRow({ label, value }: ColorValueRowProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="mono-kicker">{label}</p>
        <p className="mt-2 break-all font-mono text-sm text-[color:var(--text)] sm:text-base">
          {value}
        </p>
      </div>
      <CopyButton text={value} />
    </div>
  );
}

export function ColorPickerWidget() {
  const [hexValue, setHexValue] = useState(DEFAULT_HEX);

  const derived = useMemo(() => {
    const rgb = hexToRgb(hexValue) ?? hexToRgb(DEFAULT_HEX);
    const hsl = hexToHsl(hexValue) ?? hexToHsl(DEFAULT_HEX);

    if (!rgb || !hsl) {
      return {
        hex: DEFAULT_HEX,
        hslText: "hsl(0, 0%, 0%)",
        rgbText: "rgb(0, 0, 0)",
      };
    }

    return {
      hex: hexValue.toUpperCase(),
      hslText: formatHslString(hsl),
      rgbText: formatRgbString(rgb),
    };
  }, [hexValue]);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <label className="mono-kicker" htmlFor="color-picker-input">
              pick a color
            </label>
            <div className="flex items-center gap-3 rounded-[20px] border border-[color:var(--border-strong)] bg-[color:var(--panel)] px-3 py-3">
              <input
                aria-label="Pick a color"
                className="h-14 w-16 cursor-pointer rounded-xl border border-[color:var(--border)] bg-transparent p-1"
                id="color-picker-input"
                onChange={(event) => setHexValue(event.target.value.toUpperCase())}
                type="color"
                value={hexValue}
              />
              <div className="min-w-0">
                <p className="mono-kicker">selected hex</p>
                <p className="mt-2 font-mono text-lg text-[color:var(--text)]">{derived.hex}</p>
              </div>
            </div>
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            Use the native browser picker for a fast workflow, then copy the exact HEX, RGB, or HSL
            value you need for CSS, design tokens, or handoff notes.
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">live color values</span>
            <span className="section-badge">picker</span>
          </div>

          <div className="mb-4 rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 p-4">
            <div
              aria-label={`Preview swatch for ${derived.hex}`}
              className="h-28 rounded-2xl border border-[color:var(--accent-text)]/30"
              role="img"
              style={{ backgroundColor: hexValue }}
            />
          </div>

          <div className="space-y-3">
            <ColorValueRow label="hex" value={derived.hex} />
            <ColorValueRow label="rgb" value={derived.rgbText} />
            <ColorValueRow label="hsl" value={derived.hslText} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <PillButton aria-label="Reset color picker to default color" onClick={() => setHexValue(DEFAULT_HEX)}>
              clear
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
