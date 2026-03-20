import { T2ALogo } from '../ui/T2ALogo';

export function LandingScreen() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-(--bg-primary)">
      {/* Contenair*/}
      <div
        className="absolute top-1/2 left-1/2 flex items-start"
        style={{ transform: 'translate(calc(var(--landing-translate) * -1), -50%)' }}
      >
        {/* Logo */}
        <T2ALogo className="w-(--landing-logo) shrink-0 text-(--trait)" />

        {/* Nums + titres */}
        <div className="flex" style={{ marginTop: 'calc(var(--landing-offset) * -1)' }}>
          <div className="w-(--landing-col) flex flex-col items-start">
            <span className="font-light text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-(length:--landing-text)">01</span>
            <span className="font-semibold text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-(length:--landing-text)">ATELIER</span>
          </div>
          <div className="w-(--landing-col) flex flex-col items-start">
            <span className="font-light text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-(length:--landing-text)">02</span>
            <span className="font-semibold text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-(length:--landing-text)">TraiT</span>
          </div>
          <div className="w-(--landing-col) flex flex-col items-start">
            <span className="font-light text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-(length:--landing-text)">03</span>
            <span className="font-semibold text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-(length:--landing-text) whitespace-nowrap">D'ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
