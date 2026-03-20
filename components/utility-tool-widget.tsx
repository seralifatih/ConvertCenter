"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import {
  buildBorderRadius,
  buildBoxShadow,
  buildCssGradient,
  getContrastRatio,
} from "@/lib/conversion/micro-utilities";
import { getDefaultUtilityToolValues, getUtilityToolDefinition } from "@/lib/utility-tools/registry";
import type {
  UtilityFormToolDefinition,
  UtilityOutput,
  UtilityResult,
  UtilityStyleToolDefinition,
  UtilityToolField,
  UtilityToolId,
} from "@/lib/utility-tools/types";

type UtilityToolWidgetProps = {
  toolId: UtilityToolId;
};

type UtilityFieldValues = Record<string, boolean | string>;

type StylePreviewResult = {
  metrics: readonly {
    label: string;
    value: string;
  }[];
  notes?: readonly string[];
  output: UtilityOutput;
  previewStyle: CSSProperties;
  status: string;
  summary: string;
};

type ContrastValues = {
  backgroundColor: string;
  foregroundColor: string;
  sampleText: string;
};

type GradientValues = {
  angle: string;
  endColor: string;
  startColor: string;
};

type BoxShadowValues = {
  blur: string;
  color: string;
  inset: boolean;
  offsetX: string;
  offsetY: string;
  opacity: string;
  spread: string;
};

type BorderRadiusValues = {
  bottomLeft: string;
  bottomRight: string;
  topLeft: string;
  topRight: string;
};

function buttonToneClass(disabled = false) {
  return disabled
    ? "cursor-not-allowed border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--muted)]"
    : "border-transparent bg-[color:var(--accent)] text-[color:var(--page)] hover:opacity-90";
}

function numberFieldClass() {
  return "input-surface w-full px-3 py-3 font-mono text-sm text-[color:var(--text)]";
}

function parseNumber(value: string, label: string, options?: { max?: number; min?: number }) {
  const parsed = Number(value);

  if (!value.trim() || !Number.isFinite(parsed)) {
    throw new Error(`Enter a valid number for ${label}.`);
  }

  if (options?.min !== undefined && parsed < options.min) {
    throw new Error(`${label} must be at least ${options.min}.`);
  }

  if (options?.max !== undefined && parsed > options.max) {
    throw new Error(`${label} must be ${options.max} or less.`);
  }

  return parsed;
}

function normalizeColorInput(value: string, fallback: string) {
  const trimmed = value.trim();

  if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    const shortHex = trimmed.slice(1).toUpperCase();
    return `#${shortHex
      .split("")
      .map((character) => `${character}${character}`)
      .join("")}`;
  }

  return fallback;
}

function UtilityFieldInput({
  field,
  onChange,
  value,
}: {
  field: UtilityToolField;
  onChange: (nextValue: boolean | string) => void;
  value: boolean | string;
}) {
  if (field.type === "checkbox") {
    return (
      <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3">
        <input
          checked={Boolean(value)}
          className="mt-1"
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
        <span className="space-y-1">
          <span className="block font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--text)]">
            {field.label}
          </span>
          {field.helpText ? (
            <span className="block text-xs leading-6 text-[color:var(--muted)]">
              {field.helpText}
            </span>
          ) : null}
        </span>
      </label>
    );
  }

  return (
    <label className="space-y-2">
      <span className="mono-kicker">{field.label}</span>
      {field.type === "select" ? (
        <select
          className={numberFieldClass()}
          onChange={(event) => onChange(event.target.value)}
          value={typeof value === "string" ? value : ""}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          className={`${numberFieldClass()} min-h-28 resize-y`}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          rows={field.rows ?? 5}
          value={typeof value === "string" ? value : ""}
        />
      ) : (
        <input
          className={numberFieldClass()}
          max={field.max}
          min={field.min}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          step={field.step}
          type={field.type}
          value={typeof value === "string" ? value : ""}
        />
      )}
      {field.helpText ? (
        <p className="text-xs leading-6 text-[color:var(--muted)]">{field.helpText}</p>
      ) : null}
    </label>
  );
}

function UtilityOutputBlock({ output }: { output: UtilityOutput }) {
  return (
    <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="mono-kicker text-[color:var(--accent-text)]">{output.label}</span>
        <CopyButton idleLabel="copy" text={output.copyText ?? output.value} />
      </div>
      <textarea
        className="input-surface min-h-32 w-full resize-y px-3 py-3 font-mono text-sm text-[color:var(--text)]"
        readOnly
        value={output.value}
      />
    </div>
  );
}

function UtilityResultPanel({
  error,
  hint,
  preview,
  result,
}: {
  error: string | null;
  hint: string;
  preview?: ReactNode;
  result: UtilityResult | null;
}) {
  return (
    <div className="rounded-[24px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="mono-kicker text-[color:var(--accent-text)]">result panel</span>
        <span className="section-badge">{result ? "ready" : "waiting"}</span>
      </div>

      {error ? (
        <div className="mb-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3">
          <div className="mono-kicker mb-2 text-rose-200">error</div>
          <p className="text-sm leading-7 text-rose-50">{error}</p>
        </div>
      ) : null}

      {result ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/35 px-4 py-4">
            <div className="font-mono text-lg text-[color:var(--accent)]">{result.summary}</div>
            {result.status ? (
              <p className="mt-2 text-sm leading-7 text-[color:var(--accent-text)]">
                {result.status}
              </p>
            ) : null}
          </div>

          {preview}

          {result.metrics?.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {result.metrics.map((metric) => (
                <div
                  className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-3"
                  key={metric.label}
                >
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">
                    {metric.label}
                  </div>
                  <p className="font-mono text-base text-[color:var(--accent)]">{metric.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          {result.outputs?.length ? (
            <div className="space-y-4">
              {result.outputs.map((output) => (
                <UtilityOutputBlock key={output.label} output={output} />
              ))}
            </div>
          ) : null}

          {result.notes?.length ? (
            <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
              <div className="mono-kicker mb-2 text-[color:var(--accent-text)]">notes</div>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[color:var(--accent-text)]">
                {result.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
          <p className="text-sm leading-7 text-[color:var(--accent-text)]">{hint}</p>
        </div>
      )}
    </div>
  );
}

function UtilityFormWidget({ tool }: { tool: UtilityFormToolDefinition }) {
  const [values, setValues] = useState<UtilityFieldValues>(() => getDefaultUtilityToolValues(tool));
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UtilityResult | null>(null);

  function handleReset() {
    setValues(getDefaultUtilityToolValues(tool));
    setError(null);
    setResult(null);
  }

  function handleRun() {
    try {
      const nextResult = tool.run({ values });
      setResult(nextResult);
      setError(null);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The tool could not complete the request.",
      );
      setResult(null);
    }
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="space-y-4">
          <div className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4">
            <div className="mono-kicker mb-2">tool workflow</div>
            <p className="text-sm leading-7 text-[color:var(--muted)]">{tool.hint}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {tool.fields.map((field) => (
              <UtilityFieldInput
                field={field}
                key={field.id}
                onChange={(nextValue) => {
                  setValues((currentValues) => ({
                    ...currentValues,
                    [field.id]: nextValue,
                  }));
                  setError(null);
                  setResult(null);
                }}
                value={values[field.id] ?? field.defaultValue}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded-full px-4 py-2 text-xs font-medium ${buttonToneClass()}`}
              onClick={handleRun}
              type="button"
            >
              {tool.actionLabel}
            </button>
            <PillButton aria-label={`Reset ${tool.title}`} onClick={handleReset}>
              reset
            </PillButton>
          </div>
        </div>

        <UtilityResultPanel error={error} hint={tool.hint} result={result} />
      </div>
    </section>
  );
}

function ColorInput({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (nextValue: string) => void;
  value: string;
}) {
  const normalizedColor = useMemo(() => normalizeColorInput(value, "#111827"), [value]);

  return (
    <label className="space-y-2">
      <span className="mono-kicker">{label}</span>
      <div className="flex items-center gap-3">
        <input
          className="h-12 w-14 cursor-pointer rounded-2xl border border-[color:var(--border)] bg-transparent p-1"
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          type="color"
          value={normalizedColor}
        />
        <input
          className={`${numberFieldClass()} flex-1`}
          onChange={(event) => onChange(event.target.value)}
          placeholder="#111827"
          type="text"
          value={value}
        />
      </div>
    </label>
  );
}

function UtilityPreviewCard({
  children,
  style,
}: {
  children?: ReactNode;
  style: CSSProperties;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
      <div className="mono-kicker mb-3 text-[color:var(--accent-text)]">preview</div>
      <div
        className="flex min-h-40 items-center justify-center rounded-[24px] border border-[color:var(--border)] px-6 py-8 text-center"
        style={style}
      >
        {children}
      </div>
    </div>
  );
}

function buildContrastResult(values: ContrastValues): StylePreviewResult {
  const foregroundColor = values.foregroundColor.trim();
  const backgroundColor = values.backgroundColor.trim();
  const sampleText = values.sampleText.trim() || "Sample preview text";
  const contrast = getContrastRatio(foregroundColor, backgroundColor);
  const ratioLabel = `${contrast.ratio.toFixed(2)}:1`;
  const status = contrast.passesAaNormal
    ? "Passes WCAG AA for normal text."
    : contrast.passesAaLarge
      ? "Passes WCAG AA for large text only."
      : "Fails WCAG AA for standard text sizes.";

  return {
    metrics: [
      { label: "contrast ratio", value: ratioLabel },
      { label: "AA normal", value: contrast.passesAaNormal ? "pass" : "fail" },
      { label: "AAA normal", value: contrast.passesAaaNormal ? "pass" : "fail" },
      { label: "AA large", value: contrast.passesAaLarge ? "pass" : "fail" },
    ],
    notes: [
      contrast.passesAaaNormal
        ? "This pair also clears the stricter AAA target for normal text."
        : "Use a larger lightness difference if you need AAA contrast for smaller text.",
    ],
    output: {
      label: "sample CSS",
      value: `color: ${foregroundColor.toUpperCase()};\nbackground-color: ${backgroundColor.toUpperCase()};`,
    },
    previewStyle: {
      backgroundColor,
      color: foregroundColor,
      fontSize: "1.1rem",
      fontWeight: 600,
      lineHeight: 1.6,
    },
    status,
    summary: sampleText,
  };
}

function buildGradientResult(values: GradientValues): StylePreviewResult {
  const angle = parseNumber(values.angle, "angle", { max: 360, min: 0 });
  const gradient = buildCssGradient({
    angle,
    endColor: values.endColor,
    startColor: values.startColor,
  });

  return {
    metrics: [
      { label: "angle", value: `${Math.round(angle)}deg` },
      { label: "start color", value: values.startColor.toUpperCase() },
      { label: "end color", value: values.endColor.toUpperCase() },
    ],
    output: {
      label: "gradient CSS",
      value: gradient.css,
    },
    previewStyle: {
      backgroundImage: gradient.style,
      color: "#FFFFFF",
      fontSize: "1rem",
      fontWeight: 600,
    },
    status: "Gradient CSS is ready to copy into your stylesheet.",
    summary: "Linear gradient preview",
  };
}

function buildBoxShadowResult(values: BoxShadowValues): StylePreviewResult {
  const shadow = buildBoxShadow({
    blur: parseNumber(values.blur, "blur", { max: 160, min: 0 }),
    color: values.color,
    inset: values.inset,
    offsetX: parseNumber(values.offsetX, "horizontal offset", { max: 160, min: -160 }),
    offsetY: parseNumber(values.offsetY, "vertical offset", { max: 160, min: -160 }),
    opacity: parseNumber(values.opacity, "opacity", { max: 1, min: 0 }),
    spread: parseNumber(values.spread, "spread", { max: 160, min: -160 }),
  });

  return {
    metrics: [
      { label: "offset", value: `${values.offsetX}px / ${values.offsetY}px` },
      { label: "blur", value: `${values.blur}px` },
      { label: "spread", value: `${values.spread}px` },
      { label: "shadow type", value: values.inset ? "inset" : "drop shadow" },
    ],
    output: {
      label: "box-shadow CSS",
      value: shadow.css,
    },
    previewStyle: {
      backgroundColor: "#F8FAFC",
      borderRadius: "24px",
      boxShadow: shadow.style,
      color: "#111827",
      height: "10rem",
      width: "100%",
    },
    status: "Box-shadow CSS is ready to paste into a card, button, or panel.",
    summary: "Shadow preview surface",
  };
}

function buildBorderRadiusResult(values: BorderRadiusValues): StylePreviewResult {
  const radius = buildBorderRadius({
    bottomLeft: parseNumber(values.bottomLeft, "bottom-left radius", { max: 200, min: 0 }),
    bottomRight: parseNumber(values.bottomRight, "bottom-right radius", { max: 200, min: 0 }),
    topLeft: parseNumber(values.topLeft, "top-left radius", { max: 200, min: 0 }),
    topRight: parseNumber(values.topRight, "top-right radius", { max: 200, min: 0 }),
  });

  return {
    metrics: [
      { label: "top left", value: `${values.topLeft}px` },
      { label: "top right", value: `${values.topRight}px` },
      { label: "bottom right", value: `${values.bottomRight}px` },
      { label: "bottom left", value: `${values.bottomLeft}px` },
    ],
    output: {
      label: "border-radius CSS",
      value: radius.css,
    },
    previewStyle: {
      backgroundImage: "linear-gradient(135deg, #1D4ED8 0%, #22C55E 100%)",
      borderRadius: radius.style,
      color: "#F8FAFC",
      fontWeight: 600,
    },
    status: "Border-radius CSS is ready for your next component or card.",
    summary: "Corner radius preview",
  };
}

function UtilityStyleWidget({ tool }: { tool: UtilityStyleToolDefinition }) {
  const [contrastValues, setContrastValues] = useState<ContrastValues>({
    backgroundColor: "#F9FAFB",
    foregroundColor: "#111827",
    sampleText: "Contrast preview text for headings, labels, and body copy.",
  });
  const [gradientValues, setGradientValues] = useState<GradientValues>({
    angle: "135",
    endColor: "#14B8A6",
    startColor: "#1D4ED8",
  });
  const [boxShadowValues, setBoxShadowValues] = useState<BoxShadowValues>({
    blur: "36",
    color: "#0F172A",
    inset: false,
    offsetX: "0",
    offsetY: "18",
    opacity: "0.22",
    spread: "-12",
  });
  const [borderRadiusValues, setBorderRadiusValues] = useState<BorderRadiusValues>({
    bottomLeft: "24",
    bottomRight: "24",
    topLeft: "24",
    topRight: "64",
  });
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StylePreviewResult | null>(null);

  function handleReset() {
    setError(null);
    setResult(null);

    if (tool.mode === "contrast") {
      setContrastValues({
        backgroundColor: "#F9FAFB",
        foregroundColor: "#111827",
        sampleText: "Contrast preview text for headings, labels, and body copy.",
      });
      return;
    }

    if (tool.mode === "gradient") {
      setGradientValues({
        angle: "135",
        endColor: "#14B8A6",
        startColor: "#1D4ED8",
      });
      return;
    }

    if (tool.mode === "boxShadow") {
      setBoxShadowValues({
        blur: "36",
        color: "#0F172A",
        inset: false,
        offsetX: "0",
        offsetY: "18",
        opacity: "0.22",
        spread: "-12",
      });
      return;
    }

    setBorderRadiusValues({
      bottomLeft: "24",
      bottomRight: "24",
      topLeft: "24",
      topRight: "64",
    });
  }

  function handleRun() {
    try {
      const nextResult =
        tool.mode === "contrast"
          ? buildContrastResult(contrastValues)
          : tool.mode === "gradient"
            ? buildGradientResult(gradientValues)
            : tool.mode === "boxShadow"
              ? buildBoxShadowResult(boxShadowValues)
              : buildBorderRadiusResult(borderRadiusValues);

      setResult(nextResult);
      setError(null);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The tool could not complete the request.",
      );
      setResult(null);
    }
  }

  const preview = result ? (
    <UtilityPreviewCard style={result.previewStyle}>
      {tool.mode === "boxShadow" ? (
        <div className="flex h-28 w-28 items-center justify-center rounded-[24px] bg-white text-sm font-medium text-[#111827]">
          Shadow
        </div>
      ) : (
        <div className="max-w-sm text-balance">{result.summary}</div>
      )}
    </UtilityPreviewCard>
  ) : undefined;

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="space-y-4">
          <div className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4">
            <div className="mono-kicker mb-2">tool workflow</div>
            <p className="text-sm leading-7 text-[color:var(--muted)]">{tool.hint}</p>
          </div>

          {tool.mode === "contrast" ? (
            <div className="space-y-3">
              <ColorInput
                label="foreground color"
                onChange={(nextValue) => {
                  setContrastValues((currentValues) => ({
                    ...currentValues,
                    foregroundColor: nextValue,
                  }));
                  setError(null);
                  setResult(null);
                }}
                value={contrastValues.foregroundColor}
              />
              <ColorInput
                label="background color"
                onChange={(nextValue) => {
                  setContrastValues((currentValues) => ({
                    ...currentValues,
                    backgroundColor: nextValue,
                  }));
                  setError(null);
                  setResult(null);
                }}
                value={contrastValues.backgroundColor}
              />
              <label className="space-y-2">
                <span className="mono-kicker">sample text</span>
                <textarea
                  className={`${numberFieldClass()} min-h-28 resize-y`}
                  onChange={(event) => {
                    setContrastValues((currentValues) => ({
                      ...currentValues,
                      sampleText: event.target.value,
                    }));
                    setError(null);
                    setResult(null);
                  }}
                  rows={5}
                  value={contrastValues.sampleText}
                />
              </label>
            </div>
          ) : null}

          {tool.mode === "gradient" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <ColorInput
                label="start color"
                onChange={(nextValue) => {
                  setGradientValues((currentValues) => ({
                    ...currentValues,
                    startColor: nextValue,
                  }));
                  setError(null);
                  setResult(null);
                }}
                value={gradientValues.startColor}
              />
              <ColorInput
                label="end color"
                onChange={(nextValue) => {
                  setGradientValues((currentValues) => ({
                    ...currentValues,
                    endColor: nextValue,
                  }));
                  setError(null);
                  setResult(null);
                }}
                value={gradientValues.endColor}
              />
              <label className="space-y-2 sm:col-span-2">
                <span className="mono-kicker">angle</span>
                <input
                  className={numberFieldClass()}
                  max={360}
                  min={0}
                  onChange={(event) => {
                    setGradientValues((currentValues) => ({
                      ...currentValues,
                      angle: event.target.value,
                    }));
                    setError(null);
                    setResult(null);
                  }}
                  step="1"
                  type="number"
                  value={gradientValues.angle}
                />
              </label>
            </div>
          ) : null}

          {tool.mode === "boxShadow" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="mono-kicker">horizontal offset</span>
                <input
                  className={numberFieldClass()}
                  onChange={(event) => {
                    setBoxShadowValues((currentValues) => ({
                      ...currentValues,
                      offsetX: event.target.value,
                    }));
                    setError(null);
                    setResult(null);
                  }}
                  step="1"
                  type="number"
                  value={boxShadowValues.offsetX}
                />
              </label>
              <label className="space-y-2">
                <span className="mono-kicker">vertical offset</span>
                <input
                  className={numberFieldClass()}
                  onChange={(event) => {
                    setBoxShadowValues((currentValues) => ({
                      ...currentValues,
                      offsetY: event.target.value,
                    }));
                    setError(null);
                    setResult(null);
                  }}
                  step="1"
                  type="number"
                  value={boxShadowValues.offsetY}
                />
              </label>
              <label className="space-y-2">
                <span className="mono-kicker">blur</span>
                <input
                  className={numberFieldClass()}
                  min={0}
                  onChange={(event) => {
                    setBoxShadowValues((currentValues) => ({
                      ...currentValues,
                      blur: event.target.value,
                    }));
                    setError(null);
                    setResult(null);
                  }}
                  step="1"
                  type="number"
                  value={boxShadowValues.blur}
                />
              </label>
              <label className="space-y-2">
                <span className="mono-kicker">spread</span>
                <input
                  className={numberFieldClass()}
                  onChange={(event) => {
                    setBoxShadowValues((currentValues) => ({
                      ...currentValues,
                      spread: event.target.value,
                    }));
                    setError(null);
                    setResult(null);
                  }}
                  step="1"
                  type="number"
                  value={boxShadowValues.spread}
                />
              </label>
              <ColorInput
                label="shadow color"
                onChange={(nextValue) => {
                  setBoxShadowValues((currentValues) => ({
                    ...currentValues,
                    color: nextValue,
                  }));
                  setError(null);
                  setResult(null);
                }}
                value={boxShadowValues.color}
              />
              <label className="space-y-2">
                <span className="mono-kicker">opacity</span>
                <input
                  className={numberFieldClass()}
                  max={1}
                  min={0}
                  onChange={(event) => {
                    setBoxShadowValues((currentValues) => ({
                      ...currentValues,
                      opacity: event.target.value,
                    }));
                    setError(null);
                    setResult(null);
                  }}
                  step="0.01"
                  type="number"
                  value={boxShadowValues.opacity}
                />
              </label>
              <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 sm:col-span-2">
                <input
                  checked={boxShadowValues.inset}
                  className="mt-1"
                  onChange={(event) => {
                    setBoxShadowValues((currentValues) => ({
                      ...currentValues,
                      inset: event.target.checked,
                    }));
                    setError(null);
                    setResult(null);
                  }}
                  type="checkbox"
                />
                <span className="space-y-1">
                  <span className="block font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--text)]">
                    inset shadow
                  </span>
                  <span className="block text-xs leading-6 text-[color:var(--muted)]">
                    Turn the shadow inward for pressed or recessed UI styles.
                  </span>
                </span>
              </label>
            </div>
          ) : null}

          {tool.mode === "borderRadius" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  { key: "topLeft", label: "top left" },
                  { key: "topRight", label: "top right" },
                  { key: "bottomRight", label: "bottom right" },
                  { key: "bottomLeft", label: "bottom left" },
                ] as const
              ).map((field) => (
                <label className="space-y-2" key={field.key}>
                  <span className="mono-kicker">{field.label}</span>
                  <input
                    className={numberFieldClass()}
                    min={0}
                    onChange={(event) => {
                      setBorderRadiusValues((currentValues) => ({
                        ...currentValues,
                        [field.key]: event.target.value,
                      }));
                      setError(null);
                      setResult(null);
                    }}
                    step="1"
                    type="number"
                    value={borderRadiusValues[field.key]}
                  />
                </label>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded-full px-4 py-2 text-xs font-medium ${buttonToneClass()}`}
              onClick={handleRun}
              type="button"
            >
              generate output
            </button>
            <PillButton aria-label={`Reset ${tool.title}`} onClick={handleReset}>
              reset
            </PillButton>
          </div>
        </div>

        <UtilityResultPanel
          error={error}
          hint={tool.hint}
          preview={preview}
          result={
            result
              ? {
                  metrics: result.metrics,
                  outputs: [result.output],
                  notes: result.notes,
                  status: result.status,
                  summary: result.summary,
                }
              : null
          }
        />
      </div>
    </section>
  );
}

export function UtilityToolWidget({ toolId }: UtilityToolWidgetProps) {
  const tool = getUtilityToolDefinition(toolId);

  if (!tool) {
    throw new Error(`Unknown utility tool: ${toolId}`);
  }

  return tool.kind === "form" ? <UtilityFormWidget tool={tool} /> : <UtilityStyleWidget tool={tool} />;
}
