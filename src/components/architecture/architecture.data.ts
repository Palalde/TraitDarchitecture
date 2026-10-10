import { getCollection, type CollectionEntry } from "astro:content";

type ProjectData = CollectionEntry<"projects">["data"];
type Zone = ProjectData["zone"];
type ProjectType = NonNullable<ProjectData["types"]>[number];
type Material = NonNullable<ProjectData["materials"]>[number];
type Program = NonNullable<ProjectData["programs"]>[number];
type Status = NonNullable<ProjectData["status"]>;

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
  brique: "Brique",
  metal: "Métal",
};

export const PROGRAM_LABELS: Record<Program, string> = {
  logement: "Logement",
  equipement: "Équipement",
  rural: "Rural",
  commerce: "Commerce",
};

export const STATUS_LABELS: Record<Status, string> = {
  etude: "Étude",
  chantier: "En chantier",
  realise: "Réalisé",
};

/**
 * Joined type + program labels for a project (e.g. "Rénovation · Logement").
 * Shared between the project page meta description and the LLM index.
 */
export function buildProjectLabelSummary(
  project: CollectionEntry<"projects">,
): string {
  const { types, programs } = project.data;
  const typeLabels = (types ?? []).map((type) => TYPE_LABELS[type]).join(", ");
  const programLabels = (programs ?? [])
    .map((program) => PROGRAM_LABELS[program])
    .join(", ");
  return [typeLabels, programLabels].filter(Boolean).join(" · ");
}

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

/** Returns the optional secondary content entry for a given project slug. */
export async function getProjectSecondary(
  slug: string,
): Promise<CollectionEntry<"projectSecondaries"> | undefined> {
  const secondaryEntries = await getCollection("projectSecondaries");
  return secondaryEntries.find((entry) => entry.id.split("/")[0] === slug);
}

/**
 * Returns up to 4 projects similar to `current`, excluding drafts and the
 * current project itself. Similarity is scored (+1 per shared value in
 * types / materials / programs, +1 for same zone). Ties broken by `order`.
 * If fewer than 4 projects score > 0, the list is padded with the next
 * projects by `order` so the section is never short or empty.
 */
export async function getSimilarProjects(
  current: CollectionEntry<"projects">,
  allProjects?: CollectionEntry<"projects">[],
): Promise<CollectionEntry<"projects">[]> {
  const all =
    allProjects ?? (await getCollection("projects", ({ data }) => !data.draft));

  const candidates = all.filter((p) => p.id !== current.id && !p.data.draft);

  const scored = candidates.map((p) => {
    let score = 0;
    if (p.data.zone === current.data.zone) score += 1;
    for (const t of current.data.types ?? []) {
      if ((p.data.types ?? []).includes(t)) score += 1;
    }
    for (const m of current.data.materials ?? []) {
      if ((p.data.materials ?? []).includes(m)) score += 1;
    }
    for (const g of current.data.programs ?? []) {
      if ((p.data.programs ?? []).includes(g)) score += 1;
    }
    return { project: p, score };
  });

  scored.sort((a, b) =>
    b.score !== a.score
      ? b.score - a.score
      : a.project.data.order - b.project.data.order,
  );

  return scored.slice(0, 4).map((s) => s.project);
}

export interface GalleryImage {
  src: CollectionEntry<"projects">["data"]["gallery"][number]["src"];
  /** Plate number label shown in FigCaption (02, 03, …). */
  plate: string;
  /** Optional caption declared in the project frontmatter. */
  caption: string;
  /** Alt text: caption if present, otherwise generated from project name + index. */
  alt: string;
}

/**
 * Returns the ordered gallery images declared in a project entry.
 */
export function getProjectGallery(
  entry: CollectionEntry<"projects">,
): GalleryImage[] {
  return entry.data.gallery.map((image, index) => {
    const caption = image.caption ?? "";
    const plateNum = index + 2;
    const plate = String(plateNum).padStart(2, "0");
    const alt = caption || `${entry.data.name} — vue ${plateNum}`;

    return { src: image.src, plate, caption, alt };
  });
}
