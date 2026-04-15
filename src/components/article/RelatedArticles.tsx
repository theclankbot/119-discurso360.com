import Link from "next/link";
import { Clock } from "lucide-react";
import { getPrimaryArticlePath, type Article } from "@/lib/content";
import type { Category } from "@/lib/categories";

export function RelatedArticles({
  articles,
  category,
}: {
  articles: Article[];
  category: Category;
}) {
  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="font-serif text-2xl font-bold text-ink mb-8">
        Discursos relacionados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={getPrimaryArticlePath(article)}
            className="group bg-white rounded-2xl border border-border p-6 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
          >
            <span
              className="inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3"
              style={{
                backgroundColor: `${category.color}10`,
                color: category.color,
              }}
            >
              {article.frontmatter.subcategory || category.name}
            </span>
            <h3 className="font-serif text-lg font-semibold text-ink mb-2 group-hover:text-navy transition-colors line-clamp-2">
              {article.frontmatter.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
