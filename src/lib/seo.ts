import type { Metadata } from "next";
import { getPrimaryArticlePath, type Article } from "./content";
import type { Category } from "./categories";

const SITE_URL = "https://discurso360.com";
const SITE_NAME = "Discurso360";
const SITE_DESCRIPTION =
  "Encuentra las palabras perfectas para cada momento. Discursos, frases y textos para bodas, graduaciones, cumpleaños y toda ocasión especial.";

export function generateSiteMetadata(): Metadata {
  return {
    title: {
      default: `${SITE_NAME} - Encuentra las palabras perfectas para cada momento`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: SITE_NAME,
      url: SITE_URL,
      title: `${SITE_NAME} - Encuentra las palabras perfectas para cada momento`,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} - Encuentra las palabras perfectas para cada momento`,
      description: SITE_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateArticleMetadata(
  article: Article,
  options?: {
    canonicalPath?: string;
    noindex?: boolean;
  }
): Metadata {
  const canonicalPath = options?.canonicalPath ?? getPrimaryArticlePath(article);

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      url: canonicalPath,
      publishedTime: article.frontmatter.publishedAt,
      modifiedTime: article.frontmatter.updatedAt,
      tags: article.frontmatter.tags,
    },
    robots: options?.noindex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

export function generateCategoryMetadata(category: Category): Metadata {
  const canonicalPath = `/${category.slug}`;

  return {
    title: category.name,
    description: category.description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${category.name} | ${SITE_NAME}`,
      description: category.description,
      url: canonicalPath,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | ${SITE_NAME}`,
      description: category.description,
    },
  };
}

export function generateArticleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    datePublished: article.frontmatter.publishedAt,
    dateModified: article.frontmatter.updatedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${article.category}/${article.slug}`,
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
