import { useRef, useSyncExternalStore } from "react";
import { LazyMotion, domAnimation, m, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useParallaxScroll } from "@/hooks/useParallaxScroll";

const LG_BREAKPOINT = 1024;

interface ParallaxFrameProps {
  /** Overflow as a fraction of the frame height — desktop (≥1024px). */
  overflowPercent: number;
  /** Overflow for mobile (<1024px). Falls back to overflowPercent if omitted. */
  mobileOverflowPercent?: number;
  children: ReactNode;
}

/** Vertical parallax island. Use with `client:visible` on teaser image blocks. */
export function ParallaxFrame({
  overflowPercent,
  mobileOverflowPercent,
  children,
}: ParallaxFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  const mobile = mobileOverflowPercent ?? overflowPercent;
  const activeOverflow = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined" || mobile === overflowPercent) {
        return () => {};
      }

      window.addEventListener("resize", onStoreChange, { passive: true });
      return () => window.removeEventListener("resize", onStoreChange);
    },
    () =>
      window.innerWidth < LG_BREAKPOINT ? mobile : overflowPercent,
    () => overflowPercent,
  );

  const { y, isReduced } = useParallaxScroll(frameRef, activeOverflow);

  // Spring smoothing — follows the raw scroll value with a slight physical lag
  const smoothY = useSpring(y, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.01,
  });

  if (isReduced) {
    return <div className="relative h-full w-full">{children}</div>;
  }

  const pct = `${activeOverflow * 100}%`;

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={frameRef} className="relative h-full w-full">
        <m.div
          className="absolute inset-x-0"
          style={{
            top: `-${pct}`,
            bottom: `-${pct}`,
            willChange: "transform",
            y: smoothY,
          }}
        >
          {children}
        </m.div>
      </div>
    </LazyMotion>
  );
}
