import { motion } from "framer-motion";
import { T2ALogoAnimated } from "./T2ALogoAnimated";
import { useLandingScreenAnimation } from "../hooks/useLandingScreenAnimation";

// step 1
const LANDING_TRAIT_DRAW_DURATION_S = 2;

// step 2
const LANDING_TRAIT_ERASE_DURATION_S = 2;

// step 3
// text
const LANDING_TITLE_MASK_DURATION_S = 0.38;
const LANDING_TITLE_TEXT_DURATION_S = 0.42;

const WORD_MASK_TRANSITION = {
  duration: LANDING_TITLE_MASK_DURATION_S,
  ease: [0.22, 1, 0.36, 1] as const,
};
const WORD_TEXT_TRANSITION = {
  duration: LANDING_TITLE_TEXT_DURATION_S,
  ease: [0.22, 1, 0.36, 1] as const,
};

//shadow
const LANDING_SHADOW_DURATION_S = 3;

// step 4
const LANDING_FINAL_LOGO_DURATION_S = 4;

// step 5
const LANDING_PHASE_FIVE_DELAY_MS = 150;
const LANDING_VERTICAL_TRAIT_DURATION_S = 0.5;
const LANDING_NAMES_DURATION_S = 0.55;

const LANDING_ERASE_THRESHOLDS = {
  logoRevealStarted: 0.1,
  atelierVisible: 0.49,
  traitVisible: 0.56,
  architectureVisible: 0.61,
} as const;

// exit
export const LANDING_SLIDE_UP_DURATION_S = 1.25;

interface LandingScreenProps {
  handleSlideUpComplete: () => void;
  onIntroComplete: () => void;
  isSlidingUp: boolean;
}

export function LandingScreen({
  handleSlideUpComplete,
  onIntroComplete,
  isSlidingUp,
}: LandingScreenProps) {
  const {
    architectureVisible,
    atelierVisible,
    finalLogoStarted,
    handleEraseComplete,
    handleEraseProgress,
    phaseFiveVisible,
    prefersReducedMotion,
    shadowStarted,
    traitVisible,
  } = useLandingScreenAnimation({
    eraseThresholds: LANDING_ERASE_THRESHOLDS,
    namesDurationS: LANDING_NAMES_DURATION_S,
    onIntroComplete,
    phaseFiveDelayMs: LANDING_PHASE_FIVE_DELAY_MS,
    verticalTraitDurationS: LANDING_VERTICAL_TRAIT_DURATION_S,
  });

  return (
    <motion.section
      className="relative z-10 h-screen w-full overflow-hidden bg-(--bg-primary)"
      initial={false}
      animate={{ y: isSlidingUp ? "-100%" : 0 }}
      onAnimationComplete={isSlidingUp ? handleSlideUpComplete : undefined}
      transition={{ duration: LANDING_SLIDE_UP_DURATION_S, ease: "easeOut" }}
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
          animateFinal={!prefersReducedMotion && finalLogoStarted}
          animateShadow={shadowStarted}
          animateTrait={!prefersReducedMotion}
          className="w-(--landing-logo) shrink-0"
          eraseDuration={LANDING_TRAIT_ERASE_DURATION_S}
          finalDuration={LANDING_FINAL_LOGO_DURATION_S}
          onEraseComplete={handleEraseComplete}
          onEraseProgress={handleEraseProgress}
          shadowDuration={LANDING_SHADOW_DURATION_S}
          showFinal={finalLogoStarted}
          showShadow={shadowStarted}
          showTrait
          traitDuration={LANDING_TRAIT_DRAW_DURATION_S}
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
          <span style={{ display: "block", transform: "translateY(-0.7em)" }}>
            <motion.span
              className="block font-light text-(--t2a-blue-light) text-(length:--landing-names) leading-none"
              initial={false}
              animate={{
                opacity: phaseFiveVisible ? 1 : 0,
              }}
              transition={{
                delay: LANDING_VERTICAL_TRAIT_DURATION_S,
                duration: LANDING_NAMES_DURATION_S,
                ease: "linear",
              }}
            >
              Théa BATTISTINI & Titouan GRANET
            </motion.span>
          </span>
        </div>
      </div>
      {/* vertical trait */}
      <div
        className="absolute left-1/2 bottom-0"
        style={{ transform: "translateX(-50%)", width: "1px", height: "25%" }}
      >
        <motion.div
          className="h-full w-full bg-(--trait)"
          initial={false}
          animate={{
            scaleY: phaseFiveVisible ? 1 : 0,
            opacity: phaseFiveVisible ? 1 : 0,
          }}
          transition={{
            duration: LANDING_VERTICAL_TRAIT_DURATION_S,
            ease: "linear",
          }}
          style={{ transformOrigin: "bottom center" }}
        />
      </div>
    </motion.section>
  );
}
