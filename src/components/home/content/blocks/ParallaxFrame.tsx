import { useRef, useState, useEffect } from "react";
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
  const [activeOverflow, setActiveOverflow] = useState(overflowPercent);

  useEffect(() => {
    const resolve = () =>
      window.innerWidth < LG_BREAKPOINT ? mobile : overflowPercent;

    setActiveOverflow(resolve());

    if (mobile === overflowPercent) return;

    const onResize = () => setActiveOverflow(resolve());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [overflowPercent, mobile]);

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
