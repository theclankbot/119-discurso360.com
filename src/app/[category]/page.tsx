import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock } from "lucide-react";
import { categories, getCategoryBySlug } from "@/lib/categories";
import {
  getArticleByLegacySlug,
  getArticlesByCategory,
  getLegacyArticleSlugs,
  getPrimaryArticlePath,
} from "@/lib/content";
import { generateArticleMetadata, generateCategoryMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticlePageView } from "@/components/article/ArticlePageView";

export function generateStaticParams() {
  const legacySlugs = getLegacyArticleSlugs().filter(
    (slug) => !categories.some((cat) => cat.slug === slug)
  );

  return [
    ...categories.map((cat) => ({ category: cat.slug })),
    ...legacySlugs.map((slug) => ({ category: slug })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (cat) {
    return generateCategoryMetadata(cat);
  }

  const article = getArticleByLegacySlug(category);
  if (!article) return {};

  return generateArticleMetadata(article, {
    canonicalPath: getPrimaryArticlePath(article),
  });
}

export default async function CategoryOrLegacyArticlePage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (cat) {
    const articles = getArticlesByCategory(category);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: cat.name }]} />

        <div className="mb-12">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{
              backgroundColor: `${cat.color}10`,
              color: cat.color,
            }}
          >
            {articles.length} discursos
          </div>
          <h1 className="font-serif text-3xl lg:text-5xl font-bold text-ink mb-4">
            {cat.name}
          </h1>
          <p className="text-lg text-ink-muted max-w-3xl">{cat.description}</p>
        </div>

        {cat.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button className="px-4 py-2 text-sm font-medium bg-navy text-white rounded-full">
              Todos
            </button>
            {cat.subcategories.map((sub) => (
              <button
                key={sub}
                className="px-4 py-2 text-sm font-medium text-ink-muted bg-white border border-border rounded-full hover:border-gold/40 hover:text-ink transition-colors"
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={getPrimaryArticlePath(article)}
                className="group bg-white rounded-2xl border border-border p-6 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
              >
                {article.frontmatter.subcategory && (
                  <span className="inline-block px-2.5 py-1 bg-cream-dark rounded-full text-xs font-medium text-ink-muted mb-3">
                    {article.frontmatter.subcategory}
                  </span>
                )}
                <h2 className="font-serif text-lg font-semibold text-ink mb-2 group-hover:text-navy transition-colors line-clamp-2">
                  {article.frontmatter.title}
                </h2>
                <p className="text-sm text-ink-muted mb-4 line-clamp-3">
                  {article.frontmatter.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-ink-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTime}
                  </span>
                  {article.frontmatter.tonos?.length > 0 && (
                    <span>{article.frontmatter.tonos.join(" · ")}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-border">
            <p className="text-xl font-serif text-ink-muted mb-2">
              Pronto habrá contenido aquí
            </p>
            <p className="text-sm text-ink-muted">
              Estamos preparando los mejores discursos para esta categoría
            </p>
          </div>
        )}
      </div>
    );
  }

  const article = getArticleByLegacySlug(category);
  if (!article) notFound();

  const articleCategory = getCategoryBySlug(article.category);
  if (!articleCategory) notFound();

  const relatedArticles = getArticlesByCategory(article.category)
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <ArticlePageView
      article={article}
      category={articleCategory}
      relatedArticles={relatedArticles}
    />
  );
}
