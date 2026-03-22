import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useReducedMotion } from "../../../../hooks/useReducedMotion";

type ColumnVisibility = [boolean, boolean, boolean];

interface UseLandingIntroAnimationOptions {
  forceAnimate?: boolean;
  onIntroComplete?: () => void;
  onSlideUpStart?: () => void;
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
  const { forceAnimate = false, onIntroComplete, onSlideUpStart } = options;
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
  const [introCompleted, setIntroCompleted] = useState<boolean>(!shouldAnimate);
  const [isSlidingUp, setIsSlidingUp] = useState<boolean>(false);
  const hasCompletedIntroRef = useRef(!shouldAnimate);
  const hasDismissedRef = useRef(false);
  const hasNotifiedIntroRef = useRef(false);
  const hasNotifiedSlideUpRef = useRef(false);
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

  const completeIntro = useCallback(() => {
    if (hasCompletedIntroRef.current) {
      return;
    }

    hasCompletedIntroRef.current = true;
    setIntroCompleted(true);
  }, []);

  const handleNamesAnimationComplete = useCallback(() => {
    if (!namesVisible) {
      return;
    }

    completeIntro();
  }, [completeIntro, namesVisible]);

  useEffect(() => {
    if (!introCompleted || hasNotifiedIntroRef.current) {
      return;
    }

    hasNotifiedIntroRef.current = true;
    onIntroComplete?.();
  }, [introCompleted, onIntroComplete]);

  useEffect(() => {
    if (!isSlidingUp || hasNotifiedSlideUpRef.current) {
      return;
    }

    hasNotifiedSlideUpRef.current = true;
    onSlideUpStart?.();
  }, [isSlidingUp, onSlideUpStart]);

  const dismissLanding = useCallback(() => {
    if (!introCompleted || hasDismissedRef.current) {
      return;
    }

    hasDismissedRef.current = true;
    setIsSlidingUp(true);
  }, [introCompleted]);

  useEffect(() => {
    if (!introCompleted || isSlidingUp) {
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
  }, [dismissLanding, introCompleted, isSlidingUp]);

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
    handleLogoComplete,
    handleLogoProgress,
    handleNamesAnimationComplete,
    handleVerticalTraitComplete,
    introCompleted,
    isSlidingUp,
    isFirstVisit,
    landingSlideUpDuration: LANDING_SLIDE_UP_DURATION_S,
    logoProgress,
    namesVisible,
    reducedMotion,
    shouldAnimate,
    verticalTraitVisible,
  };
}
