"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";

export type DevToolErrorState = {
  errorMessage?: string;
  output?: string;
  panelTone?: "default" | "error" | "success";
};

type DevToolWidgetProps = {
  actionLabel?: string;
  defaultValue: string;
  description?: string;
  errorHandling?: (output: string, input: string) => DevToolErrorState;
  inputLabel: string;
  outputLabel: string;
  outputStyle?: "panel" | "textarea";
  secondaryActionLabel?: string;
  secondaryTransformFunction?: (input: string) => string;
  showCharacterCount?: boolean;
  showClearButton?: boolean;
  showCopyButton?: boolean;
  title: string;
  transformFunction: (input: string) => string;
};

function getPanelClasses(tone: NonNullable<DevToolErrorState["panelTone"]>) {
  switch (tone) {
    case "success":
      return "border-[color:var(--accent)] bg-[color:var(--accent-surface)] text-[color:var(--accent)]";
    case "error":
      return "border-[color:#f6b3a8] bg-[color:rgba(246,179,168,0.08)] text-[color:#f6b3a8]";
    default:
      return "border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text)]";
  }
}

export function DevToolWidget({
  actionLabel,
  defaultValue,
  description,
  errorHandling,
  inputLabel,
  outputLabel,
  outputStyle = "textarea",
  secondaryActionLabel,
  secondaryTransformFunction,
  showCharacterCount = false,
  showClearButton = true,
  showCopyButton = true,
  title,
  transformFunction,
}: DevToolWidgetProps) {
  const inputId = useId();
  const outputId = useId();
  const [input, setInput] = useState(defaultValue);
  const [activeTransform, setActiveTransform] = useState<"primary" | "secondary">("primary");

  const usingSecondary = activeTransform === "secondary" && Boolean(secondaryTransformFunction);
  const selectedTransform =
    usingSecondary && secondaryTransformFunction ? secondaryTransformFunction : transformFunction;
  const rawOutput = selectedTransform(input);
  const handledState = errorHandling ? errorHandling(rawOutput, input) : undefined;
  const output = handledState?.output ?? rawOutput;
  const errorMessage = handledState?.errorMessage;
  const panelTone = handledState?.panelTone ?? "default";
  const outputPanelClasses = getPanelClasses(panelTone);

  return (
    <section aria-label={title} className="shell-card p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="mono-kicker">developer tool</span>
        <span className="section-badge">{title}</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="mono-kicker block" htmlFor={inputId}>
              {inputLabel}
            </label>
            {showCharacterCount ? (
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
                {input.length} characters
              </span>
            ) : null}
          </div>
          <textarea
            id={inputId}
            className="input-surface min-h-36 w-full resize-y px-3 py-3 font-mono text-sm"
            onChange={(event) => {
              setInput(event.target.value);
            }}
            placeholder="Paste text here..."
            value={input}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            {outputStyle === "textarea" ? (
              <label className="mono-kicker block" htmlFor={outputId}>
                {outputLabel}
              </label>
            ) : (
              <span className="mono-kicker block">{outputLabel}</span>
            )}
            <span className="section-badge">{usingSecondary ? secondaryActionLabel : actionLabel ?? "live"}</span>
          </div>
          {outputStyle === "panel" ? (
            <div
              className={`min-h-36 rounded-2xl border-2 px-4 py-4 font-mono text-sm ${outputPanelClasses}`}
              id={outputId}
              role="status"
            >
              {output}
            </div>
          ) : (
            <textarea
              id={outputId}
              className="min-h-36 w-full resize-y rounded-2xl border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] px-3 py-3 font-mono text-sm font-medium text-[color:var(--accent)] focus:outline-none"
              readOnly
              value={output}
            />
          )}
          {errorMessage ? (
            <p className="mt-3 text-sm leading-7 text-[color:#f6b3a8]">{errorMessage}</p>
          ) : null}
          {description ? (
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {showCopyButton ? <CopyButton text={output} /> : null}
        {actionLabel ? (
          <PillButton
            aria-label={actionLabel}
            active={!usingSecondary}
            onClick={() => {
              setActiveTransform("primary");
            }}
          >
            {actionLabel}
          </PillButton>
        ) : null}
        {secondaryActionLabel && secondaryTransformFunction ? (
          <PillButton
            aria-label={secondaryActionLabel}
            active={usingSecondary}
            onClick={() => {
              setActiveTransform("secondary");
            }}
          >
            {secondaryActionLabel}
          </PillButton>
        ) : null}
        {showClearButton ? (
          <PillButton
            aria-label="Clear developer tool input"
            onClick={() => {
              setInput("");
              setActiveTransform("primary");
            }}
          >
            clear
          </PillButton>
        ) : null}
      </div>
    </section>
  );
}
