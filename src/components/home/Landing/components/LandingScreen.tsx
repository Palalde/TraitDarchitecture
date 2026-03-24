import { motion } from "framer-motion";
import { useState } from "react";
import { T2ALogoAnimated } from "./T2ALogoAnimated";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const WORD_MASK_TRANSITION = {
  duration: 0.38,
  ease: [0.22, 1, 0.36, 1] as const,
};
const WORD_TEXT_TRANSITION = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

interface LandingScreenProps {
  handleSlideUpComplete: () => void;
  isSlidingUp: boolean;
  landingSlideUpDuration: number;
}

export function LandingScreen({
  handleSlideUpComplete,
  isSlidingUp,
  landingSlideUpDuration,
}: LandingScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [eraseProgress, setEraseProgress] = useState(
    prefersReducedMotion ? 1 : 0,
  );
  const shadowStarted = !prefersReducedMotion && eraseProgress >= 0.1;

  const atelierVisible = prefersReducedMotion || eraseProgress >= 0.49;
  const traitVisible = prefersReducedMotion || eraseProgress >= 0.56;
  const architectureVisible = prefersReducedMotion || eraseProgress >= 0.61;

  return (
    <motion.section
      className="relative z-10 h-screen w-full overflow-hidden bg-(--bg-primary)"
      initial={false}
      animate={{ y: isSlidingUp ? "-100%" : 0 }}
      onAnimationComplete={isSlidingUp ? handleSlideUpComplete : undefined}
      transition={{ duration: landingSlideUpDuration, ease: "easeOut" }}
    >
      {/* wrapper */}
      <div
        className="absolute top-1/2 left-1/2 flex items-start"
        style={{
          transform: "translate(calc(var(--landing-center) * -1), -50%)",
        }}
      >
        {/* logo */}
        <T2ALogoAnimated
          animateShadow={shadowStarted}
          animateTrait={!prefersReducedMotion}
          className="w-(--landing-logo) shrink-0"
          onEraseProgress={setEraseProgress}
          showFinal={false}
          showShadow={shadowStarted}
          showTrait
        />
        {/* title */}
        <div
          className="-ml-4 select-none"
          style={{
            marginTop: "calc(var(--landing-offset) * -1)",
          }}
        >
          <span className="flex items-baseline gap-[0.7em] whitespace-nowrap text-(--t2a-blue-dark) text-(length:--landing-text) leading-(--landing-leading)">
            <motion.span
              className="block overflow-hidden whitespace-nowrap"
              initial={false}
              animate={{
                clipPath: atelierVisible
                  ? "inset(0% 0% 0% 0%)"
                  : "inset(0% 100% 0% 0%)",
              }}
              transition={WORD_MASK_TRANSITION}
            >
              <motion.span
                className="block font-normal"
                initial={false}
                animate={{
                  opacity: atelierVisible ? 1 : 0,
                  y: atelierVisible ? 0 : -12,
                }}
                transition={WORD_TEXT_TRANSITION}
              >
                ATELIER
              </motion.span>
            </motion.span>
            <motion.span
              className="block overflow-hidden whitespace-nowrap"
              initial={false}
              animate={{
                clipPath: traitVisible
                  ? "inset(0% 0% 0% 0%)"
                  : "inset(0% 100% 0% 0%)",
              }}
              transition={WORD_MASK_TRANSITION}
            >
              <motion.span
                className="block font-semibold"
                initial={false}
                animate={{
                  opacity: traitVisible ? 1 : 0,
                  y: traitVisible ? 0 : -12,
                }}
                transition={WORD_TEXT_TRANSITION}
              >
                TraiT
              </motion.span>
            </motion.span>
            <motion.span
              className="block overflow-hidden whitespace-nowrap"
              initial={false}
              animate={{
                clipPath: architectureVisible
                  ? "inset(0% 0% 0% 0%)"
                  : "inset(0% 100% 0% 0%)",
              }}
              transition={WORD_MASK_TRANSITION}
            >
              <motion.span
                className="block font-normal"
                initial={false}
                animate={{
                  opacity: architectureVisible ? 1 : 0,
                  y: architectureVisible ? 0 : -12,
                }}
                transition={WORD_TEXT_TRANSITION}
              >
                D'ARCHITECTURE
              </motion.span>
            </motion.span>
          </span>
        </div>
        {/* noms */}
        <div
          className="absolute bottom-0 select-none text-center whitespace-nowrap"
          style={{
            left: "var(--landing-center)",
            transform: "translateX(-50%)",
          }}
        >
          <span
            className="block font-light text-(--t2a-blue-light) text-(length:--landing-names) leading-none"
            style={{ transform: "translateY(-0.7em)" }}
          >
            Théa BATTISTINI & Titouan GRANET
          </span>
        </div>
      </div>
      {/* vertical trait */}
      <div
        className="absolute left-1/2 bottom-0"
        style={{ transform: "translateX(-50%)", width: "1px", height: "25%" }}
      >
        <div
          className="h-full w-full bg-(--trait)"
          style={{ transformOrigin: "bottom center" }}
        />
      </div>
    </motion.section>
  );
}
