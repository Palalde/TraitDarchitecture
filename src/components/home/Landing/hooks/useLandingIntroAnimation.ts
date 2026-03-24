import { useCallback, useEffect, useMemo, useState } from "react";

type LandingPhase = "ready" | "sliding-up" | "dismissed";

interface UseLandingIntroAnimationOptions {
  forceReplayAnimation?: boolean;
  showStaticEndState?: boolean;
}

const LANDING_DISMISSED_STORAGE_KEY = "t2a-landing-dismissed";
const LANDING_DISMISS_KEYS = new Set([
  "ArrowDown",
  "PageDown",
  " ",
  "Spacebar",
]);

export function useLandingIntroAnimation(
  options: UseLandingIntroAnimationOptions = {},
) {
  const { forceReplayAnimation = false, showStaticEndState = false } = options;

  const isLandingDismissed = useMemo(() => {
    if (forceReplayAnimation || typeof window === "undefined") {
      return false;
    }

    return sessionStorage.getItem(LANDING_DISMISSED_STORAGE_KEY) === "1";
  }, [forceReplayAnimation]);

  const initialPhase: LandingPhase = isLandingDismissed ? "dismissed" : "ready";
  const [phase, setPhase] = useState<LandingPhase>(initialPhase);

  const isSlidingUp = phase === "sliding-up";
  const isDismissed = phase === "dismissed";
  const contentVisible = showStaticEndState || phase === "ready" || isDismissed;
  const landingCollapsed = isSlidingUp || isDismissed;

  const dismissLanding = useCallback(() => {
    if (phase !== "ready") {
      return;
    }

    setPhase("sliding-up");
  }, [phase]);

  const handleSlideUpComplete = useCallback(() => {
    if (phase !== "sliding-up") {
      return;
    }

    setPhase("dismissed");
  }, [phase]);

  useEffect(() => {
    if (forceReplayAnimation || !isDismissed || typeof window === "undefined") {
      return;
    }

    sessionStorage.setItem(LANDING_DISMISSED_STORAGE_KEY, "1");
  }, [forceReplayAnimation, isDismissed]);

  useEffect(() => {
    if (phase !== "ready") {
      return;
    }

    const handlePointerDown = () => {
      dismissLanding();
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      dismissLanding();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!LANDING_DISMISS_KEYS.has(event.key)) {
        return;
      }

      event.preventDefault();
      dismissLanding();
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dismissLanding, phase]);

  return {
    contentVisible,
    handleSlideUpComplete,
    isDismissed,
    isLandingDismissed,
    isSlidingUp,
    landingCollapsed,
    phase,
    forceReplayAnimation,
    showStaticEndState,
  };
}
