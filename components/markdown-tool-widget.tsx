"use client";

import { useId, useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import { markdownToHtml } from "@/lib/conversion/text";

type MarkdownToolWidgetProps = {
  defaultValue: string;
};

function buildPreviewDocument(html: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root { color-scheme: dark; }
      body {
        margin: 0;
        padding: 20px;
        background: #101318;
        color: #eef2f7;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        line-height: 1.7;
      }
      h1, h2, h3, h4, h5, h6 { margin: 0 0 12px; line-height: 1.2; }
      p, ul, ol, pre, blockquote { margin: 0 0 14px; }
      code, pre {
        background: rgba(255,255,255,0.06);
        border-radius: 10px;
      }
      code { padding: 0.15em 0.4em; }
      pre { padding: 12px 14px; overflow: auto; }
      blockquote {
        padding-left: 14px;
        border-left: 2px solid rgba(132, 255, 205, 0.35);
        color: rgba(238,242,247,0.82);
      }
      a { color: #84ffcd; }
    </style>
  </head>
  <body>${html}</body>
</html>`;
}

export function MarkdownToolWidget({ defaultValue }: MarkdownToolWidgetProps) {
  const inputId = useId();
  const outputId = useId();
  const [input, setInput] = useState(defaultValue);
  const output = useMemo(() => markdownToHtml(input), [input]);
  const previewDocument = useMemo(() => buildPreviewDocument(output), [output]);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="mono-kicker block" htmlFor={inputId}>
              markdown input
            </label>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
              live conversion
            </span>
          </div>
          <textarea
            id={inputId}
            className="input-surface min-h-44 w-full resize-y px-3 py-3 font-mono text-sm"
            onChange={(event) => setInput(event.target.value)}
            placeholder="# Hello"
            value={input}
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="mono-kicker block">rendered preview</span>
              <span className="section-badge">html</span>
            </div>
            <div className="overflow-hidden rounded-2xl border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)]">
              <iframe
                aria-label="Rendered HTML preview"
                className="h-56 w-full bg-transparent"
                sandbox=""
                srcDoc={previewDocument}
                title="Markdown preview"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="mono-kicker block" htmlFor={outputId}>
                html output
              </label>
              <span className="section-badge">copy-ready</span>
            </div>
            <textarea
              id={outputId}
              className="min-h-36 w-full resize-y rounded-2xl border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] px-3 py-3 font-mono text-sm font-medium text-[color:var(--accent)] focus:outline-none"
              readOnly
              value={output}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <CopyButton text={output} />
        <PillButton
          aria-label="Clear markdown input"
          onClick={() => {
            setInput("");
          }}
        >
          clear
        </PillButton>
      </div>
    </section>
  );
}
