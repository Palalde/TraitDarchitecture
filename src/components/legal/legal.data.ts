export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "dl"; rows: readonly LegalDefinitionRow[] };

export interface LegalDefinitionRow {
  label: string;
  value: string;
}

export interface LegalSection {
  id: string;
  title: string;
  body: readonly LegalBlock[];
}

export interface LegalPageData {
  title: string;
  description: string;
  heading: string;
  intro: string;
  updatedAt: string;
  email: {
    display: string;
    href: string;
  };
  sections: readonly LegalSection[];
}

export const legalPageData: LegalPageData = {
  title: "Mentions légales | ATELIER TraiT D'ARCHITECTURE",
  description:
    "Mentions légales, données personnelles et cookies du site de l'ATELIER TraiT D'ARCHITECTURE.",
  heading: "MENTIONS LÉGALES",
  intro: "Informations légales du site de l'ATELIER TraiT D'ARCHITECTURE.",
  updatedAt: "⟦À FOURNIR — date de dernière mise à jour⟧",
  email: {
    display: "atelier[at]traitdarchitecture.com",
    href: "mailto:atelier@traitdarchitecture.com",
  },
  sections: [
    {
      id: "editeur",
      title: "Éditeur du site",
      body: [
        {
          kind: "dl",
          rows: [
            {
              label: "Dénomination",
              value: "ATELIER TraiT D'ARCHITECTURE",
            },
            {
              label: "Forme juridique",
              value:
                "⟦À FOURNIR — ex. SARL d'architecture / SAS / SCP / entreprise individuelle⟧",
            },
            {
              label: "Capital social",
              value: "⟦À FOURNIR si société⟧",
            },
            {
              label: "Siège social",
              value: "29 rue Chanoine Letteron, 20200 Bastia",
            },
            {
              label: "SIREN",
              value: "989 997 572 ⟦À CONFIRMER — 9 chiffres = SIREN⟧",
            },
            {
              label: "SIRET (siège)",
              value: "⟦À FOURNIR — 14 chiffres⟧",
            },
            {
              label: "RCS",
              value:
                "Bastia ⟦+ numéro : « RCS Bastia 989 997 572 » à confirmer⟧",
            },
            {
              label: "N° TVA intracommunautaire",
              value: "⟦À FOURNIR si assujetti⟧",
            },
            {
              label: "Téléphone",
              value:
                "+33 6 30 58 99 81 — +33 6 72 31 04 21 ⟦confirmer s'il existe une ligne pro unique⟧",
            },
            {
              label: "Adresse e-mail",
              value: "atelier@traitdarchitecture.com (affichée en anti-spam)",
            },
            {
              label: "Directeur / Responsable de la publication",
              value:
                "⟦À FOURNIR — personne physique : Théa BATTISTINI ou Titouan GRANET⟧",
            },
          ],
        },
      ],
    },
    {
      id: "profession-architecte",
      title: "Exercice de la profession d'architecte",
      body: [
        {
          kind: "p",
          text: "ATELIER TraiT D'ARCHITECTURE est animé par des architectes inscrits au Tableau de l'Ordre des architectes, titre professionnel délivré en France. Leur exercice est régi par la loi n° 77-2 du 3 janvier 1977 sur l'architecture et par le Code des devoirs professionnels des architectes (décret n° 80-217 du 20 mars 1980). Les règles professionnelles sont consultables sur le site du Conseil national de l'Ordre des architectes : https://www.architectes.org.",
        },
        {
          kind: "dl",
          rows: [
            {
              label: "Théa BATTISTINI",
              value:
                "Architecte HMONP — inscrite au Tableau de l'Ordre, n° ⟦À FOURNIR⟧, CROA ⟦région — ex. Corse / PACA⟧",
            },
            {
              label: "Titouan GRANET",
              value:
                "Architecte DE — ⟦À FOURNIR : préciser l'inscription au Tableau (un architecte DE non HMONP exerce sous couvert d'une structure/d'un architecte inscrit) — n° + CROA, ou mention de la société d'architecture inscrite⟧",
            },
            {
              label: "Assurance responsabilité civile professionnelle",
              value:
                "⟦À FOURNIR — assureur (ex. MAF — Mutuelle des Architectes Français), n° de police, couverture géographique (ex. France)⟧",
            },
          ],
        },
      ],
    },
    {
      id: "hebergeur",
      title: "Hébergeur",
      body: [
        {
          kind: "dl",
          rows: [
            {
              label: "Hébergeur",
              value: "Vercel Inc.",
            },
            {
              label: "Adresse",
              value:
                "⟦À VÉRIFIER sur la page légale de Vercel — ex. 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis⟧",
            },
            {
              label: "Site",
              value: "https://vercel.com",
            },
          ],
        },
      ],
    },
    {
      id: "propriete-intellectuelle",
      title: "Propriété intellectuelle",
      body: [
        {
          kind: "p",
          text: "L'ensemble du présent site — sa structure, ses textes, ses visuels, son logo et ses illustrations — est protégé par le droit d'auteur et, le cas échéant, le droit des marques. Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite préalable de l'ATELIER TraiT D'ARCHITECTURE est interdite et constituerait une contrefaçon.",
        },
        {
          kind: "p",
          text: "⟦À COMPLÉTER si nécessaire — crédits photographiques spécifiques.⟧",
        },
      ],
    },
    {
      id: "donnees-personnelles",
      title: "Données personnelles",
      body: [
        {
          kind: "p",
          text: "Le formulaire de contact du site collecte des données personnelles dans l'unique finalité de traiter et répondre à votre demande. Le responsable de traitement est l'ATELIER TraiT D'ARCHITECTURE (coordonnées ci-dessus).",
        },
        {
          kind: "list",
          items: [
            "Nom",
            "Adresse e-mail",
            "Téléphone (facultatif)",
            "Contenu du message",
          ],
        },
        {
          kind: "p",
          text: "La base légale est votre consentement et l'exécution de mesures précontractuelles prises à votre demande. Les données sont destinées aux seuls membres de l'atelier. L'acheminement technique des messages est assuré par notre sous-traitant Web3Forms (service d'envoi de formulaire) : les données transitent par ses serveurs situés aux États-Unis (US-East) ; ce transfert hors Union européenne est encadré contractuellement. Web3Forms indique ne pas conserver les soumissions, ses journaux serveurs pouvant toutefois contenir des données supprimées périodiquement.",
        },
        {
          kind: "p",
          text: "Vos données sont conservées par l'atelier pour la durée nécessaire au traitement de votre demande, puis ⟦À FOURNIR — durée, ex. « 3 ans à compter du dernier contact »⟧.",
        },
        {
          kind: "p",
          text: "Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés, vous disposez des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur vos données. Pour les exercer, écrivez à atelier@traitdarchitecture.com. Vous pouvez également introduire une réclamation auprès de la CNIL (https://www.cnil.fr).",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies & mesure d'audience",
      body: [
        {
          kind: "p",
          text: "Ce site ne dépose aucun cookie publicitaire ni traceur tiers. La mesure d'audience est réalisée au moyen d'une solution respectueuse de la vie privée, sans cookie et sans identifiant persistant (⟦outil — Vercel Web Analytics⟧), qui ne nécessite pas votre consentement au sens des lignes directrices de la CNIL. Les statistiques produites sont agrégées et anonymes.",
        },
      ],
    },
    {
      id: "responsabilite",
      title: "Responsabilité & liens hypertextes",
      body: [
        {
          kind: "p",
          text: "L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, sans pouvoir en garantir l'exhaustivité. Sa responsabilité ne saurait être engagée en cas d'erreur, d'omission ou d'indisponibilité du service. Le site peut contenir des liens vers des sites tiers ; l'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
        },
      ],
    },
    {
      id: "credits",
      title: "Crédits",
      body: [
        {
          kind: "dl",
          rows: [
            {
              label: "Conception & développement",
              value: "⟦À FOURNIR — nom du concepteur du site⟧",
            },
            {
              label: "Photographies & illustrations",
              value: "⟦À FOURNIR — crédits⟧",
            },
            {
              label: "Typographie",
              value: "caractère « T2A » (usage propre à l'atelier)",
            },
          ],
        },
      ],
    },
    {
      id: "droit-applicable",
      title: "Droit applicable",
      body: [
        {
          kind: "p",
          text: "Les présentes mentions légales sont régies par le droit français. Tout litige relatif à l'utilisation du site relève de la compétence des tribunaux du ressort du siège de l'éditeur, sous réserve des dispositions légales impératives applicables aux consommateurs.",
        },
      ],
    },
  ],
};
