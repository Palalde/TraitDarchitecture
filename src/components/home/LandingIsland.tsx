import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import {
  LandingScreen,
  LANDING_SLIDE_UP_DURATION_S,
} from "./Landing/components/LandingScreen";
import { useLandingLifecycle } from "./Landing/hooks/useLandingLifecycle";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface LandingIslandProps {
  forceReplay?: boolean;
}

export function LandingIsland({ forceReplay = false }: LandingIslandProps) {
  const {
    handleIntroComplete,
    handleSlideUpComplete,
    isDismissed,
    isSlidingUp,
    landingCollapsed,
    skipAnimation,
  } = useLandingLifecycle({
    forceReplayAnimation: forceReplay,
  });
  const hasDispatchedDismissedRef = useRef(false);

  useBodyScrollLock(!isDismissed);

  useEffect(() => {
    if (!isDismissed || hasDispatchedDismissedRef.current) {
      return;
    }

    document.body.classList.add("landing-dismissed");
    window.dispatchEvent(new CustomEvent("landing:dismissed"));
    hasDispatchedDismissedRef.current = true;
  }, [isDismissed]);

  if (isDismissed && !isSlidingUp) {
    return null;
  }

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      initial={false}
      animate={{ height: landingCollapsed ? 0 : "100vh" }}
      transition={{ duration: LANDING_SLIDE_UP_DURATION_S, ease: "easeOut" }}
    >
      <LandingScreen
        handleSlideUpComplete={handleSlideUpComplete}
        isSlidingUp={isSlidingUp}
        onIntroComplete={handleIntroComplete}
        skipAnimation={skipAnimation}
      />
    </motion.div>
  );
}

export default LandingIsland;
