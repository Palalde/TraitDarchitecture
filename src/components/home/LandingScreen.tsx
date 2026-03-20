import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { T2ALogo } from '../ui/T2ALogo';

export function LandingScreen() {
  const reducedMotion = useReducedMotion();

  // first visit detection state
  const [isFirstVisit] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('t2a-visited');
  });

  // Mark the site as visited on first load
  useEffect(() => {
    if (isFirstVisit) sessionStorage.setItem('t2a-visited', '1');
  }, [isFirstVisit]);

  //dev ! for testing animation
  const shouldAnimate = !reducedMotion && !isFirstVisit;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-(--bg-primary)">
        {/* wrapper */}
      <div
        className="absolute top-1/2 left-1/2 flex items-start"
        style={{ transform: 'translate(calc(var(--landing-center) * -1), -50%)' }}
      >
        {/* logo */}
        <T2ALogo className="w-(--landing-logo) shrink-0 text-(--trait)" animated={shouldAnimate} />
        {/* text columns */}
        <div
          className="flex"
          style={{ marginTop: 'calc(var(--landing-offset) * -1)' }}
        >
            {/* 01 / ATELIER */}
          <div className="w-(--landing-col) flex flex-col items-start">
            <span className="font-light text-(--t2a-blue-light) text-(length:--landing-text) leading-(--landing-leading)">01</span>
            <span className="font-semibold text-(--t2a-blue-dark) text-(length:--landing-text) leading-(--landing-leading)">ATELIER</span>
          </div>
          {/* 02 / TraiT */}
          <div className="w-(--landing-col) flex flex-col items-start">
            <span className="font-light text-(--t2a-blue-light) text-(length:--landing-text) leading-(--landing-leading)">02</span>
            <span className="font-semibold text-(--t2a-blue-dark) text-(length:--landing-text) leading-(--landing-leading)">TraiT</span>
          </div>
          {/* 03 / D'ARCHITECTURE */}
          <div className="w-(--landing-col) flex flex-col items-start">
            <span className="font-light text-(--t2a-blue-light) text-(length:--landing-text) leading-(--landing-leading)">03</span>
            <span className="font-semibold text-(--t2a-blue-dark) text-(length:--landing-text) leading-(--landing-leading)">D'ARCHITECTURE</span>
          </div>
        </div>
        {/* noms */}
        <div
          className="absolute bottom-0 text-center whitespace-nowrap"
          style={{ left: 'var(--landing-center)', transform: 'translateX(-50%)' }}
        >
          <span className="block font-normal text-(--t2a-blue-light) text-(length:--landing-names) leading-none" style={{ transform: 'translateY(0.2em)' }}>
            Théa BATTISTINI & Titouan GRANET
          </span>
        </div>
      </div>
      {/* vertical trait */}
      <div
        className="absolute left-1/2 bottom-0"
        style={{ transform: 'translateX(-50%)', width: '1px', height: '25%', background: 'var(--trait)' }}
      />
    </section>
  );
}
