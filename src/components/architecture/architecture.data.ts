import { getCollection, type CollectionEntry } from "astro:content";

type ProjectData = CollectionEntry<"projects">["data"];
type Zone = ProjectData["zone"];
type ProjectType = NonNullable<ProjectData["types"]>[number];
type Material = NonNullable<ProjectData["materials"]>[number];
type Program = NonNullable<ProjectData["programs"]>[number];

export const ZONE_LABELS: Record<Zone, string> = {
  corse: "Corse",
  "cote-bleue": "Côte Bleue",
  provence: "Provence",
};

export const TYPE_LABELS: Record<ProjectType, string> = {
  neuf: "Neuf",
  renovation: "Rénovation",
  extension: "Extension",
  surelevation: "Surélévation",
};

export const MATERIAL_LABELS: Record<Material, string> = {
  pierre: "Pierre",
  bois: "Bois",
  biosource: "Biosourcé",
  reemploi: "Réemploi",
};

export const PROGRAM_LABELS: Record<Program, string> = {
  logement: "Logement",
  equipement: "Équipement",
  rural: "Rural",
};

export async function getSortedProjects(): Promise<
  CollectionEntry<"projects">[]
> {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  return projects.sort((a, b) => {
    if (a.data.order !== b.data.order) {
      return a.data.order - b.data.order;
    }
    return a.data.name.localeCompare(b.data.name, "fr");
  });
}

/** Nombre de projets vedettes attendus par la section home (3 cartes). */
const HOME_FEATURED_COUNT = 3;

/**
 * Projets vedettes de la home, pilotés par le champ `home` du frontmatter
 * (position 1, 2, 3). Ignore les draft, trie par `home` croissant, et lève
 * une erreur de build explicite si le compte attendu n'est pas respecté.
 */
export async function getHomeFeaturedProjects(): Promise<
  CollectionEntry<"projects">[]
> {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  const featured = projects
    .filter((p) => p.data.home !== undefined)
    .sort((a, b) => a.data.home! - b.data.home!);

  if (featured.length !== HOME_FEATURED_COUNT) {
    throw new Error(
      `[architecture] La home attend ${HOME_FEATURED_COUNT} projets vedettes (champ "home: 1|2|3" dans le frontmatter), ${featured.length} trouvé(s). Vérifier src/content/projects/*/index.md (champ "home", projets en draft).`,
    );
  }

  return featured;
}
