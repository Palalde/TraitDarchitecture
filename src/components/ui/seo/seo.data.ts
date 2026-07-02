import { contactPageData } from "@/components/contact/contact.data";
import { legalPageData, type LegalBlock } from "@/components/legal/legal.data";

const SITE_NAME = "ATELIER TraiT D'ARCHITECTURE";
const SITE_LOGO_PATH = "/media/favicon/favicon.svg";
const INSTAGRAM_URL = "https://www.instagram.com/atelier.trait.darchitecture/";
const OFFICE_NAMES = ["Bastia", "Carry-le-Rouet", "Mézel"] as const;
const AREA_NAMES = ["Corse", "Côte Bleue", "Provence"] as const;
const ORGANIZATION_ID_PATH = "/#organization";
const WEBSITE_ID_PATH = "/#website";

export interface BreadcrumbItemData {
  name: string;
  path: string;
}

export interface ArticleSchemaData {
  headline: string;
  description: string;
  imageUrl: string;
  canonicalUrl: URL;
  publishedDate: Date;
  updatedDate?: Date;
}

export interface CreativeWorkSchemaData {
  name: string;
  imageUrl: string;
  canonicalUrl: URL;
  locationCreatedName: string;
  dateCreated?: string;
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
    "@id": new URL(ORGANIZATION_ID_PATH, siteUrl).href,
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
    "@id": new URL(WEBSITE_ID_PATH, siteUrl).href,
    name: SITE_NAME,
    url: new URL("/", siteUrl).href,
  };
}

export function buildArticleSchema(siteUrl: URL, data: ArticleSchemaData) {
  const organizationId = new URL(ORGANIZATION_ID_PATH, siteUrl).href;
  const dateModified = data.updatedDate ?? data.publishedDate;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    image: data.imageUrl,
    url: data.canonicalUrl.href,
    mainEntityOfPage: {
      "@id": data.canonicalUrl.href,
    },
    datePublished: data.publishedDate.toISOString(),
    dateModified: dateModified.toISOString(),
    author: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
  };
}

export function buildCreativeWorkSchema(
  siteUrl: URL,
  data: CreativeWorkSchemaData,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: data.name,
    url: data.canonicalUrl.href,
    image: data.imageUrl,
    mainEntityOfPage: {
      "@id": data.canonicalUrl.href,
    },
    locationCreated: {
      "@type": "Place",
      name: data.locationCreatedName,
    },
    creator: {
      "@id": new URL(ORGANIZATION_ID_PATH, siteUrl).href,
    },
    ...(data.dateCreated ? { dateCreated: data.dateCreated } : {}),
  };
}

function buildListItemElements(
  siteUrl: URL,
  items: readonly BreadcrumbItemData[],
) {
  return items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: new URL(item.path, siteUrl).href,
  }));
}

export function buildItemListSchema(
  siteUrl: URL,
  items: readonly BreadcrumbItemData[],
  listName?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(listName ? { name: listName } : {}),
    numberOfItems: items.length,
    itemListElement: buildListItemElements(siteUrl, items),
  };
}

export function buildBreadcrumbListSchema(
  siteUrl: URL,
  items: readonly BreadcrumbItemData[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: buildListItemElements(siteUrl, items),
  };
}
