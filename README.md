# ATELIER TraiT D'ARCHITECTURE

Site vitrine de l'atelier d'architecture de Théa Battistini & Titouan Granet.

## Prerequis

- Node.js >= 22.12.0
- npm >= 10

## Stack

- Astro 6
- React 19 pour les islands interactives
- TypeScript strict
- TailwindCSS v4
- Framer Motion
- OverlayScrollbars
- ESLint

## Scripts

- `npm run dev` : lance le serveur Astro en local
- `npm run build` : génère le site statique
- `npm run preview` : prévisualise le build
- `npm run lint` : lance ESLint

## Structure

- `src/pages/` : routes Astro
- `src/layouts/` : layout principal
- `src/components/` : composants Astro et islands React
- `src/styles/index.css` : tokens et styles globaux
- `public/` : polices, favicon, fichiers statiques

## Principes

- Architecture Astro-first
- React réservé aux besoins d'interactivité client
- HTML pré-rendu par défaut
- Tailwind inline et tokens centralisés dans `src/styles/index.css`

## Documentation

- `.github/ARCHITECTURE.md` : structure du projet et conventions
- `.github/ASTRO.md` : règles Astro-first et usage des islands
- `.github/UI.md` : système visuel
- `.github/UX.md` : interactions, animation, scroll
- `.github/CONTENT.md` : contenu éditorial
- `.github/ROADMAP.md` : phases du projet
