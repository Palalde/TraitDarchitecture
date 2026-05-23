import type { ImageMetadata } from "astro";
import diagFaisaPhoto from "@/assets/photos/TraiT/1. DIAG_FAISA..jpg";
import esquissePhoto from "@/assets/photos/TraiT/2. ESQ.jpg";
import apsApdPhoto from "@/assets/photos/TraiT/3. APS_APD.jpg";
import pcPhoto from "@/assets/photos/TraiT/4. PC.png";
import proDcePhoto from "@/assets/photos/TraiT/5. PRO-DCE.png";
import detPhoto from "@/assets/photos/TraiT/6.DET.jpg";

type TraitPhaseId = "I" | "II" | "III";
type TraitFormulaPhase = "creation" | "implementation" | "realisation";
type TraitStepMediaRatio = "1:1" | "3:2" | "5:4" | "8:5";
type TraitStepMediaWidth = "narrow" | "medium" | "large";

export interface TraitFormulaPhaseDescriptor {
  id: TraitFormulaPhase;
  label: string;
}

/**
 * Single source of truth for the three formula phases (id + display label).
 * Consumed by both the matrix header (TraitFormulas) and the per-row
 * mobile/desktop renderer (TraitFormulaRow).
 */
export const FORMULA_PHASES: readonly TraitFormulaPhaseDescriptor[] = [
  { id: "creation", label: "CRÉATION" },
  { id: "implementation", label: "MISE EN OEUVRE" },
  { id: "realisation", label: "RÉALISATION" },
];
export type TraitProcessPhotoKey =
  | "diagFaisa"
  | "esquisse"
  | "apsApd"
  | "pc"
  | "proDce"
  | "det";

export const traitProcessPhotos: Record<TraitProcessPhotoKey, ImageMetadata> = {
  diagFaisa: diagFaisaPhoto,
  esquisse: esquissePhoto,
  apsApd: apsApdPhoto,
  pc: pcPhoto,
  proDce: proDcePhoto,
  det: detPhoto,
};

interface TraitTextBlock {
  body: string;
  title: string;
}

interface TraitOpeningData {
  heading: string;
  identity: TraitTextBlock;
  project: {
    title: string;
    preview: string;
  };
  callout: TraitTextBlock;
}

export interface TraitEtymology {
  etymology: string;
  meaning: string;
  phonetic: string;
  word: string;
}

interface TraitSchemaEntry {
  meaning: string;
  word: string;
}

interface TraitMethodData {
  cta: {
    href: string;
    label: string;
    prompt: string;
  };
  paragraphs: readonly [string, string];
  services: readonly string[];
  title: string;
}

export interface TraitStepData {
  body: string;
  caption: string;
  displayTitle?: string;
  id: "01" | "02" | "03" | "04" | "05" | "06";
  mediaRatio: TraitStepMediaRatio;
  mediaWidth: TraitStepMediaWidth;
  phaseId: TraitPhaseId;
  photoKey: TraitProcessPhotoKey;
  title: string;
}

export interface TraitPhaseData {
  id: TraitPhaseId;
  label: string;
  steps: readonly TraitStepData[];
  title: string;
}

export interface TraitFormulaData {
  description: string;
  name: "Formule A" | "Formule B" | "Formule C" | "Formule D";
  phases: readonly TraitFormulaPhase[];
}

export interface TraitPageData {
  closingQuote: string;
  description: string;
  etymologies: readonly [TraitEtymology, TraitEtymology, TraitEtymology];
  formulas: readonly [
    TraitFormulaData,
    TraitFormulaData,
    TraitFormulaData,
    TraitFormulaData,
  ];
  method: TraitMethodData;
  opening: TraitOpeningData;
  phases: readonly [TraitPhaseData, TraitPhaseData, TraitPhaseData];
  pivot: string;
  schema: readonly [TraitSchemaEntry, TraitSchemaEntry, TraitSchemaEntry];
  title: string;
}

export const traitPageData: TraitPageData = {
  title: "TraiT | ATELIER TraiT D'ARCHITECTURE",
  description:
    "Découvrez la philosophie et la méthode d'ATELIER TraiT D'ARCHITECTURE. Un trait, trois temps : création, mise en oeuvre, réalisation.",
  opening: {
    heading: "TraiT",
    identity: {
      title: "Notre identité",
      body: `Plus qu'un simple nom, <strong>ATELIER TraiT D'ARCHITECTURE</strong> représente notre vision de notre métier. Trois mots, trois intentions, trois aspects de notre caractère qui, ensemble, définissent notre façon de concevoir.`,
    },
    project: {
      title: "Chaque projet est différent",
      preview: `Il est donc important pour nous d'<strong>établir une base commune</strong> avec nos clients, une aventure humaine fondée sur l'écoute, la confiance et le dialogue. Nous développons ensuite l'idée du projet grâce à <strong>un accompagnement de tout instant</strong> qui allie créativité, rigueur technique et respect du lieu.`,
    },
    callout: {
      title: "Approche sensible et engagée",
      body: `Alors travailler avec nous, c'est choisir une <strong>approche sensible et engagée</strong> de l'architecture <strong>adaptée</strong> aux nouveaux modes de vie et <strong>respectueuse</strong> de la nature. C'est aussi <strong>se libérer</strong> d'une certaine <strong>source de stress</strong> et de <strong>charge mentale</strong>. Un chantier, c'est long et épuisant, se sentir entouré est fondamental.`,
    },
  },
  etymologies: [
    {
      word: "ATELIER",
      phonetic: "[atəlje] n.g (non genré)",
      etymology:
        "ancien français astelier, tas de bois, chantier, de astele, éclat de bois, du latin populaire astella, planchette.",
      meaning:
        "Espace de création favorisant l'esprit collaboratif et coopératif. Espace de recherche intellectuelle et manuelle favorisant les pratiques locales et artisanales. Lieu de vie humanisant le secteur du bâtiment, en rupture avec les postulats préétablis de la construction actuelle.",
    },
    {
      word: "TraiT",
      phonetic: "[tʁɛ] n.g (non genré)",
      etymology:
        'du latin tractus, dérivé de tractum, action de "tirer, trainer, tracter".',
      meaning:
        "Qui dessine et structure l'espace, qui sépare et relie à la fois et fait naître l'architecture. Geste de la main comme prolongement de la pensée, fidèle à une tradition de l'architecte qui esquisse et observe avant de modéliser, faisant avancer la réflexion. Geste créatif comme symbole d'une pensée équilibrée, en tension entre plein et vide, entre rigueur et sensibilité, tissant un lien entre une idée, des envies et un projet.",
    },
    {
      word: "D'ARCHITECTURE",
      phonetic: "[aʁʃitɛktyʁ] n.g (non genré)",
      etymology:
        "latin architectura, issu du grec arkhitéktôn / arkhós, « maître » et téktôn, « ouvrier, charpentier ».",
      meaning:
        "Résultat du \"mariage\" entre la matière grise, l'idée, le processus créatif, et la matière construite, le territoire physique, le patrimoine culturel. Synthèse construite d'une sensibilité, d'une idée commune partagée entre des Hommes et un Territoire. Activité localisée, ancrée et territorialisée entre valeurs patrimoniales et usages actuels. Façon de bâtir, de construire dans les règles de l'Art.",
    },
  ],
  schema: [
    {
      word: "ATELIER",
      meaning: "EXPÉRIMENTATION & COOPÉRATION",
    },
    {
      word: "TraiT",
      meaning: "CRÉATION & IMAGINATION",
    },
    {
      word: "D'ARCHITECTURE",
      meaning: "RÉALISATION & CONSTRUCTION",
    },
  ],
  pivot:
    "Recréer du liant, un TraiT entre l'Architecture et le Territoire, entre la Construction et l'Histoire",
  method: {
    title: "Notre démarche",
    paragraphs: [
      `Un <strong>projet n'est jamais qu'un simple plan</strong>. Il se construit étapes par étapes, en volumétrie, en coupe, en façade mais surtout en dialogue constant entre le lieu, le client, les artisans et l'architecte.`,
      `Notre rôle en tant qu'architectes constructeurs est <strong>un accompagnement entièrement personnalisé</strong> possible du premier coup de crayon jusqu'à la remise des clefs par une méthode claire et définie en amont avec nos clients. Et cela, <strong>quelle qu'en soit l'échelle du projet</strong>, de la cabane à l'immeuble, de la crèche au complexe sportif.`,
    ],
    services: [
      "Conseil architectural",
      "Montage de demande de Permis de Construire",
      "Réalisation de plans techniques de construction",
      "Consultation des entreprises et analyse de devis",
      "Création d'une équipe de construction complète (maîtrise d'oeuvre & entreprises)",
      "Suivi de chantier",
    ],
    cta: {
      prompt:
        "Notre atelier est prêt à vous accompagner dans toutes vos démarches.",
      label: "Prenez rendez-vous",
      href: "/contact",
    },
  },
  phases: [
    {
      id: "I",
      label: "PHASE I",
      title: "CRÉATION",
      steps: [
        {
          id: "01",
          phaseId: "I",
          title: "Diagnostic et faisabilité",
          body: `Chaque projet commence par une <strong>immersion dans le site</strong>. Relevé de l'existant, étude du PLU, du contexte paysager, culturel et climatique : que ce soit pour une construction neuve ou pour une réhabilitation, <strong>comprendre le déjà-là</strong> est une étape essentielle autant à l'échelle de la parcelle que celle du territoire dans lequel le projet s'inscrit.`,
          caption: "relevé / contexte",
          mediaRatio: "1:1",
          mediaWidth: "narrow",
          photoKey: "diagFaisa",
        },
        {
          id: "02",
          phaseId: "I",
          title: "Esquisse",
          body: `À partir du programme et des volontés du commanditaire, nous proposons une <strong>première orientation</strong>. Plans, croquis et <strong>esquisses à la main</strong> permettent de saisir l'essence du projet et d'engager une <strong>réflexion commune</strong>, sensible et ouverte.`,
          caption: "croquis / intentions",
          mediaRatio: "3:2",
          mediaWidth: "medium",
          photoKey: "esquisse",
        },
        {
          id: "03",
          phaseId: "I",
          title: "Avant-projets sommaires et définitifs (APS / APD)",
          displayTitle: "APS / APD",
          body: `La conception se précise : les volumes s'affinent, les choix se structurent. C'est le temps de la mesure et de l'équilibre, où le projet gagne en cohérence et en lisibilité. C'est à ce stade que nous réalisons les premiers <strong>documents à l'échelle, métrés, quantifiés et estimés</strong>.`,
          caption: "mise au point",
          mediaRatio: "8:5",
          mediaWidth: "large",
          photoKey: "apsApd",
        },
        {
          id: "04",
          phaseId: "I",
          title: "Autorisations d'urbanisme (DP / PC)",
          displayTitle: "Autorisations d'urbanisme",
          body: `Nous constituons les pièces nécessaires aux <strong>démarches administratives</strong> (Déclaration Préalable, Permis de Construire, Autorisations de Travaux ou autre) et nous occupons de tous les échanges nécessaires avec les services instructeurs. Cette étape assure l'<strong>ancrage légal et réglementaire du projet</strong>, pour que sa concrétisation puisse débuter sereinement. <strong>Tous les éléments dessinés jusqu'au permis de construire ne sont JAMAIS des plans de construction.</strong>`,
          caption: "permis / dossier",
          mediaRatio: "5:4",
          mediaWidth: "medium",
          photoKey: "pc",
        },
      ],
    },
    {
      id: "II",
      label: "PHASE II",
      title: "MISE EN OEUVRE",
      steps: [
        {
          id: "05",
          phaseId: "II",
          title: "Projet (PRO / DCE / ACT)",
          displayTitle: "PRO / DCE / ACT",
          body: `Le projet entre dans sa dimension technique. Nous détaillons alors chaque élément, établissons <strong>les plans techniques</strong> et rédigeons les documents nécessaires à la <strong>consultation des entreprises</strong> (Dossier de Consultation des Entreprises). Cette étape garantit la bonne exécution du projet et permet d'obtenir des devis précis et comparables. Nous analyserons et négocions par la suite chaque devis reçu pour vous afin d'obtenir <strong>les prix les plus justes</strong>, dans les meilleures conditions.`,
          caption: "plans techniques",
          mediaRatio: "5:4",
          mediaWidth: "narrow",
          photoKey: "proDce",
        },
      ],
    },
    {
      id: "III",
      label: "PHASE III",
      title: "RÉALISATION",
      steps: [
        {
          id: "06",
          phaseId: "III",
          title: "Suivi des travaux (DET / OPC)",
          displayTitle: "DET / OPC",
          body: `Nous accompagnons le maître d'ouvrage tout au long du chantier. De la coordination des entreprises à la vérification de la conformité des ouvrages, nous veillons au respect du projet, du budget et du calendrier. Notre rôle est d'être à la fois médiateur et garant de la qualité architecturale, jusqu'à la livraison finale.`,
          caption: "suivi / chantier",
          mediaRatio: "8:5",
          mediaWidth: "large",
          photoKey: "det",
        },
      ],
    },
  ],
  formulas: [
    {
      name: "Formule A",
      description: "Création → Permis de Construire",
      phases: ["creation"],
    },
    {
      name: "Formule B",
      description:
        "Création → PRO/DCE (plans techniques + consultation entreprises)",
      phases: ["creation", "implementation"],
    },
    {
      name: "Formule C",
      description: "Mission complète avec suivi chantier",
      phases: ["creation", "implementation", "realisation"],
    },
    {
      name: "Formule D",
      description: "Uniquement suivi chantier",
      phases: ["realisation"],
    },
  ],
  closingQuote:
    "« Nous étudions chaque demande avec grande attention. Contactez-nous via notre site internet ou nos réseaux sociaux, nous vous répondrons rapidement. »",
};
