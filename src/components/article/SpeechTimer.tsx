"use client";

import { Mic } from "lucide-react";

interface SpeechTimerProps {
  wordCount: number;
}

export function SpeechTimer({ wordCount }: SpeechTimerProps) {
  // Spanish speech rate: ~130 words per minute
  const minutes = wordCount / 130;
  const displayMinutes = Math.floor(minutes);
  const displaySeconds = Math.round((minutes - displayMinutes) * 60);

  let timeDisplay: string;
  if (displayMinutes === 0) {
    timeDisplay = `${displaySeconds} segundos`;
  } else if (displaySeconds === 0) {
    timeDisplay = `${displayMinutes} min`;
  } else {
    timeDisplay = `${displayMinutes} min ${displaySeconds} seg`;
  }

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-cream-dark rounded-xl">
      <Mic className="w-4 h-4 text-gold" />
      <div>
        <p className="text-xs text-ink-muted">Tiempo de lectura en voz alta</p>
        <p className="text-sm font-semibold text-ink">{timeDisplay}</p>
      </div>
    </div>
  );
}
