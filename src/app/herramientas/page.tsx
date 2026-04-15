"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Clock, Mic, Calculator } from "lucide-react";

export default function HerramientasPage() {
  const [texto, setTexto] = useState("");

  const wordCount = texto.trim() ? texto.trim().split(/\s+/).length : 0;
  const speechMinutes = wordCount / 130;
  const displayMinutes = Math.floor(speechMinutes);
  const displaySeconds = Math.round((speechMinutes - displayMinutes) * 60);
  const charCount = texto.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Herramientas" }]} />

      <h1 className="font-serif text-3xl lg:text-4xl font-bold text-ink mb-4">
        Herramientas
      </h1>
      <p className="text-lg text-ink-muted mb-12">
        Utilidades para preparar y perfeccionar tu discurso
      </p>

      {/* Speech time calculator */}
      <section className="bg-white rounded-2xl border border-border p-6 lg:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gold-pale rounded-xl flex items-center justify-center">
            <Calculator className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-ink">
              Calculadora de tiempo de discurso
            </h2>
            <p className="text-sm text-ink-muted">
              Pega tu discurso para saber cuanto durara en voz alta
            </p>
          </div>
        </div>

        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Pega aqui tu discurso..."
          className="w-full h-48 p-4 bg-cream rounded-xl border border-border text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none transition-all"
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-cream-dark rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Mic className="w-4 h-4 text-gold" />
              <p className="text-xs text-ink-muted">Tiempo en voz alta</p>
            </div>
            <p className="text-lg font-bold text-ink">
              {wordCount === 0
                ? "—"
                : displayMinutes > 0
                ? `${displayMinutes}m ${displaySeconds}s`
                : `${displaySeconds}s`}
            </p>
          </div>
          <div className="bg-cream-dark rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Clock className="w-4 h-4 text-navy" />
              <p className="text-xs text-ink-muted">Palabras</p>
            </div>
            <p className="text-lg font-bold text-ink">{wordCount}</p>
          </div>
          <div className="bg-cream-dark rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <p className="text-xs text-ink-muted">Caracteres</p>
            </div>
            <p className="text-lg font-bold text-ink">{charCount}</p>
          </div>
        </div>

        <p className="text-xs text-ink-muted mt-4">
          * Basado en una velocidad media de 130 palabras por minuto en español
        </p>
      </section>

      {/* Tips section */}
      <section className="bg-white rounded-2xl border border-border p-6 lg:p-8">
        <h2 className="font-serif text-xl font-bold text-ink mb-6">
          Consejos para un gran discurso
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "Empieza fuerte",
              desc: "Las primeras 30 segundos definen si tu audiencia prestara atencion. Abre con una anecdota, pregunta o dato impactante.",
            },
            {
              title: "Conoce a tu audiencia",
              desc: "Adapta el tono y el lenguaje al publico. Un discurso de boda no es igual que uno de graduacion.",
            },
            {
              title: "Estructura clara",
              desc: "Introduccion breve, desarrollo con 2-3 ideas principales, y cierre memorable. No mas de 5 minutos salvo que sea necesario.",
            },
            {
              title: "Practica en voz alta",
              desc: "Lee tu discurso varias veces. Cronometralo. Marca las pausas. La practica elimina los nervios.",
            },
            {
              title: "Cierra con impacto",
              desc: "El final es lo que mas se recuerda. Termina con una frase potente, un deseo sincero o una llamada a la accion.",
            },
          ].map((tip) => (
            <div
              key={tip.title}
              className="flex gap-4 p-4 bg-cream rounded-xl"
            >
              <div className="w-1 bg-gold rounded-full flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-ink text-sm mb-1">
                  {tip.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
