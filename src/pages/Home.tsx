import { motion } from 'framer-motion';

import { HomeContentShell } from '../components/home/content/components/HomeContentShell';
import { LandingScreen } from '../components/home/Landing/components/LandingScreen';
import { useLandingIntroAnimation } from '../components/home/Landing/hooks/useLandingIntroAnimation';

const FORCE_ANIMATION = true;

export default function Home() {
  const {
    colsVisible,
    contentVisible,
    handleLogoComplete,
    handleLogoProgress,
    handleNamesAnimationComplete,
    handleVerticalTraitComplete,
    isSlidingUp,
    landingCollapsed,
    landingSlideUpDuration,
    namesVisible,
    shouldAnimate,
    verticalTraitVisible,
  } = useLandingIntroAnimation({ forceAnimate: FORCE_ANIMATION });

  return (
    <main className="flex flex-col bg-(--bg-primary)">
      <motion.div
        className="relative w-full overflow-hidden"
        initial={false}
        animate={{ height: landingCollapsed ? 0 : '100vh' }}
        transition={{ duration: landingSlideUpDuration, ease: 'easeOut' }}
      >
        <LandingScreen
          colsVisible={colsVisible}
          handleLogoComplete={handleLogoComplete}
          handleLogoProgress={handleLogoProgress}
          handleNamesAnimationComplete={handleNamesAnimationComplete}
          handleVerticalTraitComplete={handleVerticalTraitComplete}
          isSlidingUp={isSlidingUp}
          landingSlideUpDuration={landingSlideUpDuration}
          namesVisible={namesVisible}
          shouldAnimate={shouldAnimate}
          verticalTraitVisible={verticalTraitVisible}
        />
      </motion.div>
      {contentVisible ? <HomeContentShell /> : null}
    </main>
  );
}

