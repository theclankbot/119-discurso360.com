import { notFound, redirect } from "next/navigation";
import { getCategoryBySlug, categories } from "@/lib/categories";
import {
  getArticle,
  getArticlesByCategory,
  getPrimaryArticlePath,
} from "@/lib/content";
import { generateArticleMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  for (const cat of categories) {
    const articles = getArticlesByCategory(cat.slug);
    for (const article of articles) {
      params.push({ category: cat.slug, slug: article.slug });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};

  return generateArticleMetadata(article, {
    canonicalPath: getPrimaryArticlePath(article),
    noindex: true,
  });
}

export default async function SecondaryArticleRedirectPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const article = getArticle(category, slug);
  if (!article) notFound();

  redirect(getPrimaryArticlePath(article));
}
