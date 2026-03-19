interface T2ALogoProps {
  className?: string;
}

export function T2ALogo({ className }: T2ALogoProps) {
  return (
    <svg
      viewBox="0 0 754 302"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      overflow="visible"
      aria-hidden="true"
      className={className}
    >
      {/* Extension gauche → coin bas-gauche */}
      <path vectorEffect="non-scaling-stroke" d="M -5000 302.36 H 0" />
      {/* Logo */}
      <path vectorEffect="non-scaling-stroke" d="M 0 302.36 H 248.61 V 75.59 H 173.02 V 0 H 399.79 V 226.77 H 324.20 V 302.36 H 550.98 V 226.77 H 475.39 V 0 H 753.73" />
      {/* Extension droite → coin haut-droit */}
      <path vectorEffect="non-scaling-stroke" d="M 753.73 0 H 5753" />
    </svg>
  );
}
