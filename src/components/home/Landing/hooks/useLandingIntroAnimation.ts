import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useReducedMotion } from "../../../../hooks/useReducedMotion";

type ColumnVisibility = [boolean, boolean, boolean];
type LandingPhase = "intro" | "ready" | "sliding-up";

interface UseLandingIntroAnimationOptions {
  forceAnimate?: boolean;
}

const LANDING_COLUMN_THRESHOLDS = [0.55, 0.62, 0.69] as const;
const LANDING_DISMISS_KEYS = new Set([
  "ArrowDown",
  "PageDown",
  " ",
  "Spacebar",
]);
const LANDING_SLIDE_UP_DURATION_S = 1.5;
const VERTICAL_TRAIT_DELAY_MS = 200;

function getColumnVisibility(
  shouldAnimate: boolean,
  logoProgress: number,
): ColumnVisibility {
  if (!shouldAnimate) {
    return [true, true, true];
  }

  return LANDING_COLUMN_THRESHOLDS.map(
    (threshold) => logoProgress >= threshold,
  ) as ColumnVisibility;
}

// This hook manages the state of the landing intro animation
export function useLandingIntroAnimation(
  options: UseLandingIntroAnimationOptions = {},
) {
  const { forceAnimate = false } = options;
  const reducedMotion = useReducedMotion();

  // first visit ?
  const [isFirstVisit] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !sessionStorage.getItem("t2a-visited");
  });

  // mark as visited on mount
  useEffect(() => {
    if (isFirstVisit) {
      sessionStorage.setItem("t2a-visited", "1");
    }
  }, [isFirstVisit]);

  // should we animate the logo drawing ?
  const shouldAnimate = !reducedMotion && (forceAnimate || isFirstVisit);
  const initialPhase: LandingPhase = shouldAnimate ? "intro" : "ready";
  // logo animation progress (0 to 1)
  const [logoProgress, setLogoProgress] = useState<number>(() =>
    shouldAnimate ? 0 : 1,
  );
  const [verticalTraitStarted, setVerticalTraitStarted] =
    useState<boolean>(false);
  const [verticalTraitCompleted, setVerticalTraitCompleted] =
    useState<boolean>(false);
  const [phase, setPhase] = useState<LandingPhase>(initialPhase);
  const verticalTraitTimeoutRef = useRef<number | null>(null);

  // update logo progress
  const handleLogoProgress = useCallback((progress: number) => {
    setLogoProgress((previous) => (progress > previous ? progress : previous));
  }, []);

  const handleLogoComplete = useCallback(() => {
    verticalTraitTimeoutRef.current = window.setTimeout(() => {
      setVerticalTraitStarted(true);
    }, VERTICAL_TRAIT_DELAY_MS);
  }, []);

  const handleVerticalTraitComplete = useCallback(() => {
    setVerticalTraitCompleted(true);
  }, []);

  const verticalTraitVisible = !shouldAnimate || verticalTraitStarted;
  const namesVisible = !shouldAnimate || verticalTraitCompleted;
  const introCompleted = phase !== "intro";
  const isSlidingUp = phase === "sliding-up";
  const contentVisible = introCompleted;
  const landingCollapsed = isSlidingUp;

  // complete intro when names animation is done
  const completeIntro = useCallback(() => {
    if (phase !== "intro") {
      return;
    }

    setPhase("ready");
  }, [phase]);

  const handleNamesAnimationComplete = useCallback(() => {
    if (!namesVisible) {
      return;
    }

    completeIntro();
  }, [completeIntro, namesVisible]);

  // dismiss landing on user interaction
  const dismissLanding = useCallback(() => {
    if (phase !== "ready") {
      return;
    }

    setPhase("sliding-up");
  }, [phase]);

  // listen for user interaction to dismiss the landing
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

  // cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (verticalTraitTimeoutRef.current !== null) {
        window.clearTimeout(verticalTraitTimeoutRef.current);
      }
    };
  }, []);

  // column visibility based on logo progress
  const colsVisible = useMemo(
    () => getColumnVisibility(shouldAnimate, shouldAnimate ? logoProgress : 1),
    [logoProgress, shouldAnimate],
  );

  return {
    colsVisible,
    contentVisible,
    handleLogoComplete,
    handleLogoProgress,
    handleNamesAnimationComplete,
    handleVerticalTraitComplete,
    introCompleted,
    isSlidingUp,
    isFirstVisit,
    landingCollapsed,
    landingSlideUpDuration: LANDING_SLIDE_UP_DURATION_S,
    logoProgress,
    namesVisible,
    phase,
    reducedMotion,
    shouldAnimate,
    verticalTraitVisible,
  };
}
