import { T2ALogo } from '../ui/T2ALogo';

export function LandingScreen() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-(--bg-primary)">
      <T2ALogo className="absolute top-1/2 left-[20%] w-[14vw] text-(--trait)" />
    </section>
  );
}
