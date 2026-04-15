"use client";

import type { Article } from "@/lib/content";
import { SpeechTimer } from "./SpeechTimer";
import { FavoritosButton } from "./FavoritosButton";
import { RatingEstrellas } from "./RatingEstrellas";
import { CopyButton } from "./CopyButton";

export function ArticleSidebar({ article }: { article: Article }) {
  const wordCount = article.content.split(/\s+/).length;

  return (
    <div className="sticky top-24 space-y-6">
      {/* Actions */}
      <div className="bg-white rounded-2xl border border-border p-5 space-y-4">
        <h3 className="font-serif text-sm font-semibold text-ink">Acciones</h3>
        <div className="flex flex-col gap-2">
          <CopyButton text={article.content} />
          <FavoritosButton
            slug={article.slug}
            category={article.category}
            title={article.frontmatter.title}
          />
        </div>
      </div>

      {/* Speech timer */}
      <SpeechTimer wordCount={wordCount} />

      {/* Info card */}
      {(article.frontmatter.ocasion || article.frontmatter.relacion) && (
        <div className="bg-white rounded-2xl border border-border p-5 space-y-3">
          <h3 className="font-serif text-sm font-semibold text-ink">Detalles</h3>
          {article.frontmatter.ocasion && (
            <div>
              <p className="text-xs text-ink-muted">Ocasion</p>
              <p className="text-sm font-medium text-ink">
                {article.frontmatter.ocasion}
              </p>
            </div>
          )}
          {article.frontmatter.relacion && (
            <div>
              <p className="text-xs text-ink-muted">Relacion</p>
              <p className="text-sm font-medium text-ink">
                {article.frontmatter.relacion}
              </p>
            </div>
          )}
          {article.frontmatter.duracion && (
            <div>
              <p className="text-xs text-ink-muted">Duracion recomendada</p>
              <p className="text-sm font-medium text-ink">
                {article.frontmatter.duracion}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Rating */}
      <RatingEstrellas articleId={`${article.category}/${article.slug}`} />

      {/* Tags */}
      {article.frontmatter.tags?.length > 0 && (
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-serif text-sm font-semibold text-ink mb-3">
            Etiquetas
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {article.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-cream-dark rounded-full text-xs text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
