import { useRef } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useParallaxScroll } from "@/hooks/useParallaxScroll";

interface ParallaxFrameProps {
  /**
   * Dépassement en fraction de la hauteur du cadre.
   * 0.1 = image étendue de 10% au-dessus et 10% en dessous du cadre.
   * Le cadre parent doit avoir overflow-hidden.
   */
  overflowPercent: number;
  children: ReactNode;
}

/**
 * Island React qui applique un effet parallax vertical à ses enfants.
 * À utiliser avec client:visible dans les blocs image des sections teasers.
 *
 * Structure :
 *   div[ref, h-full w-full relative]      ← mesure la position dans le viewport
 *     motion.div[absolute, ±overflow%]    ← se translate en Y selon la progression
 *       children (img)                    ← remplit le motion.div
 *
 * Le cadre parent (aspect-square ou aspect-4/5) doit avoir overflow-hidden.
 * Si prefers-reduced-motion : rendu statique, image centrée, 0 listener.
 */
export function ParallaxFrame({
  overflowPercent,
  children,
}: ParallaxFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const { y, isReduced } = useParallaxScroll(frameRef, overflowPercent);

  if (isReduced) {
    return <div className="relative h-full w-full">{children}</div>;
  }

  const pct = `${overflowPercent * 100}%`;

  return (
    <div ref={frameRef} className="relative h-full w-full">
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: `-${pct}`,
          bottom: `-${pct}`,
          willChange: "transform",
          y,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
