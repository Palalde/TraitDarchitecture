import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  site: "https://traitdarchitecture.com",
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith("/404"),
    }),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        // Sharp encodes WebP alpha losslessly by default, so `quality` alone
        // barely shrinks transparent illustrations. Photos have no alpha.
        // Not part of Astro's output filename hash: after changing it, bump the
        // illustrations' `quality` so cached transforms are re-encoded.
        webp: { alphaQuality: 50 },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
