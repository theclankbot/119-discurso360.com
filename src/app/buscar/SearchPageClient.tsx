"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { SearchArticle } from "@/lib/content";
import { getCategoryBySlug } from "@/lib/categories";

export function SearchPageClient({
  articles,
}: {
  articles: SearchArticle[];
}) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredArticles = useMemo(() => {
    if (!normalizedQuery) return [];

    return articles
      .map((article) => {
        const haystack = [
          article.title,
          article.description,
          article.subcategory ?? "",
          article.category,
          ...article.tags,
          ...article.tonos,
        ]
          .join(" ")
          .toLowerCase();

        const exactTitleMatch = article.title.toLowerCase().includes(normalizedQuery);
        const exactTagMatch = article.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedQuery)
        );
        const score =
          (exactTitleMatch ? 4 : 0) +
          (exactTagMatch ? 2 : 0) +
          (haystack.includes(normalizedQuery) ? 1 : 0);

        return { article, score };
      })
      .filter(({ score }) => score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          a.article.title.localeCompare(b.article.title, "es")
      )
      .slice(0, 48);
  }, [articles, normalizedQuery]);

  return (
    <>
      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escribe lo que buscas..."
          className="w-full rounded-2xl border border-border bg-white py-4 pl-12 pr-12 text-lg text-ink placeholder:text-ink-muted/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-ink-muted transition-colors hover:text-ink"
            aria-label="Limpiar busqueda"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div id="pagefind-results">
        {normalizedQuery ? (
          filteredArticles.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-ink-muted">
                {filteredArticles.length} resultados para{" "}
                <span className="font-medium text-ink">&quot;{query}&quot;</span>
              </p>
              <div className="grid gap-4">
                {filteredArticles.map(({ article }) => {
                  const category = getCategoryBySlug(article.category);
                  return (
                    <Link
                      key={`${article.category}/${article.slug}`}
                      href={article.primaryPath}
                      className="rounded-2xl border border-border bg-white p-5 transition-all hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5"
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        {category && (
                          <span
                            className="rounded-full px-2.5 py-1 text-xs font-medium"
                            style={{
                              backgroundColor: `${category.color}10`,
                              color: category.color,
                            }}
                          >
                            {category.name}
                          </span>
                        )}
                        {article.subcategory && (
                          <span className="rounded-full bg-cream-dark px-2.5 py-1 text-xs font-medium text-ink-muted">
                            {article.subcategory}
                          </span>
                        )}
                        <span className="text-xs text-ink-muted">
                          {article.readingTime}
                        </span>
                      </div>
                      <h2 className="font-serif text-xl font-semibold text-ink">
                        {article.title}
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-ink-muted">
                        {article.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {article.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-white px-2.5 py-1 text-xs text-ink-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-14 text-center">
              <p className="font-serif text-2xl text-ink">
                No hay resultados para &quot;{query}&quot;
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                Prueba con otra ocasión, una relación o una palabra clave más
                corta.
              </p>
            </div>
          )
        ) : (
          <div className="py-16 text-center">
            <p className="mb-4 font-serif text-xl text-ink-muted">
              Busca entre todos nuestros discursos
            </p>
            <p className="text-sm text-ink-muted">
              Prueba buscando por ocasión, relación o tipo de discurso
            </p>
          </div>
        )}
      </div>
    </>
  );
}
