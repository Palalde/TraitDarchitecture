import { getCollection } from "astro:content";

export interface ResolvedFigureProject {
  slug: string;
  name: string;
}

export async function resolveFigureProject(
  project?: string,
): Promise<ResolvedFigureProject | undefined> {
  const slug = project?.trim();
  if (project !== undefined && !slug) {
    throw new Error("Figure: project slug must not be empty.");
  }

  if (!slug) return undefined;

  const entry = (
    await getCollection("projects", ({ data }) => !data.draft)
  ).find((projectEntry) => projectEntry.id.replace(/\/index$/, "") === slug);

  if (!entry) {
    throw new Error(`Figure: unknown project "${slug}".`);
  }

  return { slug, name: entry.data.name };
}
