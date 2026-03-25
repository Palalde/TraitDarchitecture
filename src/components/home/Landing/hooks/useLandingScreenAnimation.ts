import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LandingEraseMilestones {
  logoRevealStarted: boolean;
  atelierVisible: boolean;
  traitVisible: boolean;
  architectureVisible: boolean;
}

interface LandingEraseThresholds {
  logoRevealStarted: number;
  atelierVisible: number;
  traitVisible: number;
  architectureVisible: number;
}

interface UseLandingScreenAnimationOptions {
  eraseThresholds: LandingEraseThresholds;
  namesDurationS: number;
  onIntroComplete: () => void;
  phaseFiveDelayMs: number;
  skipAnimation?: boolean;
  verticalTraitDurationS: number;
}

function createMilestonesState(
  prefersReducedMotion: boolean,
): LandingEraseMilestones {
  return {
    logoRevealStarted: prefersReducedMotion,
    atelierVisible: prefersReducedMotion,
    traitVisible: prefersReducedMotion,
    architectureVisible: prefersReducedMotion,
  };
}

export function useLandingScreenAnimation({
  eraseThresholds,
  namesDurationS,
  onIntroComplete,
  phaseFiveDelayMs,
  skipAnimation = false,
  verticalTraitDurationS,
}: UseLandingScreenAnimationOptions) {
  const prefersReducedMotion = useReducedMotion();
  const shouldSkipAnimation = prefersReducedMotion || skipAnimation;
  const milestoneStateRef = useRef<LandingEraseMilestones>(
    createMilestonesState(shouldSkipAnimation),
  );
  const [milestones, setMilestones] = useState<LandingEraseMilestones>(() =>
    createMilestonesState(shouldSkipAnimation),
  );
  const [eraseCompleted, setEraseCompleted] = useState(shouldSkipAnimation);
  const [phaseFiveStarted, setPhaseFiveStarted] = useState(shouldSkipAnimation);

  useEffect(() => {
    if (!shouldSkipAnimation) {
      return;
    }

    const completedMilestones = createMilestonesState(true);
    const syncId = window.requestAnimationFrame(() => {
      milestoneStateRef.current = completedMilestones;
      setMilestones(completedMilestones);
      setEraseCompleted(true);
      setPhaseFiveStarted(true);
    });

    return () => {
      window.cancelAnimationFrame(syncId);
    };
  }, [shouldSkipAnimation]);

  const handleEraseProgress = useCallback(
    (progress: number) => {
      if (prefersReducedMotion || shouldSkipAnimation) {
        return;
      }

      const nextMilestones: Partial<LandingEraseMilestones> = {};
      const currentMilestones = milestoneStateRef.current;

      if (
        !currentMilestones.logoRevealStarted &&
        progress >= eraseThresholds.logoRevealStarted
      ) {
        currentMilestones.logoRevealStarted = true;
        nextMilestones.logoRevealStarted = true;
      }

      if (
        !currentMilestones.atelierVisible &&
        progress >= eraseThresholds.atelierVisible
      ) {
        currentMilestones.atelierVisible = true;
        nextMilestones.atelierVisible = true;
      }

      if (
        !currentMilestones.traitVisible &&
        progress >= eraseThresholds.traitVisible
      ) {
        currentMilestones.traitVisible = true;
        nextMilestones.traitVisible = true;
      }

      if (
        !currentMilestones.architectureVisible &&
        progress >= eraseThresholds.architectureVisible
      ) {
        currentMilestones.architectureVisible = true;
        nextMilestones.architectureVisible = true;
      }

      if (Object.keys(nextMilestones).length > 0) {
        setMilestones((currentState) => ({
          ...currentState,
          ...nextMilestones,
        }));
      }
    },
    [eraseThresholds, prefersReducedMotion, shouldSkipAnimation],
  );

  const handleEraseComplete = useCallback(() => {
    setEraseCompleted(true);
  }, []);

  useEffect(() => {
    if (shouldSkipAnimation || !eraseCompleted) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhaseFiveStarted(true);
    }, phaseFiveDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [eraseCompleted, phaseFiveDelayMs, shouldSkipAnimation]);

  useEffect(() => {
    if (shouldSkipAnimation) {
      onIntroComplete();
      return;
    }

    if (!phaseFiveStarted) {
      return;
    }

    const completionDelayMs = (verticalTraitDurationS + namesDurationS) * 1000;
    const timeoutId = window.setTimeout(() => {
      onIntroComplete();
    }, completionDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    namesDurationS,
    onIntroComplete,
    phaseFiveStarted,
    shouldSkipAnimation,
    verticalTraitDurationS,
  ]);

  return {
    architectureVisible: shouldSkipAnimation || milestones.architectureVisible,
    atelierVisible: shouldSkipAnimation || milestones.atelierVisible,
    finalLogoStarted: shouldSkipAnimation || milestones.logoRevealStarted,
    handleEraseComplete,
    handleEraseProgress,
    phaseFiveVisible: shouldSkipAnimation || phaseFiveStarted,
    prefersReducedMotion,
    shadowStarted: !shouldSkipAnimation && milestones.logoRevealStarted,
    traitVisible: shouldSkipAnimation || milestones.traitVisible,
  };
}
