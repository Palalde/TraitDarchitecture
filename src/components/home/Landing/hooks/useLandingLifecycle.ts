import { useCallback, useEffect, useMemo, useState } from "react";

type LandingPhase = "ready" | "sliding-up" | "dismissed";

interface UseLandingLifecycleOptions {
  forceReplayAnimation?: boolean;
}

const LANDING_DISMISSED_STORAGE_KEY = "t2a-landing-dismissed";
const LANDING_DISMISS_KEYS = new Set([
  "ArrowDown",
  "PageDown",
  " ",
  "Spacebar",
]);

export function useLandingLifecycle(options: UseLandingLifecycleOptions = {}) {
  const { forceReplayAnimation = false } = options;

  const isReturningVisitor = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem(LANDING_DISMISSED_STORAGE_KEY) === "1";
  }, []);

  const isLandingDismissed = useMemo(() => {
    if (forceReplayAnimation || typeof window === "undefined") {
      return false;
    }

    return sessionStorage.getItem(LANDING_DISMISSED_STORAGE_KEY) === "1";
  }, [forceReplayAnimation]);

  const initialPhase: LandingPhase = isLandingDismissed ? "dismissed" : "ready";
  const [phase, setPhase] = useState<LandingPhase>(initialPhase);
  const [isIntroComplete, setIsIntroComplete] = useState(isLandingDismissed);
  const [skipAnimation, setSkipAnimation] = useState(false);

  const isSlidingUp = phase === "sliding-up";
  const isDismissed = phase === "dismissed";
  const contentVisible = isIntroComplete || isDismissed;
  const landingCollapsed = isSlidingUp || isDismissed;

  const dismissLanding = useCallback(() => {
    if (phase !== "ready" || !isIntroComplete) {
      return;
    }

    setPhase("sliding-up");
  }, [isIntroComplete, phase]);

  const skipToLandingEndState = useCallback(() => {
    if (
      phase !== "ready" ||
      isIntroComplete ||
      !isReturningVisitor ||
      skipAnimation
    ) {
      return;
    }

    setSkipAnimation(true);
  }, [isIntroComplete, isReturningVisitor, phase, skipAnimation]);

  const handleIntroComplete = useCallback(() => {
    setIsIntroComplete(true);
  }, []);

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
    localStorage.setItem(LANDING_DISMISSED_STORAGE_KEY, "1");
  }, [forceReplayAnimation, isDismissed]);

  useEffect(() => {
    if (
      phase !== "ready" ||
      isIntroComplete ||
      !isReturningVisitor ||
      skipAnimation
    ) {
      return;
    }

    const handlePointerDown = () => {
      skipToLandingEndState();
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      skipToLandingEndState();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!LANDING_DISMISS_KEYS.has(event.key)) {
        return;
      }

      event.preventDefault();
      skipToLandingEndState();
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isIntroComplete,
    isReturningVisitor,
    phase,
    skipAnimation,
    skipToLandingEndState,
  ]);

  useEffect(() => {
    if (phase !== "ready" || !isIntroComplete) {
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
  }, [dismissLanding, isIntroComplete, phase]);

  return {
    contentVisible,
    handleIntroComplete,
    handleSlideUpComplete,
    isDismissed,
    isReturningVisitor,
    isSlidingUp,
    landingCollapsed,
    skipAnimation,
  };
}
