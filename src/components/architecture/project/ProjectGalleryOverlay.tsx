import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface ProjectGallerySlide {
  src: string;
  width: number;
  height: number;
  plate: string;
  caption: string;
  alt: string;
}

interface Props {
  projectName: string;
  slides: ProjectGallerySlide[];
}

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return Math.min(Math.max(index, 0), length - 1);
}

export function ProjectGalleryOverlay({ projectName, slides }: Props) {
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // The slide we intend to rest on. Decoupling intent from the live scroll
  // position is what stops them fighting: the previous version bound
  // activeIndex <-> scroll via an IntersectionObserver + scrollIntoView, which
  // caused opening on slide 0 instead of the clicked one, arrows that needed
  // several clicks, and a settle flicker after a swipe.
  const targetIndexRef = useRef(0);
  const scrollRafRef = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const portalTarget = typeof document === "undefined" ? null : document.body;
  const hasMultipleSlides = slides.length > 1;
  const counterLabel = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    slides.length,
  ).padStart(2, "0")}`;

  useBodyScrollLock(isOpen, { allowZoom: true });
  useFocusTrap(dialogRef, isOpen);

  // Initial alignment happens in the scroll container's callback ref (commit
  // phase, before paint) so the overlay opens already on the right slide with
  // no flash — and without useLayoutEffect (which warns under island SSR).
  // Slides are exactly viewport-wide, so offset = index * clientWidth.
  const setScrollRef = useCallback((node: HTMLDivElement | null) => {
    scrollRef.current = node;
    if (node) {
      node.scrollLeft = targetIndexRef.current * node.clientWidth;
    }
  }, []);

  // Open from any [data-gallery-open] trigger (cover, gallery image, or the
  // "Voir la galerie" button), at the requested slide.
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest<HTMLElement>("[data-gallery-open]");
      if (!trigger) return;

      const requested = Number.parseInt(trigger.dataset.galleryOpen ?? "", 10);
      if (!Number.isFinite(requested)) return;

      event.preventDefault();
      const next = clampIndex(requested, slides.length);
      targetIndexRef.current = next;
      setActiveIndex(next);
      setIsOpen(true);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [slides.length]);

  // Force-unmount before a View Transition snapshot (mobile-menu guard).
  useEffect(() => {
    const forceClose = () => {
      flushSync(() => {
        setIsOpen(false);
      });
    };

    document.addEventListener("astro:before-preparation", forceClose);
    return () =>
      document.removeEventListener("astro:before-preparation", forceClose);
  }, []);

  // Scroll position is the single source of truth: derive activeIndex (counter
  // + arrow states) from it. Nothing scrolls in reaction to activeIndex, so the
  // feedback loop is gone. Re-align instantly on resize (rotation) to stay snapped.
  useEffect(() => {
    if (!isOpen) return;
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        const node = scrollRef.current;
        if (!node || node.clientWidth === 0) return;
        const index = clampIndex(
          Math.round(node.scrollLeft / node.clientWidth),
          slides.length,
        );
        targetIndexRef.current = index;
        setActiveIndex(index);
      });
    };

    const handleResize = () => {
      const node = scrollRef.current;
      if (!node) return;
      node.scrollLeft = targetIndexRef.current * node.clientWidth;
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, [isOpen, slides.length]);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const next = clampIndex(index, slides.length);
    targetIndexRef.current = next;
    setActiveIndex(next);
    container.scrollTo({
      left: next * container.clientWidth,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  // Step from the intended slide (not the live scroll) so rapid clicks and
  // clicks landed mid-swipe accumulate correctly instead of cancelling out.
  const stepSlide = (delta: number) =>
    scrollToIndex(targetIndexRef.current + delta);

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      return;
    }
    if (!hasMultipleSlides) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepSlide(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      stepSlide(1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(slides.length - 1);
    }
  };

  if (!portalTarget || !isOpen || slides.length === 0) {
    return null;
  }

  return createPortal(
    <div
      ref={dialogRef}
      aria-label={`Galerie du projet ${projectName}`}
      aria-modal="true"
      className="fixed inset-0 flex flex-col bg-(--bg-primary)"
      onClick={() => setIsOpen(false)}
      onKeyDown={handleDialogKeyDown}
      role="dialog"
      style={{ zIndex: 80 }}
      tabIndex={-1}
    >
      <header
        className="flex items-center justify-between gap-3 border-b border-(--trait) px-4 py-3 sm:px-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-(--text-muted)">
            Galerie
          </p>
          <p className="mt-1 truncate text-[0.72rem] uppercase tracking-[0.12em] text-(--text-secondary)">
            {projectName}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {hasMultipleSlides && (
            <span className="min-w-22 text-center text-[0.65rem] uppercase tracking-[0.14em] text-(--text-muted)">
              {counterLabel}
            </span>
          )}

          <button
            aria-label="Fermer la galerie"
            className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 border border-(--trait) px-3 text-[0.65rem] uppercase tracking-[0.12em] text-(--text-primary) transition-colors duration-200 can-hover:hover:text-(--t2a-blue)"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <span aria-hidden="true" className="text-[0.95rem] leading-none">
              ×
            </span>
            Fermer
          </button>
        </div>
      </header>

      <div
        ref={setScrollRef}
        className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => {
          const caption = slide.caption.trim();
          const isNear = Math.abs(index - activeIndex) <= 1;

          return (
            <figure
              className="flex h-full w-full shrink-0 snap-center flex-col items-center justify-center gap-3 p-4 sm:p-6 lg:p-8"
              key={`${slide.plate}-${slide.src}`}
            >
              <div className="flex min-h-0 w-full flex-1 items-center justify-center">
                <img
                  alt={slide.alt}
                  className="max-h-full max-w-full object-contain"
                  draggable="false"
                  height={slide.height}
                  loading={isNear ? "eager" : "lazy"}
                  onClick={(event) => event.stopPropagation()}
                  src={slide.src}
                  width={slide.width}
                />
              </div>

              <figcaption
                className="flex w-full max-w-6xl items-start justify-between gap-4 text-[0.6rem] uppercase tracking-[0.12em] text-(--text-muted) sm:text-[0.68rem]"
                onClick={(event) => event.stopPropagation()}
              >
                <span className="shrink-0">{slide.plate}</span>
                {caption && (
                  <span className="max-w-[70%] text-right leading-tight">
                    {caption}
                  </span>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {hasMultipleSlides && (
        <>
          {/* Mobile only (< md): a dedicated bottom control bar. The side
              arrows would sit on top of a wide image — and any bottom-corner
              placement would clash with the plate/caption — so on phones the
              navigation lives in its own flow row that never covers the image
              or the labels, whatever the aspect ratio. Tablet & desktop (md+)
              keep the side arrows. */}
          <div className="flex items-center gap-3 border-t border-(--trait) px-4 py-3 sm:px-6 md:hidden">
            <button
              aria-label="Image précédente"
              className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 border border-(--trait) bg-(--bg-primary) text-[0.65rem] uppercase tracking-[0.12em] text-(--text-primary) transition-colors duration-200 can-hover:hover:text-(--t2a-blue) disabled:cursor-default disabled:opacity-35"
              disabled={activeIndex === 0}
              onClick={(event) => {
                event.stopPropagation();
                stepSlide(-1);
              }}
              type="button"
            >
              <span aria-hidden="true" className="text-[0.95rem] leading-none">
                ‹
              </span>
              Précédent
            </button>

            <button
              aria-label="Image suivante"
              className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 border border-(--trait) bg-(--bg-primary) text-[0.65rem] uppercase tracking-[0.12em] text-(--text-primary) transition-colors duration-200 can-hover:hover:text-(--t2a-blue) disabled:cursor-default disabled:opacity-35"
              disabled={activeIndex >= slides.length - 1}
              onClick={(event) => {
                event.stopPropagation();
                stepSlide(1);
              }}
              type="button"
            >
              Suivant
              <span aria-hidden="true" className="text-[0.95rem] leading-none">
                ›
              </span>
            </button>
          </div>

          {/* Tablet & desktop (md+): side-overlay arrows, hidden under md. */}
          <button
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-(--trait) bg-(--bg-primary) text-[1.1rem] text-(--text-primary) transition-colors duration-200 can-hover:hover:text-(--t2a-blue) disabled:cursor-default disabled:opacity-35 sm:left-5 md:inline-flex"
            disabled={activeIndex === 0}
            onClick={(event) => {
              event.stopPropagation();
              stepSlide(-1);
            }}
            type="button"
          >
            ‹
          </button>

          <button
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-(--trait) bg-(--bg-primary) text-[1.1rem] text-(--text-primary) transition-colors duration-200 can-hover:hover:text-(--t2a-blue) disabled:cursor-default disabled:opacity-35 sm:right-5 md:inline-flex"
            disabled={activeIndex >= slides.length - 1}
            onClick={(event) => {
              event.stopPropagation();
              stepSlide(1);
            }}
            type="button"
          >
            ›
          </button>
        </>
      )}
    </div>,
    portalTarget,
  );
}
