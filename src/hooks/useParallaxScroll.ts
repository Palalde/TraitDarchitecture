import { useEffect } from "react";
import { useMotionValue } from "framer-motion";
import type { RefObject } from "react";
import { useReducedMotion } from "./useReducedMotion";

const OS_VIEWPORT_SELECTOR = "[data-overlayscrollbars-viewport]";

/**
 * Drives a MotionValue `y` based on element position in the viewport.
 * progress 0 → y = −maxShift  |  progress 0.5 → y = 0  |  progress 1 → y = +maxShift
 *
 * Listens to both `window` scroll (native/mobile) and the OverlayScrollbars
 * viewport (desktop). A MutationObserver catches late OS initialisation.
 */
export function useParallaxScroll<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  overflowPercent: number,
  progressAnchorSelector?: string,
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

    const resolveProgressElement = () => {
      if (!progressAnchorSelector) {
        return el;
      }

      const anchor = el.closest(progressAnchorSelector);
      return anchor instanceof HTMLElement ? anchor : el;
    };

    let rafId: number | null = null;
    let maxShift = el.offsetHeight * overflowPercent;

    const update = () => {
      const progressEl = resolveProgressElement();
      const rect = progressEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, raw));
      y.set(maxShift * (2 * clamped - 1));
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    const onResize = () => {
      maxShift = el.offsetHeight * overflowPercent;
      update();
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // OverlayScrollbars viewport (desktop)
    let osViewport = document.querySelector(OS_VIEWPORT_SELECTOR);
    osViewport?.addEventListener("scroll", onScroll, { passive: true });

    // Late-init fallback: OS may hydrate after this island (client:idle vs client:visible)
    let observer: MutationObserver | null = null;
    if (!osViewport) {
      observer = new MutationObserver(() => {
        const vp = document.querySelector(OS_VIEWPORT_SELECTOR);
        if (vp) {
          osViewport = vp;
          vp.addEventListener("scroll", onScroll, { passive: true });
          observer?.disconnect();
          observer = null;
        }
      });
      observer.observe(document.body, { childList: true });
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      osViewport?.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [isReduced, overflowPercent, progressAnchorSelector, targetRef, y]);

  return { y, isReduced };
}
