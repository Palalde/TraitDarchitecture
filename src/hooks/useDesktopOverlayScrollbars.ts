import { useLayoutEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";
const INITIALIZE_ATTRIBUTE = "data-overlayscrollbars-initialize";

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
