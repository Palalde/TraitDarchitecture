import type { ReactNode } from "react";
import { T2ALogoLineLeft } from "./logo/T2ALogoLineLeft";

const FOOTER_OFFICES = [
  {
    city: "CORSE",
    addressLines: ["29 rue Chanoine Letteron", "20200 Bastia"],
  },
  {
    city: "CÔTE BLEUE",
    addressLines: ["10 allée des églantiers", "13960 Sausset-les-Pins"],
  },
  {
    city: "PROVENCE",
    addressLines: ["22 rue des Fenils", "04270 Mézel"],
  },
] as const;

const FOOTER_LINKS = {
  email: {
    href: "mailto:atelier@traitdarchitecture.com",
    label: "atelier[at]traitdarchitecture.com",
  },
  siteCredit: {
    href: "#",
    label: "Site réalisé par",
  },
  legal: {
    href: "/mentions-legales",
    label: "Mentions légales",
  },
} as const;

interface FooterProps {
  children?: ReactNode;
}

export function Footer({ children }: FooterProps) {
  return (
    <footer
      aria-label="Pied de page"
      className="relative flex min-h-36 w-full flex-col overflow-hidden bg-(--gradient-end) lg:min-h-44 lg:flex-row"
      data-footer-links={Object.keys(FOOTER_LINKS).length}
      data-footer-offices={FOOTER_OFFICES.length}
    >
      <div className="absolute flex items-start pointer-events-none -left-30 md:-left-48 h-8 md:h-12.5  top-3 lg:top-4 ">
        <T2ALogoLineLeft className="h-full w-auto max-w-none shrink-0 text-(--trait)" />
      </div>
      {children}
    </footer>
  );
}
