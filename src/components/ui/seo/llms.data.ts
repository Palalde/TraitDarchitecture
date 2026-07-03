import type { CollectionEntry } from "astro:content";
import {
  buildProjectLabelSummary,
  getSortedProjects,
} from "@/components/architecture/architecture.data";
import {
  getHomeFeaturedArticles,
  getSortedArticles,
} from "@/components/extrait/extrait.data";

function projectPath(project: CollectionEntry<"projects">): string {
  return `/architecture/${project.id.replace(/\/index$/, "")}/`;
}

function articlePath(article: CollectionEntry<"articles">): string {
  return `/extrait/${article.id.replace(/\/index$/, "")}/`;
}

function buildProjectLine(
  siteUrl: URL,
  project: CollectionEntry<"projects">,
): string {
  const { name, city, dept } = project.data;
  const url = new URL(projectPath(project), siteUrl).href;
  const labelParts = buildProjectLabelSummary(project);
  const description = [`${city} (${dept})`, labelParts]
    .filter(Boolean)
    .join(" — ");

  return `- [${name}](${url}) - ${description}.`;
}

function buildArticleLine(
  siteUrl: URL,
  article: CollectionEntry<"articles">,
): string {
  const { title, excerpt } = article.data;
  const url = new URL(articlePath(article), siteUrl).href;

  return `- [${title}](${url}) - ${excerpt}`;
}

/** Bullet list of every published project (name, location, type/program). */
export async function buildProjectListMarkdown(siteUrl: URL): Promise<string> {
  const projects = await getSortedProjects();
  return projects
    .map((project) => buildProjectLine(siteUrl, project))
    .join("\n");
}

/** Bullet list of every published article (title + excerpt). */
export async function buildArticleListMarkdown(siteUrl: URL): Promise<string> {
  const articles = await getSortedArticles();
  return articles
    .map((article) => buildArticleLine(siteUrl, article))
    .join("\n");
}

/** Bullet list of the 3 home-featured articles (used by the EXTraiT block). */
export async function buildFeaturedArticlesMarkdown(
  siteUrl: URL,
): Promise<string> {
  const articles = await getHomeFeaturedArticles();
  return articles
    .map((article) => buildArticleLine(siteUrl, article))
    .join("\n");
}

/** Full text (metadata + raw body) of every published article. */
export async function buildFullArticlesText(): Promise<string> {
  const articles = await getSortedArticles();

  return articles
    .map((article) => {
      const { title, category, tags, readingTime, excerpt } = article.data;
      const tagsLine = tags.length ? tags.join(", ") : "aucun";
      const readingTimeLine = readingTime
        ? `${readingTime} min`
        : "non précisé";

      return [
        `### ${title}`,
        "",
        `Catégorie : ${category}`,
        "",
        `Mots-clés : ${tagsLine}`,
        "",
        `Temps de lecture : ${readingTimeLine}`,
        "",
        `Excerpt : ${excerpt}`,
        "",
        article.body ?? "",
      ].join("\n");
    })
    .join("\n\n");
}
