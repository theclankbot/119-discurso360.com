"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const STORAGE_KEY = "discurso360-ratings";

function readStoredRatings(): Record<string, number> {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as Record<string, number>) : {};
}

export function RatingEstrellas({
  articleId,
}: {
  articleId: string;
}) {
  const initialRating = readStoredRatings()[articleId] ?? 0;
  const [rating, setRating] = useState(initialRating);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [hasRated, setHasRated] = useState(initialRating > 0);

  const handleRate = (value: number) => {
    if (hasRated) return;

    setRating(value);
    setHasRated(true);

    const ratings = readStoredRatings();
    ratings[articleId] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-cream-dark p-4">
      <p className="text-xs text-ink-muted">
        {hasRated ? "Gracias por tu valoracion" : "Valora este discurso"}
      </p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => !hasRated && setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            disabled={hasRated}
            className={`p-0.5 transition-transform ${
              hasRated ? "cursor-default" : "cursor-pointer hover:scale-110"
            }`}
          >
            <Star
              className={`h-5 w-5 transition-colors ${
                star <= (hoveredStar || rating)
                  ? "fill-gold text-gold"
                  : "text-border"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
