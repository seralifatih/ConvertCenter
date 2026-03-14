"use client";

import { useRef, useState } from "react";
import { PillButton } from "@/components/pill";

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
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimeoutRef = useRef<number | null>(null);

  function resetStatusLater() {
    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setStatus("idle");
      resetTimeoutRef.current = null;
    }, 1200);
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
    let didCopy = false;

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        didCopy = true;
      } catch {
        didCopy = false;
      }
    }

    if (!didCopy && typeof document !== "undefined") {
      didCopy = fallbackCopy(text);
    }

    setStatus(didCopy ? "copied" : "failed");
    resetStatusLater();
  }

  return (
    <PillButton aria-label={`Copy ${text}`} onClick={handleCopy}>
      {status === "copied"
        ? copiedLabel
        : status === "failed"
          ? failedLabel
          : idleLabel}
    </PillButton>
  );
}
