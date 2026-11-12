import { useLayoutEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

const DESKTOP_MEDIA_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
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

interface CssAnimationSnapshot {
  target: Element;
  pseudoElement: string | null;
  animationName: string;
  currentTime: CSSNumberish | null;
}

function getCssAnimationKey(animation: Animation) {
  if (!(animation instanceof CSSAnimation)) return null;

  const effect = animation.effect;
  if (!(effect instanceof KeyframeEffect) || !effect.target) return null;

  return {
    target: effect.target,
    pseudoElement: effect.pseudoElement,
    animationName: animation.animationName,
  };
}

// On init/destroy OverlayScrollbars re-appends every child of <body>, and a
// re-inserted node restarts its CSS animations: already played reveals would
// replay. Carry each animation's progress over to its re-created instance.
function preserveCssAnimations(moveDom: () => void) {
  if (typeof document.getAnimations !== "function") {
    moveDom();
    return;
  }

  const snapshots: CssAnimationSnapshot[] = [];
  for (const animation of document.getAnimations()) {
    const key = getCssAnimationKey(animation);
    if (key) snapshots.push({ ...key, currentTime: animation.currentTime });
  }

  moveDom();

  if (snapshots.length === 0) return;

  for (const animation of document.getAnimations()) {
    const key = getCssAnimationKey(animation);
    if (!key) continue;

    const snapshot = snapshots.find(
      (candidate) =>
        candidate.target === key.target &&
        candidate.pseudoElement === key.pseudoElement &&
        candidate.animationName === key.animationName,
    );

    if (snapshot && snapshot.currentTime !== null) {
      animation.currentTime = snapshot.currentTime;
    }
  }
}

export function useDesktopOverlayScrollbars() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    let instance: ReturnType<typeof OverlayScrollbars> | null = null;

    const destroy = () => {
      const currentInstance = instance;
      if (currentInstance) {
        preserveCssAnimations(() => currentInstance.destroy());
      }
      instance = null;
      clearInitializeAttributes();
    };

    const initialize = () => {
      if (!mediaQuery.matches || instance) {
        return;
      }

      setInitializeAttributes();
      preserveCssAnimations(() => {
        instance = OverlayScrollbars(
          {
            target: document.body,
            cancel: {
              body: false,
            },
          },
          overlayScrollbarsOptions,
        );
      });
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
