"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";

export function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cream pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-navy/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-pale rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium text-ink-light">
            Más de 400 discursos para cada ocasión
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-tight mb-6">
          Encuentra las palabras{" "}
          <span className="text-gold italic">perfectas</span>
          <br />
          para cada momento
        </h1>

        <p className="text-lg sm:text-xl text-ink-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Discursos, frases y textos para bodas, graduaciones, cumpleaños y toda
          ocasión especial. Listos para personalizar y usar.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted group-focus-within:text-gold transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca por ocasión: boda, graduación, cumpleaños..."
              className="w-full pl-12 pr-32 py-4 bg-white rounded-2xl border border-border shadow-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all text-base"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-navy text-white rounded-xl text-sm font-medium hover:bg-navy-light transition-colors"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Popular searches */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-ink-muted">Populares:</span>
          {[
            "Boda",
            "Quinceañera",
            "Graduacion",
            "Jubilacion",
            "Cumpleanos",
          ].map((term) => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                router.push(`/buscar?q=${encodeURIComponent(term)}`);
              }}
              className="text-sm text-navy hover:text-gold transition-colors underline underline-offset-2 decoration-border hover:decoration-gold"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
