import { HomeContentShell } from '../components/home/content/components/HomeContentShell';
import { LandingScreen } from '../components/home/Landing/components/LandingScreen';

export default function Home() {
  return (
    <main className="bg-(--bg-primary)">
      <LandingScreen />
      <HomeContentShell />
    </main>
  );
}

