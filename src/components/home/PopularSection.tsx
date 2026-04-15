import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getPrimaryArticlePath, type Article } from "@/lib/content";
import { getCategoryBySlug } from "@/lib/categories";

export function PopularSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-serif text-3xl font-bold text-ink mb-2">
            Más populares
          </h2>
          <p className="text-ink-muted">
            Los discursos que más buscan nuestros lectores
          </p>
        </div>
        <Link
          href="/buscar"
          className="hidden sm:flex items-center gap-2 text-sm font-medium text-navy hover:text-gold transition-colors"
        >
          Ver todos
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const category = getCategoryBySlug(article.category);
          return (
            <Link
              key={`${article.category}/${article.slug}`}
              href={getPrimaryArticlePath(article)}
              className="group bg-white rounded-2xl border border-border p-6 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
            >
              {category && (
                <span
                  className="inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3"
                  style={{
                    backgroundColor: `${category.color}10`,
                    color: category.color,
                  }}
                >
                  {category.name}
                </span>
              )}
              <h3 className="font-serif text-lg font-semibold text-ink mb-2 group-hover:text-navy transition-colors line-clamp-2">
                {article.frontmatter.title}
              </h3>
              <p className="text-sm text-ink-muted mb-4 line-clamp-2">
                {article.frontmatter.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-ink-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime}
                </span>
                {article.frontmatter.duracion && (
                  <span>Oratoria: {article.frontmatter.duracion}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
