"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

const STORAGE_KEY = "discurso360-favoritos";

interface FavoritoItem {
  slug: string;
  category: string;
  title: string;
  addedAt: string;
}

function readFavorites(): FavoritoItem[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as FavoritoItem[]) : [];
}

export function FavoritosButton({
  slug,
  category,
  title,
}: {
  slug: string;
  category: string;
  title: string;
}) {
  const [isFavorite, setIsFavorite] = useState(() =>
    readFavorites().some((f) => f.slug === slug && f.category === category)
  );

  const toggleFavorite = () => {
    let favorites = readFavorites();

    if (isFavorite) {
      favorites = favorites.filter(
        (f) => !(f.slug === slug && f.category === category)
      );
    } else {
      favorites.push({
        slug,
        category,
        title,
        addedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
        isFavorite
          ? "border-red-200 bg-red-50 text-accent-rose"
          : "border-border bg-white text-ink-muted hover:border-accent-rose/30 hover:text-accent-rose"
      }`}
      title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
    >
      <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Guardado" : "Guardar"}
    </button>
  );
}
