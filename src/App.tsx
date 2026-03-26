import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDesktopOverlayScrollbars } from "./hooks/useDesktopOverlayScrollbars";

const Home = lazy(() => import("./legacy-pages/Home"));
const Atelier = lazy(() => import("./legacy-pages/Atelier"));
const TraitPhilosophie = lazy(() => import("./legacy-pages/TraitPhilosophie"));
const TraitMethode = lazy(() => import("./legacy-pages/TraitMethode"));
const Architecture = lazy(() => import("./legacy-pages/Architecture"));
const Project = lazy(() => import("./legacy-pages/Project"));
const Extrait = lazy(() => import("./legacy-pages/Extrait"));
const Article = lazy(() => import("./legacy-pages/Article"));
const Contact = lazy(() => import("./legacy-pages/Contact"));
const Legal = lazy(() => import("./legacy-pages/Legal"));

export default function App() {
  useDesktopOverlayScrollbars();

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atelier" element={<Atelier />} />
        <Route path="/trait/philosophie" element={<TraitPhilosophie />} />
        <Route path="/trait/methode" element={<TraitMethode />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/architecture/:slug" element={<Project />} />
        <Route path="/extrait" element={<Extrait />} />
        <Route path="/extrait/:slug" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<Legal />} />
      </Routes>
    </Suspense>
  );
}
