import { FooterOffice } from "./FooterOffice";
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
      className="relative flex min-h-36 w-full flex-col overflow-hidden bg-(--gradient-end) lg:min-h-44 lg:flex-row"
    >
      <div className="pointer-events-none absolute top-3 -left-30 flex h-8 items-start md:-left-48 md:h-12.5 lg:top-4">
        <T2ALogoLineLeft className="h-full w-auto max-w-none shrink-0 text-(--trait)" />
      </div>
      <div className="relative z-10 flex w-full flex-1 items-center px-6 pb-8 pt-18 sm:px-8 md:pt-24 lg:px-10 lg:pt-16">
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
    </footer>
  );
}
