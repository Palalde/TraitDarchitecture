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

const footerLinkClassName =
  "font-medium underline decoration-current/35 underline-offset-4 transition-[color,text-decoration-color] hover:text-(--t2a-blue-light) hover:decoration-current";

const footerMetaLinkClassName =
  "font-medium underline decoration-current/35 underline-offset-4 transition-[color,text-decoration-color] hover:text-(--t2a-blue-dark) hover:decoration-current dark:hover:text-(--t2a-blue)";

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

      {/* name title*/}
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

      {/* under line */}
      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 px-6 py-6 text-center text-[0.8rem] leading-relaxed text-(--t2a-blue-dark) dark:text-(--t2a-blue) sm:grid-cols-3 sm:items-start sm:gap-4 sm:px-8 sm:text-left md:max-w-4xl lg:px-10">
        {/* compact description */}
        <div className="space-y-2 sm:text-left">
          <p className="font-light">
            Architecture sensible, contextuelle et engagée.
          </p>
          {/* social links */}
          <div className="flex items-center justify-center gap-2 text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) sm:justify-start">
            <span className="text-[0.72rem] uppercase tracking-[0.12em]">
              Suivez-nous
            </span>
            <a
              aria-label="Instagram de l'atelier"
              href="https://www.instagram.com/atelier.trait.darchitecture/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-7 w-7 items-center justify-center transition-[color,transform] hover:scale-110 hover:text-(--t2a-blue)"
            >
              <InstagramLogo className="h-4.5 w-4.5" />
            </a>
            <a
              aria-label="Facebook de l'atelier"
              href="https://www.facebook.com/profile.php?id=61578637113872#"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-7 w-7 items-center justify-center transition-[color,transform] hover:scale-110 hover:text-(--t2a-blue)"
            >
              <FacebookLogo className="h-4.5 w-4.5" />
            </a>
            <a
              aria-label="LinkedIn de l'atelier"
              href="https://www.linkedin.com/company/atelier-trait-d-architecture/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-7 w-7 items-center justify-center transition-[color,transform] hover:scale-110 hover:text-(--t2a-blue)"
            >
              <LinkedInLogo className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-1 sm:text-center">
          <p>
            <a href="tel:+33672310421" className={footerLinkClassName}>
              Titouan +33.6.72.31.04.21
            </a>
          </p>
          <p>
            <a href="tel:+33630589981" className={footerLinkClassName}>
              Théa +33.6.30.58.99.81
            </a>
          </p>
          <p>
            <a
              href="mailto:atelier@traitdarchitecture.com"
              className={footerLinkClassName}
            >
              atelier[at]traitdarchitecture.com
            </a>
          </p>
          <p>Lundi à vendredi : 9h-18h</p>
        </div>

        {/* Copyright + link */}
        <div className="space-y-2 sm:text-right">
          <p>© {new Date().getFullYear()} ATELIER TraiT D'ARCHITECTURE</p>
          <p className="space-x-2 text-(--t2a-blue-light)">
            <a href="/mentions-legales" className={footerMetaLinkClassName}>
              Mentions légales
            </a>
            <span aria-hidden>·</span>
            <span>Site réalisé par:</span>
            <a
              href="https://www.linkedin.com/in/paul-alessandrini"
              target="_blank"
              rel="noreferrer"
              className={footerMetaLinkClassName}
            >
              Paul Alessandrini
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
