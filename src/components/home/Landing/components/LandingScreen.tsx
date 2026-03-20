import { motion } from 'framer-motion';
import { useLandingIntroAnimation } from '../hooks/useLandingIntroAnimation';
import { T2ALogo } from './T2ALogo';

interface LandingColumn {
  index: string;
  label: string;
}

const FORCE_ANIMATION = true;
const COLUMN_INDEX_TRANSITION = { duration: 0.24, ease: 'easeOut' } as const;
const COLUMN_LABEL_MASK_TRANSITION = { duration: 0.38, ease: 'easeOut' } as const;
const COLUMN_LABEL_TEXT_TRANSITION = { duration: 0.42, ease: 'easeOut' } as const;
const LANDING_COLUMNS: readonly LandingColumn[] = [
  { index: '01', label: 'ATELIER' },
  { index: '02', label: 'TraiT' },
  { index: '03', label: "D'ARCHITECTURE" },
] as const;

export function LandingScreen() {
  const {
    colsVisible,
    handleLogoComplete,
    handleLogoProgress,
    shouldAnimate,
    verticalTraitVisible,
  } = useLandingIntroAnimation({ forceAnimate: FORCE_ANIMATION });

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
          onComplete={handleLogoComplete}
          onProgress={handleLogoProgress}
        />
        {/* text columns */}
        <div
          className="flex"
          style={{ marginTop: 'calc(var(--landing-offset) * -1)' }}
        >
          {LANDING_COLUMNS.map((column, index) => (
            <div
              key={column.index}
              className="w-(--landing-col) flex flex-col items-start"
            >
              <motion.span
                className="font-light text-(--t2a-blue-light) text-(length:--landing-text) leading-(--landing-leading)"
                initial={false}
                animate={{ opacity: colsVisible[index] ? 1 : 0, y: colsVisible[index] ? 0 : 4 }}
                transition={COLUMN_INDEX_TRANSITION}
              >
                {column.index}
              </motion.span>
              <motion.span
                className="block overflow-hidden whitespace-nowrap"
                initial={false}
                animate={{ clipPath: colsVisible[index] ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)' }}
                transition={COLUMN_LABEL_MASK_TRANSITION}
              >
                <motion.span
                  className="block font-semibold text-(--t2a-blue-dark) text-(length:--landing-text) leading-(--landing-leading)"
                  initial={false}
                  animate={{ opacity: colsVisible[index] ? 1 : 0, y: colsVisible[index] ? 0 : -12 }}
                  transition={COLUMN_LABEL_TEXT_TRANSITION}
                >
                  {column.label}
                </motion.span>
              </motion.span>
            </div>
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
        style={{ transform: 'translateX(-50%)', width: '1px', height: '25%' }}
      >
        <motion.div
          className="h-full w-full bg-(--trait)"
          initial={false}
          animate={{ scaleY: verticalTraitVisible ? 1 : 0 }}
          transition={{ duration: 0.48, ease: 'easeOut' }}
          style={{ transformOrigin: 'bottom center' }}
        />
      </div>
    </section>
  );
}
