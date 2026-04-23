import type { ImageMetadata } from "astro";
import duoPhoto from "@/assets/photos/atelier/Duo.JPG";
import theaPhoto from "@/assets/photos/atelier/Thea.JPG";
import titouanPhoto from "@/assets/photos/atelier/Titouan.JPG";

export interface AtelierFigureImage {
  alt: string;
  aspectRatio: "5:4" | "4:5";
  label: string;
  src: ImageMetadata;
}

export interface AtelierTextBlock {
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
    figureLabel: string;
    image: AtelierFigureImage;
    intro: string;
    pivot: string;
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
    figureLabel: "Le duo",
    intro:
      "ATELIER TraiT D'ARCHITECTURE est une structure indépendante créée par deux architectes aux parcours complémentaires, unis par une vision commune : celle d'une architecture sensible, contextuelle et engagée. Ancrés dans le Sud-Est, entre Corse et Provence, ils développent ensemble une pratique attentive, qui donne la priorité à l'existant, au lieu, à l'usage et aux usagers.",
    pivot:
      "Ensemble, ils forment un duo complémentaire et équilibré, où la rigueur constructive se mêle à la sensibilité du dessin. Leur parcours commun, de la formation à Montpellier jusqu'à la création de leur agence en 2024, est jalonné d'expériences humaines et professionnelles fortes. Le voyage, au sens large reste au cœur de leur approche. Expérimenter des lieux, pratiquer des architectures, leur permet d'élargir leur panel de références et de nourrir cette vision singulière, un réel TraiT DE CARACTERE.",
    image: {
      src: duoPhoto,
      label: "Théa & Titouan",
      aspectRatio: "5:4",
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
        label: "Titouan",
        aspectRatio: "4:5",
        alt: "Portrait de Titouan Granet, architecte DE",
      },
      sections: [
        {
          title: "Bio",
          body: "Architecte diplômé d'État, Titouan est issu d'un monde rural marqué par le travail de la terre, les saisons et les savoir-faire locaux. Attaché à la Provence de son enfance, il porte un regard pragmatique et enraciné sur l'acte de bâtir. Sa pratique est portée par le sens du territoire, des usages et du lien entre espace et quotidien.",
        },
        {
          title: "Prix",
          body: "Durant ses études il crée un collectif avec ses amis avec lequel ils répondent à des concours d'architecture nationaux et internationaux. Ils sont même primés à l'occasion du concours Construir'Acier (2015) et Wilmotte (2016).",
        },
        {
          title: "Spécialités",
          body: "Il passe par la suite son diplôme de fin d'études avec l'agence d'Urbanisme de Nîmes avec laquelle il débute son parcours professionnel. Cette expérience dans le champ de l'aménagement du territoire l'amène à intégrer les questions de mobilité, de paysage et de temporalité dans chaque projet.",
        },
      ],
    },
    {
      figureId: "Fig. III",
      figureLabel: "Théa Battistini",
      name: "Théa BATTISTINI",
      image: {
        src: theaPhoto,
        label: "Théa",
        aspectRatio: "4:5",
        alt: "Portrait de Théa Battistini, architecte HMONP",
      },
      sections: [
        {
          title: "Bio",
          body: "Architecte HMONP, Théa est originaire de la Côte Bleue, proche de Marseille. Son identité est ancrée par ce territoire de contrastes où l'urbanité provençale côtoie l'immensité marine méditerranéenne.",
        },
        {
          title: "Expérience",
          body: "Son rapport à l'architecture est né d'une attention particulière à la mémoire des lieux, aux paysages traversés et à la manière dont les matières portent le vécu.",
        },
        {
          title: "Spécialités",
          body: "Son projet de fin d'études, Bellecoste, portait sur la restauration d'un hameau isolé au sommet du Mont Lozère. Elle y a exploré une approche où les pierres, les ruines, les absences devenaient matière première. Cette expérience a marqué sa manière de concevoir jusqu'à poursuivre sa pratique professionnelle dans le domaine de la rénovation, notamment en centre ancien, en travaillant au plus près de l'existant, des contraintes et des histoires à préserver.",
        },
      ],
    },
  ],
};
