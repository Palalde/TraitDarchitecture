import { motion } from 'framer-motion';

interface T2ALogoProps {
  className?: string;
  animated?: boolean;
  onComplete?: () => void;
  /** Progress callback, receives a value between 0 and 1 */
  onProgress?: (progress: number) => void;
}

const DRAW_DURATION = 3;

export function T2ALogo({ className, animated = false, onComplete, onProgress }: T2ALogoProps) {
  return (
    <svg
      viewBox="0 0 754 302"
      fill="none"
      stroke="currentColor"
      strokeWidth={9}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      overflow="visible"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        vectorEffect="none"
        d="M -2500 302.36 H 248.61 V 75.59 H 173.02 V 0 H 399.79 V 226.77 H 324.20 V 302.36 H 550.98 V 226.77 H 475.39 V 0 H 5000"
        initial={{ pathLength: animated ? 0 : 1 }}
        animate={{ pathLength: 1 }}
        transition={animated ? { duration: DRAW_DURATION, ease: 'linear' } : { duration: 0 }}
        onUpdate={animated && onProgress ? (latest) => onProgress(latest.pathLength as number) : undefined}
        onAnimationComplete={animated ? onComplete : undefined}
      />
    </svg>
  );
}
