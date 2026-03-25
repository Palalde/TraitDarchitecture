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
  verticalTraitDurationS,
}: UseLandingScreenAnimationOptions) {
  const prefersReducedMotion = useReducedMotion();
  const milestoneStateRef = useRef<LandingEraseMilestones>(
    createMilestonesState(prefersReducedMotion),
  );
  const [milestones, setMilestones] = useState<LandingEraseMilestones>(() =>
    createMilestonesState(prefersReducedMotion),
  );
  const [eraseCompleted, setEraseCompleted] = useState(prefersReducedMotion);
  const [phaseFiveStarted, setPhaseFiveStarted] =
    useState(prefersReducedMotion);

  const handleEraseProgress = useCallback(
    (progress: number) => {
      if (prefersReducedMotion) {
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
    [eraseThresholds, prefersReducedMotion],
  );

  const handleEraseComplete = useCallback(() => {
    setEraseCompleted(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !eraseCompleted) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhaseFiveStarted(true);
    }, phaseFiveDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [eraseCompleted, phaseFiveDelayMs, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
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
    prefersReducedMotion,
    verticalTraitDurationS,
  ]);

  return {
    architectureVisible: prefersReducedMotion || milestones.architectureVisible,
    atelierVisible: prefersReducedMotion || milestones.atelierVisible,
    finalLogoStarted: prefersReducedMotion || milestones.logoRevealStarted,
    handleEraseComplete,
    handleEraseProgress,
    phaseFiveVisible: prefersReducedMotion || phaseFiveStarted,
    prefersReducedMotion,
    shadowStarted: !prefersReducedMotion && milestones.logoRevealStarted,
    traitVisible: prefersReducedMotion || milestones.traitVisible,
  };
}
