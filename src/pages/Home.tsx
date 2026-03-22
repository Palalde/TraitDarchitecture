import { AnimatePresence, motion } from "framer-motion";

import { HomeContentShell } from "../components/home/content/components/HomeContentShell";
import { LandingScreen } from "../components/home/Landing/components/LandingScreen";
import { useLandingIntroAnimation } from "../components/home/Landing/hooks/useLandingIntroAnimation";
import { Header } from "../components/ui/header/Header";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

const FORCE_ANIMATION = true;

export default function Home() {
  const {
    colsVisible,
    contentVisible,
    handleLogoComplete,
    handleLogoProgress,
    handleNamesAnimationComplete,
    handleSlideUpComplete,
    handleVerticalTraitComplete,
    isDismissed,
    isSlidingUp,
    landingCollapsed,
    landingSlideUpDuration,
    namesVisible,
    shouldAnimate,
    verticalTraitVisible,
  } = useLandingIntroAnimation({ forceAnimate: FORCE_ANIMATION });

  useBodyScrollLock(!isDismissed);

  return (
    <main className="flex flex-col bg-(--bg-primary)">
      <AnimatePresence initial={false}>
        {isDismissed ? (
          <motion.div
            className="fixed inset-x-0 top-0 z-50"
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            initial={{ y: -24, opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Header fixed={false} />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        className="relative w-full overflow-hidden"
        initial={false}
        animate={{ height: landingCollapsed ? 0 : "100vh" }}
        transition={{ duration: landingSlideUpDuration, ease: "easeOut" }}
      >
        {!isDismissed ? (
          <LandingScreen
            colsVisible={colsVisible}
            handleLogoComplete={handleLogoComplete}
            handleLogoProgress={handleLogoProgress}
            handleNamesAnimationComplete={handleNamesAnimationComplete}
            handleSlideUpComplete={handleSlideUpComplete}
            handleVerticalTraitComplete={handleVerticalTraitComplete}
            isSlidingUp={isSlidingUp}
            landingSlideUpDuration={landingSlideUpDuration}
            namesVisible={namesVisible}
            shouldAnimate={shouldAnimate}
            verticalTraitVisible={verticalTraitVisible}
          />
        ) : null}
      </motion.div>
      {contentVisible ? <HomeContentShell /> : null}
    </main>
  );
}
