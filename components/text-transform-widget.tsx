"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import {
  getTextModeOption,
  textModeGroups,
  textModeOptions,
  textSampleHelpers,
  transformText,
  type TextMode,
} from "@/lib/conversion/text";

type TextTransformWidgetProps = {
  actionLabel?: string;
  allowedModes?: readonly TextMode[];
  defaultMode: TextMode;
  defaultValue: string;
  showCharacterCount?: boolean;
};

export function TextTransformWidget({
  actionLabel,
  allowedModes,
  defaultMode,
  defaultValue,
  showCharacterCount = false,
}: TextTransformWidgetProps) {
  const [mode, setMode] = useState<TextMode>(defaultMode);
  const [input, setInput] = useState(defaultValue);
  const [output, setOutput] = useState(() => transformText(defaultMode, defaultValue));
  const activeMode = getTextModeOption(mode);
  const availableModes =
    allowedModes?.length
      ? textModeOptions.filter((option) => allowedModes.includes(option.mode))
      : textModeOptions;

  useEffect(() => {
    setOutput(transformText(mode, input));
  }, [input, mode]);

  function applyTransform(nextMode = mode, nextInput = input) {
    setOutput(transformText(nextMode, nextInput));
  }

  function renderModeGroup(
    label: string,
    modes: ReadonlyArray<(typeof availableModes)[number]>,
  ) {
    return (
      <div>
        <span className="mono-kicker mb-2 block">{label}</span>
        <div className="flex flex-wrap gap-2">
          {modes.map((entry) => (
            <PillButton
              aria-label={`Switch text transform to ${entry.label}`}
              active={mode === entry.mode}
              className="font-mono"
              key={entry.mode}
              onClick={() => {
                setMode(entry.mode);
                applyTransform(entry.mode, input);
              }}
            >
              {entry.label}
            </PillButton>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="mono-kicker block" htmlFor="text-transform-input">
          input
        </label>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
          paste or type text
        </span>
      </div>
      <textarea
        id="text-transform-input"
        className="input-surface min-h-28 w-full resize-y px-3 py-3 font-mono text-sm"
        onChange={(event) => {
          const nextValue = event.target.value;
          setInput(nextValue);
          applyTransform(mode, nextValue);
        }}
        placeholder="Paste text here..."
        value={input}
      />
      {showCharacterCount ? (
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
          {input.length} characters
        </div>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted-strong)]">
          sample:
        </span>
        {textSampleHelpers.map((item) => (
          <PillButton
            aria-label={`Use sample text ${item.label}`}
            className="font-mono"
            key={item.label}
            onClick={() => {
              setInput(item.value);
              applyTransform(mode, item.value);
            }}
          >
            {item.label}
          </PillButton>
        ))}
        {activeMode ? (
          <PillButton
            aria-label={`Use ${activeMode.helperLabel} sample text`}
            className="font-mono"
            onClick={() => {
              setInput(activeMode.sampleValue);
              applyTransform(mode, activeMode.sampleValue);
            }}
          >
            use {activeMode.helperLabel}
          </PillButton>
        ) : null}
      </div>
      {availableModes.length > 1 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {textModeGroups.map((group) =>
            renderModeGroup(
              group.label,
              availableModes.filter((option) => option.group === group.key),
            ),
          )}
        </div>
      ) : null}
      <div className="mb-2 mt-4 flex items-center justify-between gap-3">
        <label className="mono-kicker block" htmlFor="text-transform-output">
          output
        </label>
        {activeMode ? (
          <span className="section-badge">{activeMode.helperLabel}</span>
        ) : null}
      </div>
      <textarea
        id="text-transform-output"
        className="min-h-28 w-full resize-y rounded-2xl border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] px-3 py-3 font-mono text-base font-medium text-[color:var(--accent)] focus:outline-none"
        readOnly
        value={output}
      />
      {activeMode ? (
        <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{activeMode.description}</p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <CopyButton text={output} />
        {actionLabel ? (
          <PillButton aria-label={actionLabel} onClick={() => applyTransform()}>
            {actionLabel}
          </PillButton>
        ) : null}
        <PillButton
          aria-label="Clear text input"
          onClick={() => {
            setInput("");
            applyTransform(mode, "");
          }}
        >
          clear
        </PillButton>
      </div>
    </section>
  );
}
