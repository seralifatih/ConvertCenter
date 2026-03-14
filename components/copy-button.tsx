"use client";

import { useState } from "react";
import { PillButton } from "@/components/pill";

type CopyButtonProps = {
  text: string;
  idleLabel?: string;
  copiedLabel?: string;
};

export function CopyButton({
  text,
  idleLabel = "copy",
  copiedLabel = "copied",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 900);
  }

  return (
    <PillButton aria-label={`Copy ${text}`} onClick={handleCopy}>
      {copied ? copiedLabel : idleLabel}
    </PillButton>
  );
}
