export type Theme = "light" | "dark";

// Shared constants — MUST match the anti-flash inline script in BaseLayout.astro.
export const THEME_STORAGE_KEY = "t2a-theme";
const THEME_EVENT = "t2a:themechange";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const THEME_COLORS: Record<Theme, string> = {
  light: "#ffffff",
  dark: "#0d1117",
};

function readStoredTheme(): Theme | null {
  try {
    const stored = sessionStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* sessionStorage unavailable (private mode / blocked storage) */
  }
  return null;
}

function systemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/**
 * Resolve the active theme: an explicit session choice wins, otherwise the OS
 * preference. SSR-safe (islands render on the server before hydration).
 */
export function resolveTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return readStoredTheme() ?? systemTheme();
}

/**
 * Persist an explicit choice and reflect it everywhere the anti-flash script
 * does, then notify subscribers so other islands stay in sync.
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLORS[theme]);

  try {
    sessionStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* sessionStorage unavailable (private mode / blocked storage) */
  }

  window.dispatchEvent(
    new CustomEvent<{ theme: Theme }>(THEME_EVENT, { detail: { theme } }),
  );
}

/** Flip to the opposite theme and return the new value. */
export function toggleTheme(): Theme {
  const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
}

/**
 * Subscribe to theme changes: explicit toggles (via the custom event) and live
 * OS changes while no explicit choice is stored. Returns an unsubscribe fn.
 */
export function subscribe(callback: (theme: Theme) => void): () => void {
  const onThemeEvent = (event: Event) => {
    const detail = (event as CustomEvent<{ theme: Theme }>).detail;
    if (detail?.theme === "light" || detail?.theme === "dark") {
      callback(detail.theme);
    }
  };

  const media = window.matchMedia(DARK_QUERY);
  const onMediaChange = () => {
    if (readStoredTheme()) return;
    callback(systemTheme());
  };

  window.addEventListener(THEME_EVENT, onThemeEvent);
  media.addEventListener("change", onMediaChange);

  return () => {
    window.removeEventListener(THEME_EVENT, onThemeEvent);
    media.removeEventListener("change", onMediaChange);
  };
}
