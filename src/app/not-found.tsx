import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-serif text-6xl font-bold text-ink mb-4">404</h1>
      <p className="text-xl text-ink-muted mb-8">
        No encontramos las palabras que buscas... pero podemos ayudarte.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors"
        >
          Ir al inicio
        </Link>
        <Link
          href="/buscar"
          className="px-6 py-3 bg-white text-ink border border-border rounded-xl font-medium hover:border-gold/40 transition-colors"
        >
          Buscar discursos
        </Link>
      </div>
    </div>
  );
}
