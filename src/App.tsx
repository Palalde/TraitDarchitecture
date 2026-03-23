import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDesktopOverlayScrollbars } from "./hooks/useDesktopOverlayScrollbars";

const Home = lazy(() => import("./pages/Home"));
const Atelier = lazy(() => import("./pages/Atelier"));
const TraitPhilosophie = lazy(() => import("./pages/TraitPhilosophie"));
const TraitMethode = lazy(() => import("./pages/TraitMethode"));
const Architecture = lazy(() => import("./pages/Architecture"));
const Project = lazy(() => import("./pages/Project"));
const Extrait = lazy(() => import("./pages/Extrait"));
const Article = lazy(() => import("./pages/Article"));
const Contact = lazy(() => import("./pages/Contact"));
const Legal = lazy(() => import("./pages/Legal"));

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
