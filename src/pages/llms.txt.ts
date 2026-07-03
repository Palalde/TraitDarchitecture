import type { APIRoute } from "astro";
import {
  buildArticleListMarkdown,
  buildProjectListMarkdown,
} from "@/components/ui/seo/llms.data";

function pageLink(
  siteUrl: URL,
  path: string,
  label: string,
  description: string,
): string {
  const url = new URL(path, siteUrl).href;
  return `- [${label}](${url}) - ${description}`;
}

export const GET: APIRoute = async ({ site, url }) => {
  const siteUrl = site ?? url;
  const [projectList, articleList] = await Promise.all([
    buildProjectListMarkdown(siteUrl),
    buildArticleListMarkdown(siteUrl),
  ]);

  const body = `# ATELIER TraiT D'ARCHITECTURE

Site vitrine de l'ATELIER TraiT D'ARCHITECTURE, agence indépendante fondée par Théa Battistini et Titouan Granet. Le site présente l'atelier, sa méthode, ses projets, ses articles de fond et ses coordonnées, avec un ancrage entre Corse et Provence.

## Pages clés

${pageLink(siteUrl, "/", "Accueil", "Présentation du site et accès direct aux projets, à la méthode et aux articles.")}
${pageLink(siteUrl, "/atelier/", "Atelier", "Le duo, son parcours, sa vision sensible et son ancrage territorial.")}
${pageLink(siteUrl, "/trait/", "TraiT", "La philosophie et la méthode de l'atelier, en trois temps: création, mise en oeuvre, réalisation.")}
${pageLink(siteUrl, "/architecture/", "Architecture", "Sélection de projets et réalisations de l'atelier.")}
${pageLink(siteUrl, "/extrait/", "EXTraiT", "Articles de fond sur le métier, la construction et les choix architecturaux.")}
${pageLink(siteUrl, "/contact/", "Contact", "Coordonnées et formulaire pour une intention de projet ou une question.")}
${pageLink(siteUrl, "/mentions-legales/", "Mentions légales", "Informations légales, données personnelles et cookies du site.")}

## Projets

${projectList}

## Articles

${articleList}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
