import { getCollection, type CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";

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
};

export const PROGRAM_LABELS: Record<Program, string> = {
  logement: "Logement",
  equipement: "Équipement",
  rural: "Rural",
};

export const STATUS_LABELS: Record<Status, string> = {
  etude: "En étude",
  chantier: "En chantier",
  livre: "Livré",
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

/** Returns the optional secondary content entry for a given project slug. */
export async function getProjectSecondary(
  slug: string,
): Promise<CollectionEntry<"projectSecondaries"> | undefined> {
  const secondaryEntries = await getCollection("projectSecondaries");
  return secondaryEntries.find((entry) => entry.id.split("/")[0] === slug);
}

/**
 * Returns up to 3 projects similar to `current`, excluding drafts and the
 * current project itself. Similarity is scored (+1 per shared value in
 * types / materials / programs, +1 for same zone). Ties broken by `order`.
 * If fewer than 3 projects score > 0, the list is padded with the next
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

  return scored.slice(0, 3).map((s) => s.project);
}

export interface GalleryImage {
  src: ImageMetadata;
  /** Zero-based index within the gallery (hero = 0, gallery starts at 1). */
  index: number;
  /** Plate number label shown in FigCaption (02, 03, …). */
  plate: string;
  /** Optional caption extracted from the filename ("03 - Caption.jpg" → "Caption"). */
  caption: string;
  /** Alt text: caption if present, otherwise generated from project name + index. */
  alt: string;
}

// Import all gallery images eagerly at build time.
// Vite resolves the glob; we filter by slug at runtime (build time for SSG).
const allGalleryImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/projects/*/gallery/*",
  { eager: true },
);

/**
 * Returns the ordered gallery images for a given project slug.
 * Files are sorted alphabetically (rely on numeric prefix: 01, 02, …).
 * Filename convention: "NN - Caption.ext" or "NN.ext" (caption optional).
 */
export function getProjectGallery(
  slug: string,
  projectName: string,
): GalleryImage[] {
  const prefix = `/src/content/projects/${slug}/gallery/`;

  const entries = Object.entries(allGalleryImages)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b));

  return entries.map(([path, mod], i) => {
    const filename = path.slice(prefix.length);
    // Strip extension
    const basename = filename.replace(/\.[^.]+$/, "");
    // Try to extract caption after "NN - " or "NN-" prefix
    const captionMatch = basename.match(/^\d+\s*[-–]\s*(.+)$/);
    const caption = captionMatch ? captionMatch[1].trim() : "";
    // Plate number: hero is 01, gallery starts at 02
    const plateNum = i + 2;
    const plate = String(plateNum).padStart(2, "0");
    const alt = caption || `${projectName} — vue ${plateNum}`;

    return { src: mod.default, index: i + 1, plate, caption, alt };
  });
}
