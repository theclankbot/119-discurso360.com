"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Strip HTML tags for clean text
    const cleanText = text
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();

    try {
      await navigator.clipboard.writeText(cleanText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = cleanText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        copied
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-cream-dark text-ink-muted hover:bg-gold-pale hover:text-ink border border-border"
      }`}
      title="Copiar al portapapeles"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copiar
        </>
      )}
    </button>
  );
}
