import type { APIRoute } from "astro";
import {
  buildFeaturedArticlesMarkdown,
  buildFullArticlesText,
  buildProjectListMarkdown,
} from "@/components/ui/seo/llms.data";

export const GET: APIRoute = async ({ site, url }) => {
  const siteUrl = site ?? url;
  const [projectList, featuredArticleList, fullArticlesText] =
    await Promise.all([
      buildProjectListMarkdown(siteUrl),
      buildFeaturedArticlesMarkdown(siteUrl),
      buildFullArticlesText(),
    ]);

  const body = `# ATELIER TraiT D'ARCHITECTURE — llms-full

Version étendue de l'index LLM du site. Ce fichier rassemble les textes visibles des pages clés, les informations de contact et les articles publiés, afin de donner une vue plus complète du contenu du site aux modèles de langage.

## Pages

### Accueil

ATELIER TraiT D'ARCHITECTURE

Atelier d'architecture sensible, contextuelle et engagée. Théa Battistini & Titouan Granet.

Deux architectes, deux regards, une même vision. Ancrés entre Corse et Provence, Théa et Titouan dessinent une architecture sensible, à l'écoute du territoire et de ceux qui l'habitent.

Chaque projet commence par l'écoute du lieu, des usages et de ceux qui y vivront. Du premier trait jusqu'à la remise des clefs, nous accompagnons une aventure humaine fondée sur la confiance et le dialogue.

EXTraiT rassemble nos articles, prises de position et retours de terrain sur les questions que particuliers comme professionnels se posent avant de construire, rénover ou transformer. Un espace pour dépasser les idées reçues, comprendre les arbitrages et entrer dans les réalités d'un projet architectural.

### Atelier

ATELIER | ATELIER TraiT D'ARCHITECTURE

Théa Battistini & Titouan Granet, deux architectes ancrés entre Corse et Provence. Découvrez l'atelier, sa vision sensible et engagée, et le duo qui le porte.

ATELIER TraiT D'ARCHITECTURE est une structure indépendante créée par deux architectes aux parcours complémentaires, unis par une vision commune : celle d'une architecture sensible, contextuelle et engagée. Ancrés dans le Sud-Est, entre Corse et Provence, ils développent ensemble une pratique attentive, qui donne la priorité à l'existant, au lieu, à l'usage et aux usagers.

Ensemble, ils forment un duo complémentaire et équilibré, où la rigueur constructive se mêle à la sensibilité du dessin. Leur parcours commun, de la formation à Montpellier jusqu'à la création de leur agence en 2024, est jalonné d'expériences humaines et professionnelles fortes. Le voyage, au sens large, reste au coeur de leur approche. Expérimenter des lieux, pratiquer des architectures, leur permet d'élargir leur panel de références et de nourrir cette vision singulière, un réel TraiT DE CARACTERE.

### Théa BATTISTINI

Architecte HMONP, Théa est originaire de la Côte Bleue, proche de Marseille. Son identité est ancrée par ce territoire de contrastes où l'urbanité provençale côtoie l'immensité marine méditerranéenne.

Son rapport à l'architecture est né d'une attention particulière à la mémoire des lieux, aux paysages traversés et à la manière dont les matières portent le vécu.

Son projet de fin d'études, Bellecoste, portait sur la restauration d'un hameau isolé au sommet du Mont Lozère. Elle y a exploré une approche où les pierres, les ruines, les absences devenaient matière première. Cette expérience a marqué sa manière de concevoir jusqu'à poursuivre sa pratique professionnelle dans le domaine de la rénovation, notamment en centre ancien, en travaillant au plus près de l'existant, des contraintes et des histoires à préserver.

### Titouan GRANET

Architecte diplômé d'État, Titouan est issu d'un monde rural marqué par le travail de la terre, les saisons et les savoir-faire locaux. Attaché à la Provence de son enfance, il porte un regard pragmatique et enraciné sur l'acte de bâtir. Sa pratique est portée par le sens du territoire, des usages et du lien entre espace et quotidien.

Durant ses études il crée un collectif avec ses amis avec lequel ils répondent à des concours d'architecture nationaux et internationaux. Ils sont même primés à l'occasion des concours Construir'Acier (2015) et Wilmotte (2016).

Il passe par la suite son diplôme de fin d'études avec l'agence d'Urbanisme de Nîmes avec laquelle il débute son parcours professionnel. Cette expérience dans le champ de l'aménagement du territoire l'amène à intégrer les questions de mobilité, de paysage et de temporalité dans chaque projet.

### TraiT

TraiT | ATELIER TraiT D'ARCHITECTURE

Découvrez la philosophie et la méthode d'ATELIER TraiT D'ARCHITECTURE. Un trait, trois temps : création, mise en oeuvre, réalisation.

Plus qu'un simple nom, ATELIER TraiT D'ARCHITECTURE représente notre vision de notre métier. Trois mots, trois intentions, trois aspects de notre caractère qui, ensemble, définissent notre façon de concevoir.

Recréer du liant, un TraiT entre l'Architecture et le Territoire, entre la Construction et l'Histoire.

Notre méthode

Un projet n'est jamais qu'un simple plan. Il se construit étapes par étapes, en volumétrie, en coupe, en façade mais surtout en dialogue constant entre le lieu, le client, les artisans et l'architecte.

Notre rôle en tant qu'architectes constructeurs est un accompagnement entièrement personnalisé possible du premier coup de crayon jusqu'à la remise des clefs par une méthode claire et définie en amont avec nos clients. Et cela, quelle qu'en soit l'échelle du projet, de la cabane à l'immeuble, de la crèche au complexe sportif.

Conseil architectural

Montage de demande de Permis de Construire

Réalisation de plans techniques de construction

Consultation des entreprises et analyse de devis

Création d'une équipe de construction complète (maîtrise d'oeuvre & entreprises)

Suivi de chantier

PHASE I — CRÉATION

Diagnostic et faisabilité : Chaque projet commence par une immersion dans le site. Relevé de l'existant, étude du PLU, du contexte paysager, culturel et climatique : que ce soit pour une construction neuve ou pour une réhabilitation, comprendre le déjà-là est une étape essentielle autant à l'échelle de la parcelle que celle du territoire dans lequel le projet s'inscrit.

Esquisse : À partir du programme et des volontés du commanditaire, nous proposons une première orientation. Plans, croquis et esquisses à la main permettent de saisir l'essence du projet et d'engager une réflexion commune, sensible et ouverte.

APS / APD : La conception se précise : les volumes s'affinent, les choix se structurent. C'est le temps de la mesure et de l'équilibre, où le projet gagne en cohérence et en lisibilité. C'est à ce stade que nous réalisons les premiers documents à l'échelle, métrés, quantifiés et estimés.

Autorisations d'urbanisme : Nous constituons les pièces nécessaires aux démarches administratives (Déclaration Préalable, Permis de Construire, Autorisations de Travaux ou autre) et nous occupons de tous les échanges nécessaires avec les services instructeurs. Cette étape assure l'ancrage légal et réglementaire du projet, pour que sa concrétisation puisse débuter sereinement. Tous les éléments dessinés jusqu'au permis de construire ne sont JAMAIS des plans de construction.

PHASE II — MISE EN OEUVRE

PRO / DCE / ACT : Le projet entre dans sa dimension technique. Nous détaillons alors chaque élément, établissons les plans techniques et rédigeons les documents nécessaires à la consultation des entreprises (Dossier de Consultation des Entreprises). Cette étape garantit la bonne exécution du projet et permet d'obtenir des devis précis et comparables. Nous analyserons et négocierons par la suite chaque devis reçu pour vous afin d'obtenir les prix les plus justes, dans les meilleures conditions.

PHASE III — RÉALISATION

DET / OPC : Nous accompagnons le maître d'ouvrage tout au long du chantier. De la coordination des entreprises à la vérification de la conformité des ouvrages, nous veillons au respect du projet, du budget et du calendrier. Notre rôle est d'être à la fois médiateur et garant de la qualité architecturale, jusqu'à la livraison finale.

### Architecture

Architecture | ATELIER TraiT D'ARCHITECTURE

Projets et réalisations de l'ATELIER TraiT D'ARCHITECTURE.

Projets présents sur le site:

${projectList}

### EXTraiT

EXTraiT | ATELIER TraiT D'ARCHITECTURE

Articles, réflexions et prises de position de l'ATELIER TraiT D'ARCHITECTURE.

EXTraiT rassemble nos articles, prises de position et retours de terrain sur les questions que particuliers comme professionnels se posent avant de construire, rénover ou transformer. Un espace pour dépasser les idées reçues, comprendre les arbitrages et entrer dans les réalités d'un projet architectural.

Articles vedettes sur la page d'accueil:

${featuredArticleList}

### Contact

Contact | ATELIER TraiT D'ARCHITECTURE

Une intention de projet, une question — écrivez à l'atelier. Réponse sous 48 h.

Lundi à vendredi : 9h-18h

Théa BATTISTINI — Architecte HMONP — +33 6 30 58 99 81

Titouan GRANET — Architecte DE — +33 6 72 31 04 21

Email : atelier@traitdarchitecture.com

Bureaux:

- CORSE — 29 rue Chanoine Letteron, 20200 Bastia
- CÔTE BLEUE — 76 avenue Draio de la mar, 13620 Carry-le-Rouet
- PROVENCE — 22 rue des Fenils, 04270 Mézel

### Mentions légales

Mentions légales | ATELIER TraiT D'ARCHITECTURE

Mentions légales, données personnelles et cookies du site de l'ATELIER TraiT D'ARCHITECTURE.

Éditeur du site:

- Dénomination : ATELIER TraiT D'ARCHITECTURE
- Forme juridique : SARL d'architecture
- Capital social : 2 000 €
- Siège social : 29 rue Chanoine Letteron, 20200 Bastia
- SIRET (siège) : 989 997 572 00016
- RCS : R.C.S. Bastia 989 997 572
- TVA : FR 71 989 997 572
- Téléphone : +33 6 30 58 99 81 — +33 6 72 31 04 21
- Email : atelier@traitdarchitecture.com
- Directrice / Responsable de la publication : Théa BATTISTINI

Exercice de la profession d'architecte:

- Théa BATTISTINI : Architecte HMONP — inscrite au Tableau de l'Ordre des architectes sous le n° 092906 (Conseil régional de l'Ordre des architectes de Corse).
- Titouan GRANET : Architecte DE — exerce au sein de la société d'architecture ATELIER TraiT D'ARCHITECTURE.
- Société d'architecture : ATELIER TraiT D'ARCHITECTURE — inscrite au Tableau de l'Ordre des architectes sous le n° S25949.
- Assurance responsabilité civile professionnelle : MAF — Mutuelle des Architectes Français, police n° 270210.

Hébergeur : Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis.

Le site collecte des données personnelles via le formulaire de contact uniquement pour traiter la demande. Le site n'utilise pas de cookies publicitaires ni de traceur tiers ; la mesure d'audience est réalisée sans cookie et sans identifiant persistant.

## Articles

${fullArticlesText}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
