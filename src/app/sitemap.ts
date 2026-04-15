import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getAllArticles, getPrimaryArticlePath } from "@/lib/content";

const SITE_URL = "https://discurso360.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${SITE_URL}${getPrimaryArticlePath(article)}`,
    lastModified: article.frontmatter.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...categoryEntries,
    ...articleEntries,
  ];
}
