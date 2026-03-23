import { memo } from "react";

interface T2ALogoLineLeftProps {
  className?: string;
  title?: string;
}

export const T2ALogoLineLeft = memo(function T2ALogoLineLeft({
  className,
  title = "Logo ligne droite ATELIER TraiT D'ARCHITECTURE",
}: T2ALogoLineLeftProps) {
  return (
    <svg
      aria-label={title}
      className={className}
      overflow="visible"
      role="img"
      viewBox="-620 0 1811 57"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m-620.31 50.77h312.39v-37.15h-12.39v-12.38h37.15v37.14h-12.38v12.39h37.14v-12.39h-12.38v-37.14h2939.42"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
      <path
        d="m0.14-111.62h115.25"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
      />
      <path d="m-270.68 1.04v37.21h6.42z" fill="currentColor" opacity="0.36" />
      <path
        d="m-307.93 50.66v-37.22l5.34 6.2z"
        fill="currentColor"
        opacity="0.36"
      />
      <path
        d="m-320.31 13.44v-12.4h37.22v6.2h-33.1v6.2z"
        fill="currentColor"
        opacity="0.36"
      />
      <path
        d="m-253.59 43.36v13.5h-41.9v-6.2h37.27v-12.55z"
        fill="currentColor"
        opacity="0.36"
      />
    </svg>
  );
});
