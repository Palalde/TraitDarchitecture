import { useEffect } from "react";
import { useMotionValue } from "framer-motion";
import type { RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Pilote un MotionValue `y` en fonction de la position de l'élément cible
 * dans le viewport, pour créer un effet parallax vertical.
 *
 * - progress 0 (entrée par le bas)  → y = −maxShift (bas de l'image visible)
 * - progress 0.5 (centré)           → y = 0 (image centrée)
 * - progress 1 (sortie par le haut) → y = +maxShift (haut de l'image visible)
 *
 * Compatible OverlayScrollbars : écoute à la fois `window` (mobile/natif)
 * et `[data-overlayscrollbars-viewport]` (desktop).
 * getBoundingClientRect() retourne toujours des coordonnées relatives au
 * viewport visuel, quel que soit le conteneur qui scrolle.
 *
 * @param targetRef    - Ref sur l'élément dont on mesure la position
 * @param overflowPercent - Dépassement en fraction de la hauteur du cadre
 *                          (ex. 0.1 = 10% au-dessus et 10% en dessous)
 */
export function useParallaxScroll<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  overflowPercent: number,
) {
  const y = useMotionValue(0);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) {
      y.set(0);
      return;
    }

    const el = targetRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let maxShift = 0;

    const recalcMaxShift = () => {
      maxShift = el.offsetHeight * overflowPercent;
    };

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = élément qui entre par le bas, 1 = élément qui sort par le haut
      const raw = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, raw));
      y.set(maxShift * (2 * clamped - 1));
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    const onResize = () => {
      recalcMaxShift();
      update();
    };

    recalcMaxShift();
    update();

    // Scroll natif (mobile + desktop sans OS)
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // OverlayScrollbars viewport (desktop ≥1024px)
    let osViewport: Element | null = document.querySelector(
      "[data-overlayscrollbars-viewport]",
    );
    if (osViewport) {
      osViewport.addEventListener("scroll", scheduleUpdate, { passive: true });
    }

    // Fallback : MutationObserver si OS n'est pas encore initialisé au mount
    // (client:idle peut parfois s'exécuter après client:visible)
    let observer: MutationObserver | null = null;
    if (!osViewport) {
      observer = new MutationObserver(() => {
        const vp = document.querySelector("[data-overlayscrollbars-viewport]");
        if (vp) {
          osViewport = vp;
          osViewport.addEventListener("scroll", scheduleUpdate, {
            passive: true,
          });
          observer?.disconnect();
          observer = null;
        }
      });
      // Le viewport OS est un enfant direct de body
      observer.observe(document.body, { childList: true });
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", onResize);
      if (osViewport) {
        osViewport.removeEventListener("scroll", scheduleUpdate);
      }
      observer?.disconnect();
    };
  }, [isReduced, overflowPercent, targetRef, y]);

  return { y, isReduced };
}
