"use client";

import { useRef, useState } from "react";
import { PillButton } from "@/components/pill";
import { useCopy } from "@/hooks/use-copy";

type CopyButtonProps = {
  text: string;
  idleLabel?: string;
  copiedLabel?: string;
  failedLabel?: string;
};

export function CopyButton({
  text,
  idleLabel = "copy",
  copiedLabel = "copied",
  failedLabel = "failed",
}: CopyButtonProps) {
  const { copied, copy } = useCopy();
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimeoutRef = useRef<number | null>(null);

  function resetStatusLater() {
    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setStatus("idle");
      resetTimeoutRef.current = null;
    }, 1800);
  }

  function fallbackCopy(value: string) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);

    const selection = document.getSelection();
    const previousRange =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0).cloneRange() : null;

    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    let didCopy = false;

    try {
      didCopy = document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);

      if (selection) {
        selection.removeAllRanges();

        if (previousRange) {
          selection.addRange(previousRange);
        }
      }
    }

    return didCopy;
  }

  async function handleCopy() {
    setStatus("idle");

    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      try {
        await copy(text);
        return;
      } catch {
        // Fall through to the legacy DOM-based fallback when the Clipboard API fails.
      }
    }

    const didCopy = typeof document !== "undefined" ? fallbackCopy(text) : false;

    setStatus(didCopy ? "copied" : "failed");
    resetStatusLater();
  }

  return (
    <PillButton aria-label={`Copy ${text}`} onClick={handleCopy}>
      {(copied || status === "copied")
        ? copiedLabel
        : status === "failed"
          ? failedLabel
          : idleLabel}
    </PillButton>
  );
}
