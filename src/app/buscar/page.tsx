import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getSearchArticles } from "@/lib/content";
import { SearchPageClient } from "./SearchPageClient";

export default function BuscarPage() {
  const articles = getSearchArticles();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Buscar" }]} />

      <h1 className="mb-8 font-serif text-3xl font-bold text-ink lg:text-4xl">
        Buscar discursos
      </h1>

      <Suspense
        fallback={<div className="py-12 text-center text-ink-muted">Cargando...</div>}
      >
        <SearchPageClient articles={articles} />
      </Suspense>
    </div>
  );
}
