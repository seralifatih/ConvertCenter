"use client";

import { useId, useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import { decodeJwt } from "@/lib/conversion/developer-helpers";

type JwtDecoderWidgetProps = {
  defaultToken: string;
};

export function JwtDecoderWidget({ defaultToken }: JwtDecoderWidgetProps) {
  const tokenId = useId();
  const [token, setToken] = useState(defaultToken);
  const result = useMemo(() => decodeJwt(token), [token]);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <label className="mono-kicker" htmlFor={tokenId}>
              jwt token
            </label>
            <span className="section-badge">header.payload.signature</span>
          </div>
          <textarea
            className="input-surface min-h-56 w-full resize-y px-3 py-3 font-mono text-sm"
            id={tokenId}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Paste a JWT here..."
            value={token}
          />
          <div className="flex flex-wrap gap-2">
            <PillButton aria-label="Reset JWT sample" onClick={() => setToken(defaultToken)}>
              reset sample
            </PillButton>
            <PillButton aria-label="Clear JWT input" onClick={() => setToken("")}>
              clear
            </PillButton>
          </div>
          <p className="text-sm leading-7 text-[color:var(--muted)]">
            This tool decodes the header and payload locally in your browser. It does not verify the
            signature or confirm that the token is trustworthy.
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">decoded output</span>
            <span className="section-badge">live</span>
          </div>

          {"error" in result ? (
            <p className="text-sm leading-7 text-[color:#f6b3a8]">{result.error}</p>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {result.header.alg ? (
                  <span className="utility-chip font-mono">alg {String(result.header.alg)}</span>
                ) : null}
                {result.header.typ ? (
                  <span className="utility-chip font-mono">typ {String(result.header.typ)}</span>
                ) : null}
                {result.expiresAt ? (
                  <span className="utility-chip font-mono">
                    {result.isExpired ? "expired" : "exp"} {result.expiresAt}
                  </span>
                ) : null}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="mono-kicker text-[color:var(--accent-text)]">header</span>
                  <CopyButton text={JSON.stringify(result.header, null, 2)} />
                </div>
                <textarea
                  className="min-h-28 w-full resize-y rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3 font-mono text-sm text-[color:var(--accent)] focus:outline-none"
                  readOnly
                  value={JSON.stringify(result.header, null, 2)}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="mono-kicker text-[color:var(--accent-text)]">payload</span>
                  <CopyButton text={JSON.stringify(result.payload, null, 2)} />
                </div>
                <textarea
                  className="min-h-36 w-full resize-y rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3 font-mono text-sm text-[color:var(--accent)] focus:outline-none"
                  readOnly
                  value={JSON.stringify(result.payload, null, 2)}
                />
              </div>

              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">signature</div>
                <p className="break-all font-mono text-xs text-[color:var(--accent)]">
                  {result.signature || "(empty signature segment)"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
