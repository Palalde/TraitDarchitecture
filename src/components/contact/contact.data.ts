export interface ContactCartoucheData {
  date: string;
  delay: string;
  heading: string;
  intro: string;
  scale: string;
  subject: string;
}

export interface ContactInterlocutorData {
  name: string;
  phoneDisplay: string;
  phoneHref: string;
  role: string;
}

export interface ContactReviewData {
  author: string;
  rating: number;
  text: string;
}

interface ContactEmailData {
  display: string;
  href: string;
}

interface ContactFormFieldCopy {
  label: string;
  placeholder?: string;
}

interface ContactFormMessages {
  error: string;
  successBody: string;
  successTitle: string;
  unconfigured: string;
}

export interface ContactFormCopy {
  fields: {
    email: ContactFormFieldCopy;
    message: ContactFormFieldCopy;
    name: ContactFormFieldCopy;
    phone: ContactFormFieldCopy;
  };
  messages: ContactFormMessages;
  privacy: {
    href: string;
    linkLabel: string;
    text: string;
  };
  retryLabel: string;
  sendingLabel: string;
  submitLabel: string;
}

export interface ContactPageData {
  cartouche: ContactCartoucheData;
  description: string;
  email: ContactEmailData;
  form: ContactFormCopy;
  googleReviewsUrl: string | null;
  interlocutors: readonly [ContactInterlocutorData, ContactInterlocutorData];
  reviews: readonly [ContactReviewData, ContactReviewData, ContactReviewData];
  title: string;
}

export const contactPageData: ContactPageData = {
  title: "Contact | ATELIER TraiT D'ARCHITECTURE",
  description:
    "Une intention de projet, une question — écrivez à l'atelier. Réponse sous 48 h.",
  cartouche: {
    heading: "CONTACT",
    intro:
      "Une intention de projet, une question, une rencontre. Écrivez-nous.",
    scale: "1:1",
    date: "2026",
    delay: "≤ 48 H",
    subject: "PRISE DE CONTACT",
  },
  interlocutors: [
    {
      name: "Théa BATTISTINI",
      role: "Architecte DE-HMONP",
      phoneDisplay: "+33 6 30 58 99 81",
      phoneHref: "tel:+33630589981",
    },
    {
      name: "Titouan GRANET",
      role: "Architecte DE-HMONP",
      phoneDisplay: "+33 6 72 31 04 21",
      phoneHref: "tel:+33672310421",
    },
  ],
  email: {
    display: "atelier[at]traitdarchitecture.com",
    href: "mailto:atelier@traitdarchitecture.com",
  },
  googleReviewsUrl: null,
  reviews: [
    {
      author: "Caroline Chaumet",
      rating: 5,
      text: "Nous souhaitions une extension de notre habitation qui nous ressemble et qui soit en accord avec nos valeurs. Théa et Titouan ont su être à l'écoute afin de nous proposer un projet qui nous correspond et s'intègre parfaitement avec le bâtiment existant tout en respectant notre budget ainsi que nos contraintes. Leur expertise et leur suivi rigoureux nous a été d'une grande aide pour le choix des artisans, des différents matériaux utilisés ainsi que lors des démarches administratives et du suivi de chantier. Nous sommes heureux d'avoir fait appel à eux et nous ne pouvons que les recommander.",
    },
    {
      author: "Rémi Fouilloud",
      rating: 5,
      text: "Couple d'architectes très compétents et efficaces. Ils nous ont parfaitement accompagnés pour un projet de rénovation et agrandissant maison. Merci à eux n'hésitez à faire appel a leur services.",
    },
    {
      author: "Léa Cavallo",
      rating: 5,
      text: "Théa et Titouan sont des architectes très professionnels, sympathiques arrangeants et très dynamiques ! Ils ont des idées très ingénieuses et originales. Je vous les recommande pour vos projets.",
    },
  ],
  form: {
    fields: {
      name: { label: "NOM COMPLET" },
      email: { label: "EMAIL" },
      phone: { label: "TÉLÉPHONE (OPT.)" },
      message: {
        label: "VOTRE PROJET EN QUELQUES MOTS",
        placeholder:
          "Extension, rénovation, construction neuve, conseil — dites-nous le lieu, la surface approximative et l'horizon temporel si vous les avez.",
      },
    },
    privacy: {
      text: "En envoyant ce message, vous acceptez que vos coordonnées soient utilisées uniquement pour vous répondre.",
      href: "/mentions-legales",
      linkLabel: "Voir mentions légales",
    },
    messages: {
      successTitle: "Merci.",
      successBody: "Nous vous répondons sous 48 h.",
      error:
        "Une erreur est survenue. Écrivez-nous directement : atelier@traitdarchitecture.com",
      unconfigured:
        "Formulaire non configuré — écrivez-nous directement : atelier@traitdarchitecture.com",
    },
    submitLabel: "ENVOYER",
    sendingLabel: "ENVOI...",
    retryLabel: "Envoyer un autre message",
  },
};
