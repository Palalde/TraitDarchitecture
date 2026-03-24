import { motion } from "framer-motion";

import { HomeContentShell } from "../components/home/content/components/HomeContentShell";
import { LandingScreen } from "../components/home/Landing/components/LandingScreen";
import { useLandingIntroAnimation } from "../components/home/Landing/hooks/useLandingIntroAnimation";
import { Header } from "../components/ui/header/Header";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { Footer } from "@/components/ui/footer/Footer";

const FORCE_ANIMATION = true;
const SHOW_STATIC_END_STATE = true;

export default function Home() {
  const {
    contentVisible,
    handleSlideUpComplete,
    isDismissed,
    isSlidingUp,
    landingCollapsed,
    landingSlideUpDuration,
  } = useLandingIntroAnimation({
    forceAnimate: FORCE_ANIMATION,
    showStaticEndState: SHOW_STATIC_END_STATE,
  });

  useBodyScrollLock(!isDismissed);

  return (
    <main className="flex flex-col bg-(--bg-primary)">
      {isDismissed ? <Header animateEntrance /> : null}
      <motion.div
        className="relative w-full overflow-hidden"
        initial={false}
        animate={{ height: landingCollapsed ? 0 : "100vh" }}
        transition={{ duration: landingSlideUpDuration, ease: "easeOut" }}
      >
        {!isDismissed ? (
          <LandingScreen
            handleSlideUpComplete={handleSlideUpComplete}
            isSlidingUp={isSlidingUp}
            landingSlideUpDuration={landingSlideUpDuration}
          />
        ) : null}
      </motion.div>
      {contentVisible ? (
        <>
          <HomeContentShell />
          <Footer />
        </>
      ) : null}
    </main>
  );
}
