import { motion } from 'framer-motion';
import { LANDING_COLUMNS } from '../constants/landingIntro.constants';
import { useLandingIntroAnimation } from '../hooks/useLandingIntroAnimation';
import { T2ALogo } from './T2ALogo';

const FORCE_ANIMATION = true;
const COLUMN_REVEAL_TRANSITION = { duration: 0.4, ease: 'easeOut' } as const;

export function LandingScreen() {
  const { colsVisible, handleLogoProgress, shouldAnimate } =
    useLandingIntroAnimation({ forceAnimate: FORCE_ANIMATION });

  return (
    <section className="relative h-screen w-full overflow-hidden bg-(--bg-primary)">
        {/* wrapper */}
      <div
        className="absolute top-1/2 left-1/2 flex items-start"
        style={{ transform: 'translate(calc(var(--landing-center) * -1), -50%)' }}
      >
        {/* logo */}
        <T2ALogo
          className="w-(--landing-logo) shrink-0 text-(--trait)"
          animated={shouldAnimate}
          onProgress={handleLogoProgress}
        />
        {/* text columns */}
        <div
          className="flex"
          style={{ marginTop: 'calc(var(--landing-offset) * -1)' }}
        >
          {LANDING_COLUMNS.map((column, index) => (
            <motion.div
              key={column.index}
              className="w-(--landing-col) flex flex-col items-start"
              initial={false}
              animate={{ opacity: colsVisible[index] ? 1 : 0 }}
              transition={COLUMN_REVEAL_TRANSITION}
            >
              <span className="font-light text-(--t2a-blue-light) text-(length:--landing-text) leading-(--landing-leading)">
                {column.index}
              </span>
              <span className="font-semibold text-(--t2a-blue-dark) text-(length:--landing-text) leading-(--landing-leading)">
                {column.label}
              </span>
            </motion.div>
          ))}
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
