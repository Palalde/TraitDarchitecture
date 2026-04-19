import { useLayoutEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

const DESKTOP_MEDIA_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const INITIALIZE_ATTRIBUTE = "data-overlayscrollbars-initialize";

let overlayScrollbarsStylesPromise: Promise<unknown> | null = null;
function loadOverlayScrollbarsStyles() {
  // Dynamic import: the CSS chunk is only fetched when the hook matches
  // the desktop-pointer gate.
  if (!overlayScrollbarsStylesPromise) {
    overlayScrollbarsStylesPromise =
      import("overlayscrollbars/styles/overlayscrollbars.css");
  }
  return overlayScrollbarsStylesPromise;
}

const overlayScrollbarsOptions = {
  overflow: {
    x: "hidden" as const,
    y: "scroll" as const,
  },
  scrollbars: {
    theme: "os-theme-t2a",
    visibility: "auto" as const,
    autoHide: "move" as const,
    autoHideDelay: 400,
    autoHideSuspend: false,
    dragScroll: true,
    clickScroll: false as const,
  },
};

function setInitializeAttributes() {
  document.documentElement.setAttribute(INITIALIZE_ATTRIBUTE, "");
  document.body.setAttribute(INITIALIZE_ATTRIBUTE, "");
}

function clearInitializeAttributes() {
  document.documentElement.removeAttribute(INITIALIZE_ATTRIBUTE);
  document.body.removeAttribute(INITIALIZE_ATTRIBUTE);
}

export function useDesktopOverlayScrollbars() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    let instance: ReturnType<typeof OverlayScrollbars> | null = null;

    const destroy = () => {
      instance?.destroy();
      instance = null;
      clearInitializeAttributes();
    };

    const initialize = () => {
      if (!mediaQuery.matches || instance) {
        return;
      }

      setInitializeAttributes();
      // Kick off CSS fetch in parallel (idempotent + cached).
      void loadOverlayScrollbarsStyles();
      instance = OverlayScrollbars(
        {
          target: document.body,
          cancel: {
            body: false,
          },
        },
        overlayScrollbarsOptions,
      );
      clearInitializeAttributes();
    };

    const sync = () => {
      if (mediaQuery.matches) {
        initialize();
        return;
      }

      destroy();
    };

    sync();

    const handleChange = () => {
      sync();
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }

      destroy();
    };
  }, []);
}
