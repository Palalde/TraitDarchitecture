import { contactPageData } from "@/components/contact/contact.data";
import { legalPageData, type LegalBlock } from "@/components/legal/legal.data";

const SITE_NAME = "ATELIER TraiT D'ARCHITECTURE";
const SITE_LOGO_PATH = "/media/favicon/favicon.svg";
const INSTAGRAM_URL = "https://www.instagram.com/atelier.trait.darchitecture/";
const OFFICE_NAMES = ["Bastia", "Carry-le-Rouet", "Mézel"] as const;
const AREA_NAMES = ["Corse", "Côte Bleue", "Provence"] as const;

export interface BreadcrumbItemData {
  name: string;
  path: string;
}

function isDefinitionListBlock(
  block: LegalBlock,
): block is Extract<LegalBlock, { kind: "dl" }> {
  return block.kind === "dl";
}

function buildFounderSchema() {
  const professionalSection = legalPageData.sections.find(
    (section) => section.id === "profession-architecte",
  );
  const professionalRows =
    professionalSection?.body.find(isDefinitionListBlock)?.rows ?? [];

  return professionalRows
    .filter(
      (row) =>
        row.label === "Théa BATTISTINI" || row.label === "Titouan GRANET",
    )
    .map((row) => ({
      "@type": "Person",
      name: row.label,
      jobTitle: row.value.split(" —")[0] ?? row.value,
    }));
}

function buildLocationSchema() {
  return contactPageData.offices.map((office, index) => {
    const [streetAddress, postalLine] = office.addressLines;
    const postalMatch = postalLine.match(/^(\d{5})\s+(.+)$/);
    const postalCode = postalMatch?.[1];
    const addressLocality = postalMatch?.[2] ?? postalLine;

    return {
      "@type": "Place",
      name: OFFICE_NAMES[index] ?? office.city,
      address: {
        "@type": "PostalAddress",
        streetAddress,
        postalCode,
        addressLocality,
        addressCountry: "FR",
      },
    };
  });
}

export function buildOrganizationSchema(siteUrl: URL) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": new URL("/#organization", siteUrl).href,
    name: SITE_NAME,
    url: new URL("/", siteUrl).href,
    logo: new URL(SITE_LOGO_PATH, siteUrl).href,
    founder: buildFounderSchema(),
    email: contactPageData.email.href.replace(/^mailto:/, ""),
    telephone: contactPageData.interlocutors.map(({ phoneHref }) =>
      phoneHref.replace(/^tel:/, ""),
    ),
    location: buildLocationSchema(),
    areaServed: AREA_NAMES.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    sameAs: [contactPageData.googleReviewsUrl, INSTAGRAM_URL],
  };
}

export function buildWebSiteSchema(siteUrl: URL) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": new URL("/#website", siteUrl).href,
    name: SITE_NAME,
    url: new URL("/", siteUrl).href,
  };
}

export function buildBreadcrumbListSchema(
  siteUrl: URL,
  items: readonly BreadcrumbItemData[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).href,
    })),
  };
}
