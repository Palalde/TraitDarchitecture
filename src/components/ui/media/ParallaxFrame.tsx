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
  /** Optional ancestor selector used as scroll progress reference. */
  progressAnchorSelector?: string;
  children: ReactNode;
}

/** Vertical parallax island. Use with `client:visible` on media frames. */
export function ParallaxFrame({
  overflowPercent,
  mobileOverflowPercent,
  progressAnchorSelector,
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
    () => (window.innerWidth < LG_BREAKPOINT ? mobile : overflowPercent),
    () => overflowPercent,
  );

  const { y, isReduced } = useParallaxScroll(
    frameRef,
    activeOverflow,
    progressAnchorSelector,
  );

  const smoothY = useSpring(y, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.01,
  });

  if (isReduced) {
    return <div className="absolute inset-0">{children}</div>;
  }

  const pct = `${activeOverflow * 100}%`;

  return (
    <LazyMotion features={domAnimation} strict>
      <div ref={frameRef} className="absolute inset-0">
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
