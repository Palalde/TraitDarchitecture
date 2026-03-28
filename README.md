# Trait D'Architecture

Site vitrine de l'ATELIER TraiT D'ARCHITECTURE, migré vers Astro.

## Stack

- Astro 6
- React 19 pour les islands interactives
- TypeScript strict
- TailwindCSS v4
- Framer Motion
- OverlayScrollbars

## Scripts

- `npm run dev` : lance le serveur Astro en local
- `npm run build` : génère le site statique
- `npm run preview` : prévisualise le build
- `npm run lint` : lance ESLint

## Structure

- `src/pages/` : routes Astro
- `src/layouts/` : layouts Astro
- `src/components/` : composants Astro et islands React
- `public/` : médias, polices, favicon

## Notes

- Le site suit une migration SPA React/Vite vers Astro.
- Les composants purement statiques doivent rester en `.astro`.
- Les composants React sont réservés aux parties nécessitant de l'interactivité client.
