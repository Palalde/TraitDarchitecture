import { T2ALogo } from '../ui/T2ALogo';

export function LandingScreen() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-(--bg-primary)">
      {/* Conteneur unique centré — logo + titres alignés ensemble */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-start">
        {/* Logo à gauche */}
        <T2ALogo className="w-[14vw] shrink-0 text-(--trait)" />

        {/* Numéros + titres — décalé vers le haut d'1 ligne pour que numéros soient au-dessus de la ligne */}
        <div className="flex -mt-[2.8vw]">
          <div className="w-[8vw] flex flex-col items-start">
            <span className="font-light text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-[clamp(5px,2vw,25px)]">01</span>
            <span className="font-semibold text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-[clamp(5px,2vw,25px)] tracking-wider">ATELIER</span>
          </div>
          <div className="w-[8vw] flex flex-col items-start">
            <span className="font-light text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-[clamp(5px,2vw,25px)]">02</span>
            <span className="font-semibold text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-[clamp(5px,2vw,25px)] tracking-wider">TraiT</span>
          </div>
          <div className="w-[8vw] flex flex-col items-start">
            <span className="font-light text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-[clamp(5px,2vw,25px)]">03</span>
            <span className="font-semibold text-(--t2a-blue-dark) dark:text-(--t2a-blue-light) text-[clamp(5px,2vw,25px)] tracking-wider">D'ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
