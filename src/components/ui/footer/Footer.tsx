import { Link } from "react-router";
import { FooterOffice } from "./FooterOffice";
import { FacebookLogo, InstagramLogo, LinkedInLogo } from "../social/logo";
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

export function Footer() {
  return (
    <footer
      aria-label="Pied de page"
      className="relative w-full overflow-hidden bg-(--gradient-end)"
    >
      {/* Logo trait */}
      <div className="pointer-events-none absolute top-3 -left-30 flex h-8 items-start md:-left-48 md:h-12.5 lg:top-4">
        <T2ALogoLineLeft className="h-full w-auto max-w-none shrink-0 text-(--trait)" />
      </div>

      {/* Offices */}
      <div className="relative z-10 px-6 pt-18 sm:px-8 md:pt-24 lg:px-10 lg:pt-16">
        <div className="mx-auto w-full max-w-3xl md:max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {FOOTER_OFFICES.map((office, index) => (
              <div
                key={office.city}
                className={
                  index === 0
                    ? "px-5 py-5 md:px-8"
                    : "border-t border-(--trait) px-5 py-5 sm:border-t-0 sm:border-l md:px-8"
                }
              >
                <FooterOffice
                  addressLines={office.addressLines}
                  city={office.city}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nom atelier — gigantesque */}
      <div
        aria-hidden
        className="pointer-events-none mt-6 flex w-full select-none items-baseline justify-center px-4 md:mt-10"
      >
        <p
          className="w-full text-center font-normal leading-none tracking-[0.12em] text-(--t2a-blue-dark) opacity-50"
          style={{ fontSize: "clamp(2.75rem, 7.5vw, 7.5rem)" }}
        >
          ATELIER{" "}
          <span className="font-semibold" style={{ fontSize: "1.15em" }}>
            TraiT
          </span>{" "}
          D'ARCHITECTURE
        </p>
      </div>

      {/* Ligne basse */}
      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 px-6 py-6 text-center text-[0.8rem] leading-relaxed text-(--t2a-blue) sm:grid-cols-3 sm:items-start sm:gap-4 sm:px-8 sm:text-left md:max-w-4xl lg:px-10">
        {/* Description compacte */}
        <div className="space-y-2 sm:text-left">
          <p className="font-light">
            Architecture sensible, contextuelle et engagee.
          </p>
          <div className="flex items-center justify-center gap-3 text-(--t2a-blue-light) sm:justify-start">
            <span className="text-[0.72rem] uppercase tracking-[0.18em]">
              Suivez nous
            </span>
            <a
              aria-label="Instagram de l'atelier"
              href="https://www.instagram.com/atelier.trait.darchitecture/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-(--t2a-blue)"
            >
              <InstagramLogo className="h-4 w-4" />
            </a>
            <a
              aria-label="Facebook de l'atelier"
              href="https://www.facebook.com/profile.php?id=61578637113872#"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-(--t2a-blue)"
            >
              <FacebookLogo className="h-4 w-4" />
            </a>
            <a
              aria-label="LinkedIn de l'atelier"
              href="https://www.linkedin.com/company/atelier-trait-d-architecture/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-(--t2a-blue)"
            >
              <LinkedInLogo className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-1 sm:text-center">
          <p>
            <a
              href="tel:+33672310421"
              className="transition-colors hover:text-(--t2a-blue-light)"
            >
              Titouan +33.6.72.31.04.21
            </a>
          </p>
          <p>
            <a
              href="tel:+33630589981"
              className="transition-colors hover:text-(--t2a-blue-light)"
            >
              Thea +33.6.30.58.99.81
            </a>
          </p>
          <p>
            <a
              href="mailto:atelier@traitdarchitecture.com"
              className="transition-colors hover:text-(--t2a-blue-light)"
            >
              atelier[at]traitdarchitecture.com
            </a>
          </p>
          <p>Lundi a vendredi : 9h-18h</p>
        </div>

        {/* Copyright + liens */}
        <div className="space-y-2 sm:text-right">
          <p>© {new Date().getFullYear()} ATELIER TraiT D'ARCHITECTURE</p>
          <p className="space-x-2 text-(--t2a-blue-light)">
            <Link
              to="/mentions-legales"
              className="transition-colors hover:text-(--t2a-blue)"
            >
              Mentions legales
            </Link>
            <span aria-hidden>·</span>
            <span>Site realise par:</span>
            <a
              href="https://www.linkedin.com/in/paul-alessandrini"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-(--t2a-blue)"
            >
              Paul Alessandrini
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
