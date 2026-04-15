import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface ArticleFrontmatter {
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  tonos: string[];
  duracion?: string;
  ocasion?: string;
  relacion?: string;
  oldUrls?: string[];
  featured?: boolean;
  publishedAt: string;
  updatedAt: string;
}

export interface Article {
  slug: string;
  category: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: string;
  readingTimeMinutes: number;
  speechTime: string;
}

export interface SearchArticle {
  slug: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  tonos: string[];
  subcategory?: string;
  readingTime: string;
  primaryPath: string;
}

function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeadingSlash.replace(/\/+$/, "") || "/";
}

function normalizeLegacySlug(pathname: string): string {
  return normalizePath(pathname).replace(/^\//, "");
}

function estimateSpeechTime(text: string): string {
  // Average speaking rate: ~130 words per minute in Spanish
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 130);
  if (minutes <= 1) return "1 minuto";
  return `${minutes} minutos`;
}

function normalizeContent(content: string): string {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/\n[ \t]{2,}/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseArticleFile(filePath: string, category: string, slug: string): Article {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const normalizedContent = normalizeContent(content);
  const stats = readingTime(normalizedContent);

  return {
    slug,
    category,
    frontmatter: data as ArticleFrontmatter,
    content: normalizedContent,
    readingTime: stats.text.replace("min read", "min lectura"),
    readingTimeMinutes: Math.ceil(stats.minutes),
    speechTime: estimateSpeechTime(normalizedContent),
  };
}

export function getArticlesByCategory(category: string): Article[] {
  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) return [];

  const files = fs
    .readdirSync(categoryPath)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((file) =>
      parseArticleFile(
        path.join(categoryPath, file),
        category,
        file.replace(/\.mdx?$/, "")
      )
    )
    .sort(
      (a, b) =>
        new Date(b.frontmatter.updatedAt).getTime() -
        new Date(a.frontmatter.updatedAt).getTime()
    );
}

export function getArticle(
  category: string,
  slug: string
): Article | undefined {
  const extensions = [".mdx", ".md"];

  for (const ext of extensions) {
    const filePath = path.join(contentDirectory, category, slug + ext);
    if (fs.existsSync(filePath)) {
      return parseArticleFile(filePath, category, slug);
    }
  }

  return undefined;
}

export function getAllArticles(): Article[] {
  const categoryDirs = fs
    .readdirSync(contentDirectory)
    .filter((f) =>
      fs.statSync(path.join(contentDirectory, f)).isDirectory()
    );

  return categoryDirs
    .flatMap((cat) => getArticlesByCategory(cat))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.updatedAt).getTime() -
        new Date(a.frontmatter.updatedAt).getTime()
    );
}

export function getFeaturedArticles(limit = 6): Article[] {
  return getAllArticles()
    .filter((a) => a.frontmatter.featured)
    .slice(0, limit);
}

export function getPopularArticles(limit = 8): Article[] {
  // For now, return featured or most recent
  const all = getAllArticles();
  const featured = all.filter((a) => a.frontmatter.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return all.slice(0, limit);
}

export function getSearchArticles(): SearchArticle[] {
  return getAllArticles().map((article) => ({
    slug: article.slug,
    category: article.category,
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    tags: article.frontmatter.tags ?? [],
    tonos: article.frontmatter.tonos ?? [],
    subcategory: article.frontmatter.subcategory,
    readingTime: article.readingTime,
    primaryPath: getPrimaryArticlePath(article),
  }));
}

export function getPrimaryArticlePath(article: Article): string {
  const legacyPath = article.frontmatter.oldUrls?.[0];
  return legacyPath ? normalizePath(legacyPath) : `/${article.slug}`;
}

export function getPrimaryArticleSlug(article: Article): string {
  return normalizeLegacySlug(getPrimaryArticlePath(article));
}

export function getLegacyArticleSlugs(): string[] {
  return getAllArticles().map(getPrimaryArticleSlug);
}

export function getArticleByLegacySlug(slug: string): Article | undefined {
  const normalizedSlug = normalizeLegacySlug(slug);
  return getAllArticles().find(
    (article) => getPrimaryArticleSlug(article) === normalizedSlug
  );
}
