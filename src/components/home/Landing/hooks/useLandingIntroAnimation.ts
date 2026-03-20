import { useCallback, useEffect, useMemo, useState } from "react";

import { useReducedMotion } from "../../../../hooks/useReducedMotion";
import { LANDING_COLUMN_THRESHOLDS } from "../constants/landingIntro.constants";

type ColumnVisibility = [boolean, boolean, boolean];

interface UseLandingIntroAnimationOptions {
  forceAnimate?: boolean;
}

// columns appear at 25%, 50% and 75% of the logo animation
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

  // update logo progress
  const handleLogoProgress = useCallback((progress: number) => {
    setLogoProgress((previous) => (progress > previous ? progress : previous));
  }, []);

  // column visibility based on logo progress
  const colsVisible = useMemo(
    () => getColumnVisibility(shouldAnimate, logoProgress),
    [logoProgress, shouldAnimate],
  );

  return {
    colsVisible,
    handleLogoProgress,
    isFirstVisit,
    reducedMotion,
    shouldAnimate,
  };
}
