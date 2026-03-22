import { useState } from 'react';

import { HomeContentShell } from '../components/home/content/components/HomeContentShell';
import { LandingScreen } from '../components/home/Landing/components/LandingScreen';

export default function Home() {
  const [contentVisible, setContentVisible] = useState(false);

  return (
    <main className="bg-(--bg-primary)">
      <LandingScreen onIntroComplete={() => setContentVisible(true)} />
      {contentVisible ? <HomeContentShell /> : null}
    </main>
  );
}

