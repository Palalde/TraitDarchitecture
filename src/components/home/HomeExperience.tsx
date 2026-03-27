import { motion } from "framer-motion";

import { HomeContentShell } from "./content/components/HomeContentShell";
import {
  LandingScreen,
  LANDING_SLIDE_UP_DURATION_S,
} from "./Landing/components/LandingScreen";
import { useLandingLifecycle } from "./Landing/hooks/useLandingLifecycle";
import { Header } from "../ui/header/Header";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

const FORCE_REPLAY_LANDING_ANIMATION = true;

export function HomeExperience() {
  const {
    contentVisible,
    handleIntroComplete,
    handleSlideUpComplete,
    isDismissed,
    isSlidingUp,
    landingCollapsed,
    skipAnimation,
  } = useLandingLifecycle({
    forceReplayAnimation: FORCE_REPLAY_LANDING_ANIMATION,
  });

  useBodyScrollLock(!isDismissed);

  return (
    <main className="flex flex-col bg-(--bg-primary)">
      {isDismissed ? <Header animateEntrance /> : null}
      <motion.div
        className="relative w-full overflow-hidden"
        initial={false}
        animate={{ height: landingCollapsed ? 0 : "100vh" }}
        transition={{ duration: LANDING_SLIDE_UP_DURATION_S, ease: "easeOut" }}
      >
        {!isDismissed ? (
          <LandingScreen
            handleSlideUpComplete={handleSlideUpComplete}
            isSlidingUp={isSlidingUp}
            onIntroComplete={handleIntroComplete}
            skipAnimation={skipAnimation}
          />
        ) : null}
      </motion.div>
      {contentVisible ? <HomeContentShell /> : null}
    </main>
  );
}

export default HomeExperience;
