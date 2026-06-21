import { getCollection, type CollectionEntry } from "astro:content";

/** Nombre d'articles vedettes attendus par la section home (3 cartes). */
const HOME_FEATURED_COUNT = 3;

/**
 * Articles publiés, sans les drafts, triés par `order` puis par titre FR.
 */
export async function getSortedArticles(): Promise<
  CollectionEntry<"articles">[]
> {
  const articles = await getCollection("articles", ({ data }) => !data.draft);
  return articles.sort((a, b) => {
    if (a.data.order !== b.data.order) {
      return a.data.order - b.data.order;
    }
    return a.data.title.localeCompare(b.data.title, "fr");
  });
}

/** Nombre d'articles publiés, utilisé pour le compteur home. */
export async function getPublishedArticleCount(): Promise<number> {
  const articles = await getSortedArticles();
  return articles.length;
}

/**
 * Articles vedettes de la home, pilotés par le champ `home` du frontmatter
 * (position 1, 2, 3). Ignore les drafts, trie par `home` croissant, et lève
 * une erreur de build explicite si le compte attendu n'est pas respecté.
 */
export async function getHomeFeaturedArticles(): Promise<
  CollectionEntry<"articles">[]
> {
  const articles = await getCollection("articles", ({ data }) => !data.draft);
  const featured = articles
    .filter((article) => article.data.home !== undefined)
    .sort((a, b) => a.data.home! - b.data.home!);

  if (featured.length !== HOME_FEATURED_COUNT) {
    throw new Error(
      `[extrait] La home attend ${HOME_FEATURED_COUNT} articles vedettes (champ "home: 1|2|3" dans le frontmatter), ${featured.length} trouvé(s). Vérifier src/content/articles/*/index.md (champ "home", articles en draft).`,
    );
  }

  return featured;
}

/**
 * Rubriques uniques dérivées des articles fournis, dans l'ordre de première
 * apparition.
 */
export function getArticleCategories(
  articles: CollectionEntry<"articles">[],
): string[] {
  const categories = new Set<string>();

  for (const article of articles) {
    categories.add(article.data.category);
  }

  return [...categories];
}
