import { useId } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Theme } from "@/scripts/theme";

interface ThemeToggleIconProps {
  theme: Theme;
  className?: string;
}

// 8 straight-cap rays around the sun disk (consistent with the 1px "trait").
const SUN_RAYS: ReadonlyArray<readonly [number, number, number, number]> = [
  [12, 1, 12, 3],
  [12, 21, 12, 23],
  [4.22, 4.22, 5.64, 5.64],
  [18.36, 18.36, 19.78, 19.78],
  [1, 12, 3, 12],
  [21, 12, 23, 12],
  [4.22, 19.78, 5.64, 18.36],
  [18.36, 5.64, 19.78, 4.22],
];

/**
 * Pure CSS/SVG sun ↔ moon morph (no Framer Motion). The crescent is carved by a
 * masked circle that slides across the disk while the rays retract and fade.
 * Honors prefers-reduced-motion with an instant swap.
 */
export function ThemeToggleIcon({
  theme,
  className = "h-5 w-5",
}: ThemeToggleIconProps) {
  const maskId = useId();
  const reducedMotion = useReducedMotion();
  const isDark = theme === "dark";

  const morph = reducedMotion ? "none" : "transform 250ms ease-out";
  const fade = reducedMotion
    ? "none"
    : "transform 250ms ease-out, opacity 250ms ease-out";

  return (
    <svg
      aria-hidden="true"
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id={maskId}>
        <rect fill="white" height="24" width="24" x="0" y="0" />
        <circle
          cx="12"
          cy="12"
          fill="black"
          r="5"
          style={{
            transform: isDark
              ? "translate(3px, -3px)"
              : "translate(14px, -14px)",
            transition: morph,
          }}
        />
      </mask>

      <circle
        cx="12"
        cy="12"
        fill="currentColor"
        mask={`url(#${maskId})`}
        r="5"
      />

      <g
        stroke="currentColor"
        strokeLinecap="butt"
        strokeWidth="1.5"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark
            ? "scale(0.5) rotate(-25deg)"
            : "scale(1) rotate(0deg)",
          transformBox: "fill-box",
          transformOrigin: "center",
          transition: fade,
        }}
      >
        {SUN_RAYS.map(([x1, y1, x2, y2]) => (
          <line key={`${x1}-${y1}`} x1={x1} x2={x2} y1={y1} y2={y2} />
        ))}
      </g>
    </svg>
  );
}
