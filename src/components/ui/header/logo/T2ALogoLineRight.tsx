import { memo } from "react";

interface T2ALogoLineRightProps {
  className?: string;
  title?: string;
}

export const T2ALogoLineRight = memo(function T2ALogoLineRight({
  className,
  title = "Logo ligne droite ATELIER TraiT D'ARCHITECTURE",
}: T2ALogoLineRightProps) {
  return (
    <svg
      aria-label={title}
      className={className}
      role="img"
      viewBox="0 0 1811 57"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m-0.31 50.77h1697.64v-37.15h-12.39v-12.38h37.15v37.14h-12.38v12.39h37.14v-12.39h-12.38v-37.14h84.46"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
      <path
        d="m-0.31 50.77h1697.64v-37.15h-12.39v-12.38h37.15v37.14h-12.38v12.39h37.14v-12.39h-12.38v-37.14h84.46l-7.93-1.24h-1811z"
        fill="var(--bg-primary)"
      />
      <path d="m1734.57 1.04v37.21h6.42z" fill="currentColor" opacity="0.36" />
      <path
        d="m1697.32 50.66v-37.22l5.34 6.2z"
        fill="currentColor"
        opacity="0.36"
      />
      <path
        d="m1684.94 13.44v-12.4h37.22v6.2h-33.1v6.2z"
        fill="currentColor"
        opacity="0.36"
      />
      <path
        d="m1751.66 43.36v13.5h-41.9v-6.2h37.27v-12.55z"
        fill="currentColor"
        opacity="0.36"
      />
    </svg>
  );
});
