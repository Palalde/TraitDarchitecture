import type { ImageMetadata } from "astro";
import duoPhoto from "@/assets/photos/atelier/Duo.jpg";
import theaPhoto from "@/assets/photos/atelier/Thea.jpg";
import titouanPhoto from "@/assets/photos/atelier/Titouan.jpg";

interface AtelierFigureImage {
  alt: string;
  aspectRatio: "7:5" | "8:5" | "5:4" | "4:5";
  src: ImageMetadata;
}

interface AtelierDuoFigureImage extends AtelierFigureImage {
  label: string;
}

interface AtelierTextBlock {
  body: string;
  title: string;
}

export interface AtelierPersonSection {
  figureId: "Fig. II" | "Fig. III";
  figureLabel: string;
  image: AtelierFigureImage;
  name: string;
  sections: readonly AtelierTextBlock[];
}

export interface AtelierPageData {
  description: string;
  duoFigure: {
    figureId: "Fig. I";
    image: AtelierDuoFigureImage;
    intro: string;
    pivot: string;
    pivotTitle: string;
  };
  heading: string;
  people: readonly [AtelierPersonSection, AtelierPersonSection];
  title: string;
}

export const atelierPageData: AtelierPageData = {
  title: "Atelier | ATELIER TraiT D'ARCHITECTURE",
  description:
    "Théa Battistini & Titouan Granet, deux architectes ancrés entre Corse et Provence. Découvrez l'atelier, sa vision sensible et engagée, et le duo qui le porte.",
  heading: "ATELIER",
  duoFigure: {
    figureId: "Fig. I",
    intro: `<strong>ATELIER TraiT D'ARCHITECTURE</strong> est une <strong>structure indépendante créée par deux architectes aux parcours complémentaires</strong>, unis par une vision commune : celle d'une <strong>architecture sensible, contextuelle et engagée</strong>. Ancrés dans le Sud-Est, <strong>entre Corse et Provence</strong>, ils développent ensemble une pratique attentive, qui donne la priorité à l'existant, au lieu, à l'usage et aux usagers.`,
    pivotTitle: "UN TraiT DE CARACTÈRE",
    pivot: `<strong>Ensemble, ils forment un duo complémentaire et équilibré</strong>, où la rigueur constructive se mêle à la sensibilité du dessin. Leur parcours commun, de la formation à Montpellier jusqu'à la <strong>création de leur agence en 2024</strong>, est jalonné d'expériences humaines et professionnelles fortes. Le voyage, au sens large, reste au coeur de leur approche. Expérimenter des lieux, pratiquer des architectures, leur permet d'élargir leur panel de références et de nourrir cette <strong>vision singulière</strong>, un réel <strong>TraiT DE CARACTERE</strong>.`,
    image: {
      src: duoPhoto,
      label: "Théa & Titouan",
      aspectRatio: "7:5",
      alt: "Théa Battistini et Titouan Granet, architectes, devant un mur ocre et une porte en bois patinée bleue",
    },
  },
  people: [
    {
      figureId: "Fig. II",
      figureLabel: "Titouan Granet",
      name: "Titouan GRANET",
      image: {
        src: titouanPhoto,
        aspectRatio: "4:5",
        alt: "Portrait de Titouan Granet, architecte DE",
      },
      sections: [
        {
          title: "Bio",
          body: `<strong>Architecte diplômé d'État</strong>, Titouan est issu d'un <strong>monde rural marqué par le travail de la terre</strong>, les saisons et les savoir-faire locaux. Attaché à la <strong>Provence de son enfance</strong>, il porte un regard pragmatique et enraciné sur l'acte de bâtir. Sa pratique est portée par le <strong>sens du territoire, des usages et du lien entre espace et quotidien</strong>.`,
        },
        {
          title: "Prix",
          body: `Durant ses études il crée un collectif avec ses amis avec lequel ils répondent à des <strong>concours d'architecture nationaux et internationaux</strong>. Ils sont même primés à l'occasion des concours <strong>Construir'Acier (2015)</strong> et <strong>Wilmotte (2016)</strong>.`,
        },
        {
          title: "Spécialités",
          body: `Il passe par la suite son diplôme de fin d'études avec l'agence d'Urbanisme de Nîmes avec laquelle il débute son parcours professionnel. Cette expérience dans le <strong>champ de l'aménagement du territoire</strong> l'amène à intégrer les <strong>questions de mobilité, de paysage et de temporalité</strong> dans chaque projet.`,
        },
      ],
    },
    {
      figureId: "Fig. III",
      figureLabel: "Théa Battistini",
      name: "Théa BATTISTINI",
      image: {
        src: theaPhoto,
        aspectRatio: "4:5",
        alt: "Portrait de Théa Battistini, architecte HMONP",
      },
      sections: [
        {
          title: "Bio",
          body: `<strong>Architecte HMONP</strong>, Théa est originaire de la <strong>Côte Bleue, proche de Marseille</strong>. Son identité est ancrée par ce <strong>territoire de contrastes</strong> où l'urbanité provençale côtoie l'immensité marine méditerranéenne.`,
        },
        {
          title: "Expérience",
          body: `Son <strong>rapport à l'architecture</strong> est né d'une attention particulière à la <strong>mémoire des lieux</strong>, aux paysages traversés et à la manière dont <strong>les matières portent le vécu</strong>.`,
        },
        {
          title: "Spécialités",
          body: `Son projet de fin d'études, <strong>Bellecoste</strong>, portait sur la restauration d'un hameau isolé au sommet du Mont Lozère. Elle y a exploré une approche où les pierres, les ruines, les absences devenaient matière première. Cette expérience a marqué sa manière de concevoir jusqu'à poursuivre sa pratique professionnelle dans le domaine de la <strong>rénovation, notamment en centre ancien</strong>, en travaillant <strong>au plus près de l'existant</strong>, des contraintes et des histoires à préserver.`,
        },
      ],
    },
  ],
};
