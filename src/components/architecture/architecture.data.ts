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
