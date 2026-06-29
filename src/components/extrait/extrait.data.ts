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
  return (await getSortedArticles()).length;
}

/**
 * Articles vedettes de la home, pilotés par le champ `home` du frontmatter
 * (position 1, 2, 3). Ignore les drafts, trie par `home` croissant, et lève
 * une erreur de build explicite si le compte attendu n'est pas respecté.
 */
export async function getHomeFeaturedArticles(): Promise<
  CollectionEntry<"articles">[]
> {
  const articles = await getSortedArticles();
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
  const seen = new Set<string>();
  for (const article of articles) {
    seen.add(article.data.category);
  }
  return Array.from(seen);
}

/**
 * Articles similaires au `current`, limités à 3 cartes.
 * Similarité: catégorie partagée (+2) puis tags partagés (+1 chacun).
 * Si moins de 3 articles scorent > 0, la liste est complétée par ordre.
 */
export async function getSimilarArticles(
  current: CollectionEntry<"articles">,
  allArticles?: CollectionEntry<"articles">[],
): Promise<CollectionEntry<"articles">[]> {
  const all =
    allArticles ?? (await getCollection("articles", ({ data }) => !data.draft));

  const candidates = all.filter(
    (article) => article.id !== current.id && !article.data.draft,
  );

  const scoredCandidates = candidates
    .map((article) => {
      let score = 0;

      if (article.data.category === current.data.category) {
        score += 2;
      }

      for (const tag of current.data.tags ?? []) {
        if ((article.data.tags ?? []).includes(tag)) {
          score += 1;
        }
      }

      return { article, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }

      if (a.article.data.order !== b.article.data.order) {
        return a.article.data.order - b.article.data.order;
      }

      return a.article.data.title.localeCompare(b.article.data.title, "fr");
    });

  const orderedCandidates = candidates.slice().sort((a, b) => {
    if (a.data.order !== b.data.order) {
      return a.data.order - b.data.order;
    }

    return a.data.title.localeCompare(b.data.title, "fr");
  });

  const picked = new Set<string>();
  const similarArticles: CollectionEntry<"articles">[] = [];

  for (const { article } of scoredCandidates) {
    if (similarArticles.length >= 3) {
      break;
    }

    similarArticles.push(article);
    picked.add(article.id);
  }

  for (const article of orderedCandidates) {
    if (similarArticles.length >= 3) {
      break;
    }

    if (picked.has(article.id)) {
      continue;
    }

    similarArticles.push(article);
    picked.add(article.id);
  }

  return similarArticles;
}
