import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useParallaxScroll } from "@/hooks/useParallaxScroll";

interface ParallaxFrameProps {
  /** Overflow as a fraction of the frame height (0.1 = ±10%). Parent must have overflow-hidden. */
  overflowPercent: number;
  children: ReactNode;
}

/** Vertical parallax island. Use with `client:visible` on teaser image blocks. */
export function ParallaxFrame({
  overflowPercent,
  children,
}: ParallaxFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const { y, isReduced } = useParallaxScroll(frameRef, overflowPercent);

  // Spring smoothing — follows the raw scroll value with a slight physical lag
  const smoothY = useSpring(y, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.01,
  });

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
          y: smoothY,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
