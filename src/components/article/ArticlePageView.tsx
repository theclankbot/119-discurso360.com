import { Clock, Calendar, Mic } from "lucide-react";
import type { Article } from "@/lib/content";
import { getPrimaryArticlePath } from "@/lib/content";
import type { Category } from "@/lib/categories";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleContent } from "@/components/article/ArticleContent";
import { ArticleSidebar } from "@/components/article/ArticleSidebar";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import {
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";

export function ArticlePageView({
  article,
  category,
  relatedArticles,
}: {
  article: Article;
  category: Category;
  relatedArticles: Article[];
}) {
  const articleJsonLd = generateArticleJsonLd(article);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Inicio", url: "/" },
    { name: category.name, url: `/${category.slug}` },
    { name: article.frontmatter.title, url: getPrimaryArticlePath(article) },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { label: category.name, href: `/${category.slug}` },
            { label: article.frontmatter.title },
          ]}
        />

        <header className="max-w-3xl mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${category.color}10`,
                color: category.color,
              }}
            >
              {category.name}
            </span>
            {article.frontmatter.tonos?.map((tono) => (
              <span
                key={tono}
                className="px-2.5 py-1 bg-cream-dark rounded-full text-xs font-medium text-ink-muted"
              >
                {tono}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-ink leading-tight mb-6">
            {article.frontmatter.title}
          </h1>

          <p className="text-lg text-ink-muted leading-relaxed mb-6">
            {article.frontmatter.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-ink-muted pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readingTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Mic className="w-4 h-4" />~{article.speechTime} en voz alta
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.frontmatter.updatedAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 max-w-3xl">
            <ArticleContent content={article.content} />
          </div>

          <aside className="hidden lg:block w-72 flex-shrink-0">
            <ArticleSidebar article={article} />
          </aside>
        </div>

        {relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} category={category} />
        )}
      </article>
    </>
  );
}
