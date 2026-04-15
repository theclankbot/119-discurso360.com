import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PopularSection } from "@/components/home/PopularSection";
import { getPopularArticles } from "@/lib/content";

export default function Home() {
  const popularArticles = getPopularArticles(9);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <PopularSection articles={popularArticles} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-border bg-white px-6 py-8 shadow-sm sm:px-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Biblioteca práctica
            </p>
            <h2 className="font-serif text-3xl font-bold text-ink">
              Discursos listos para personalizar y usar
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-ink-muted">
              Encontrarás ejemplos para bodas, graduaciones, cumpleaños,
              homenajes, discursos escolares y actos profesionales. Todo está
              ordenado por ocasión para que encuentres una base útil en pocos
              minutos.
            </p>
          </div>

          <div className="rounded-[2rem] border border-border bg-gradient-to-br from-navy to-navy-light px-6 py-8 text-white sm:px-8">
            <h2 className="font-serif text-2xl font-bold">
              Herramientas útiles
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Usa la calculadora de tiempo de discurso y el buscador para pulir
              tu texto, ajustar la duración y localizar ejemplos cercanos a tu
              situación.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/herramientas"
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-gold-pale"
              >
                Abrir herramientas
              </Link>
              <Link
                href="/buscar"
                className="rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Buscar contenido
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
