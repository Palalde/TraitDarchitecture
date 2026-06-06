import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "*/index.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      city: z.string(),
      dept: z.string(),
      zone: z.enum(["corse", "cote-bleue", "provence"]),
      cover: image(),
      coverRatio: z.enum(["1/1", "5/4", "4/5"]),
      coverAlt: z.string(),
      order: z.number(),
      // Projet vedette home : position (1, 2, 3). Absent = non vedette.
      home: z.number().int().positive().optional(),
      types: z
        .array(z.enum(["neuf", "renovation", "extension", "surelevation"]))
        .optional(),
      materials: z
        .array(z.enum(["pierre", "bois", "biosource", "reemploi"]))
        .optional(),
      programs: z.array(z.enum(["logement", "equipement", "rural"])).optional(),
      status: z.enum(["etude", "chantier", "livre"]).optional(),
      year: z.number().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
