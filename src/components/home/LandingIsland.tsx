import { useEffect, useRef } from "react";

import {
  LandingScreen,
  LANDING_SLIDE_UP_DURATION_S,
} from "./Landing/components/LandingScreen";
import { useLandingLifecycle } from "./Landing/hooks/useLandingLifecycle";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

const LANDING_SLIDE_UP_DURATION_MS = LANDING_SLIDE_UP_DURATION_S * 1000;

interface LandingIslandProps {
  forceReplay?: boolean;
}

export function LandingIsland({ forceReplay = false }: LandingIslandProps) {
  const {
    handleIntroComplete,
    handleSlideUpComplete,
    isDismissed,
    isSlidingUp,
    skipAnimation,
  } = useLandingLifecycle({
    forceReplayAnimation: forceReplay,
  });
  const hasDispatchedDismissedRef = useRef(false);
  const hasDispatchedSlidingUpRef = useRef(false);

  useBodyScrollLock(!isDismissed);

  useEffect(() => {
    if (!isSlidingUp || hasDispatchedSlidingUpRef.current) {
      return;
    }

    window.dispatchEvent(new CustomEvent("landing:sliding-up"));
    hasDispatchedSlidingUpRef.current = true;

    const timeoutId = window.setTimeout(() => {
      handleSlideUpComplete();
    }, LANDING_SLIDE_UP_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [handleSlideUpComplete, isSlidingUp]);

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
    <div className="h-full w-full">
      <LandingScreen
        onIntroComplete={handleIntroComplete}
        skipAnimation={skipAnimation}
      />
    </div>
  );
}
