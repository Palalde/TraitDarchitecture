import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useReducedMotion } from "../../../../hooks/useReducedMotion";

type ColumnVisibility = [boolean, boolean, boolean];

interface UseLandingIntroAnimationOptions {
  forceAnimate?: boolean;
}

const LANDING_COLUMN_THRESHOLDS = [0.55, 0.62, 0.69] as const;
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
  // logo animation progress (0 to 1)
  const [logoProgress, setLogoProgress] = useState<number>(() =>
    shouldAnimate ? 0 : 1,
  );
  const [verticalTraitStarted, setVerticalTraitStarted] =
    useState<boolean>(false);
  const [verticalTraitCompleted, setVerticalTraitCompleted] =
    useState<boolean>(false);
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
  const verticalTraitVisible = !shouldAnimate || verticalTraitStarted;
  const namesVisible = !shouldAnimate || verticalTraitCompleted;

  return {
    colsVisible,
    handleLogoComplete,
    handleLogoProgress,
    handleVerticalTraitComplete,
    isFirstVisit,
    logoProgress,
    namesVisible,
    reducedMotion,
    shouldAnimate,
    verticalTraitVisible,
  };
}
