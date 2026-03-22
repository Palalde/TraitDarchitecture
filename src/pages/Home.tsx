import { useState } from 'react';

import { motion } from 'framer-motion';

import { HomeContentShell } from '../components/home/content/components/HomeContentShell';
import { LandingScreen } from '../components/home/Landing/components/LandingScreen';

export default function Home() {
  const [contentVisible, setContentVisible] = useState(false);
  const [landingCollapsed, setLandingCollapsed] = useState(false);

  return (
    <main className="flex flex-col bg-(--bg-primary)">
      <motion.div
        className="relative w-full overflow-hidden"
        initial={false}
        animate={{ height: landingCollapsed ? 0 : '100vh' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <LandingScreen
          onIntroComplete={() => setContentVisible(true)}
          onSlideUpStart={() => setLandingCollapsed(true)}
        />
      </motion.div>
      {contentVisible ? <HomeContentShell /> : null}
    </main>
  );
}

