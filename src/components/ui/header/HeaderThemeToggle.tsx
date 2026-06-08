import { useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

import {
  resolveTheme,
  subscribe,
  toggleTheme,
  type Theme,
} from "@/scripts/theme";
import { ThemeToggleIcon } from "./ThemeToggleIcon";

interface HeaderThemeToggleProps {
  className?: string;
  /** Button size (width = height) as a CSS length. Defaults to ~0.42 × header height. */
  size?: string;
  style?: CSSProperties;
}

// SSR / first hydration render must be deterministic. The inline anti-flash
// script has already set the real theme on <html>, so the button icon simply
// catches up right after hydration when the store reports the client value.
function getServerTheme(): Theme {
  return "light";
}

/**
 * Theme toggle button (shared desktop/mobile). The theme is read from the shared
 * store via useSyncExternalStore — the React-recommended way to subscribe to an
 * external system — so there is no setState-in-effect and every instance stays
 * in sync through the `t2a:themechange` event. Click only calls `toggleTheme()`;
 * the resulting event flows back through the store.
 */
export function HeaderThemeToggle({
  className = "",
  size = "calc(var(--header-height) * 0.42)",
  style,
}: HeaderThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, resolveTheme, getServerTheme);
  const isDark = theme === "dark";
  const label = isDark ? "Activer le thème clair" : "Activer le thème sombre";

  return (
    <button
      aria-label={label}
      aria-pressed={isDark}
      className={[
        "group inline-flex cursor-pointer items-center justify-center text-(--t2a-blue) transition-transform duration-200 ease-out hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--trait) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-primary)",
        className,
      ].join(" ")}
      onClick={() => toggleTheme()}
      style={{ width: size, height: size, ...style }}
      title={label}
      type="button"
    >
      <span className="sr-only">{label}</span>
      <ThemeToggleIcon className="h-full w-full" theme={theme} />
    </button>
  );
}
