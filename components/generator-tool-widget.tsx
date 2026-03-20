"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import { createSeededRandom } from "@/lib/conversion/random-source";
import {
  getDefaultGeneratorToolValues,
  getGeneratorToolDefinition,
} from "@/lib/generator-tools/registry";
import type {
  GeneratorOutput,
  GeneratorResult,
  GeneratorToolDefinition,
  GeneratorToolField,
  GeneratorToolId,
} from "@/lib/generator-tools/types";

type GeneratorToolWidgetProps = {
  toolId: GeneratorToolId;
};

function buttonToneClass(disabled = false) {
  return disabled
    ? "cursor-not-allowed border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--muted)]"
    : "border-transparent bg-[color:var(--accent)] text-[color:var(--page)] hover:opacity-90";
}

function fieldClass() {
  return "input-surface w-full px-3 py-3 font-mono text-sm text-[color:var(--text)]";
}

function GeneratorFieldInput({
  field,
  onChange,
  value,
}: {
  field: GeneratorToolField;
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
    <label className={field.type === "textarea" ? "space-y-2 sm:col-span-2" : "space-y-2"}>
      <span className="mono-kicker">{field.label}</span>
      {field.type === "select" ? (
        <select
          className={fieldClass()}
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
          className={`${fieldClass()} min-h-32 resize-y`}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          rows={field.rows ?? 6}
          value={typeof value === "string" ? value : ""}
        />
      ) : (
        <input
          className={fieldClass()}
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

function OutputBlock({ output }: { output: GeneratorOutput }) {
  return (
    <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="mono-kicker text-[color:var(--accent-text)]">{output.label}</span>
        <CopyButton idleLabel="copy" text={output.copyText ?? output.value} />
      </div>
      <textarea
        className="input-surface min-h-28 w-full resize-y px-3 py-3 font-mono text-sm text-[color:var(--text)]"
        readOnly
        value={output.value}
      />
    </div>
  );
}

function PreviewPanel({ result }: { result: GeneratorResult }) {
  if (result.preview?.kind !== "color-palette") {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
      <div className="mono-kicker mb-3 text-[color:var(--accent-text)]">palette preview</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {result.preview.colors.map((color) => (
          <div
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--page)] px-3 py-3"
            key={`${color.label}-${color.value}`}
          >
            <div
              className="mb-3 h-20 rounded-2xl border border-[color:var(--border)]"
              style={{ backgroundColor: color.swatch }}
            />
            <div className="mb-1 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--muted-strong)]">
              {color.label}
            </div>
            <div className="font-mono text-sm text-[color:var(--text)] break-all">{color.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeneratorResultPanel({
  error,
  result,
}: {
  error: string | null;
  result: GeneratorResult | null;
}) {
  return (
    <div className="rounded-[24px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="mono-kicker text-[color:var(--accent-text)]">generated output</span>
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

          <PreviewPanel result={result} />

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

          <div className="space-y-4">
            {result.outputs.map((output) => (
              <OutputBlock key={output.label} output={output} />
            ))}
          </div>

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
          <p className="text-sm leading-7 text-[color:var(--accent-text)]">
            Adjust the generator options, keep the seed if you want reproducible output, and use
            regenerate when you want a fresh result with the same setup.
          </p>
        </div>
      )}
    </div>
  );
}

function runGenerator(
  tool: GeneratorToolDefinition,
  values: Record<string, boolean | string>,
  seed: number,
) {
  return tool.run({
    random: createSeededRandom(seed),
    seed,
    values,
  });
}

export function GeneratorToolWidget({ toolId }: GeneratorToolWidgetProps) {
  const tool = getGeneratorToolDefinition(toolId);

  if (!tool) {
    throw new Error(`Unknown generator tool: ${toolId}`);
  }

  const resolvedTool: GeneratorToolDefinition = tool;

  const [values, setValues] = useState<Record<string, boolean | string>>(() =>
    getDefaultGeneratorToolValues(resolvedTool),
  );
  const [seed, setSeed] = useState(String(resolvedTool.defaultSeed));
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratorResult | null>(() =>
    runGenerator(
      resolvedTool,
      getDefaultGeneratorToolValues(resolvedTool),
      resolvedTool.defaultSeed,
    ),
  );

  function handleGenerate(nextSeed = seed) {
    const parsedSeed = Number(nextSeed);
    const safeSeed = Number.isFinite(parsedSeed)
      ? Math.floor(parsedSeed)
      : resolvedTool.defaultSeed;

    try {
      const nextResult = runGenerator(resolvedTool, values, safeSeed);
      setResult(nextResult);
      setError(null);
      setSeed(String(safeSeed));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The generator could not complete the request.",
      );
      setResult(null);
    }
  }

  function handleReset() {
    const defaultValues = getDefaultGeneratorToolValues(resolvedTool);
    setValues(defaultValues);
    setSeed(String(resolvedTool.defaultSeed));
    setError(null);
    setResult(runGenerator(resolvedTool, defaultValues, resolvedTool.defaultSeed));
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="space-y-4">
          <div className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4">
            <div className="mono-kicker mb-2">generator workflow</div>
            <p className="text-sm leading-7 text-[color:var(--muted)]">{resolvedTool.hint}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {resolvedTool.fields.map((field) => (
              <GeneratorFieldInput
                field={field}
                key={field.id}
                onChange={(nextValue) => {
                  setValues((currentValues) => ({
                    ...currentValues,
                    [field.id]: nextValue,
                  }));
                  setError(null);
                }}
                value={values[field.id] ?? field.defaultValue}
              />
            ))}
          </div>

          <label className="space-y-2">
            <span className="mono-kicker">seed</span>
            <input
              className={fieldClass()}
              onChange={(event) => {
                setSeed(event.target.value);
                setError(null);
              }}
              step="1"
              type="number"
              value={seed}
            />
            <p className="text-xs leading-6 text-[color:var(--muted)]">
              Keep the same seed to reproduce the same result later.
            </p>
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded-full px-4 py-2 text-xs font-medium ${buttonToneClass()}`}
              onClick={() => handleGenerate()}
              type="button"
            >
              {resolvedTool.actionLabel}
            </button>
            <PillButton
              aria-label={`Regenerate ${resolvedTool.title}`}
              onClick={() => {
                const nextSeed = String((Number(seed) || resolvedTool.defaultSeed) + 1);
                handleGenerate(nextSeed);
              }}
            >
              regenerate
            </PillButton>
            <PillButton aria-label={`Reset ${resolvedTool.title}`} onClick={handleReset}>
              reset
            </PillButton>
          </div>
        </div>

        <GeneratorResultPanel error={error} result={result} />
      </div>
    </section>
  );
}
