import { useEffect } from "react";

const OVERLAY_SCROLLBARS_VIEWPORT_SELECTOR =
  "[data-overlayscrollbars-viewport]";

function getScrollLockTarget() {
  return (
    document.querySelector<HTMLElement>(OVERLAY_SCROLLBARS_VIEWPORT_SELECTOR) ??
    document.body
  );
}

interface BodyScrollLockOptions {
  // When true, only `overflow: hidden` is applied — NOT `touch-action: none`.
  // Android Chrome honors `touch-action: none` and would disable pinch-zoom for
  // the whole locked subtree (a portal overlay on document.body is included),
  // so the user can't zoom the image; iOS Safari ignores it for zoom, hence the
  // platform split. `overflow: hidden` (on the target + <html>) already prevents
  // background scroll, and the opaque full-screen overlay masks any residual
  // rubber-band, so dropping `touch-action: none` is safe here and restores zoom.
  allowZoom?: boolean;
}

export function useBodyScrollLock(
  isLocked: boolean,
  options: BodyScrollLockOptions = {},
) {
  const { allowZoom = false } = options;

  useEffect(() => {
    if (!isLocked) {
      return undefined;
    }

    const { documentElement } = document;
    const scrollTarget = getScrollLockTarget();
    const shouldLockDocumentElement = scrollTarget === document.body;
    const previousOverflow = scrollTarget.style.overflow;
    const previousTouchAction = scrollTarget.style.touchAction;
    const previousHtmlOverflow = documentElement.style.overflow;

    scrollTarget.style.overflow = "hidden";
    if (!allowZoom) {
      scrollTarget.style.touchAction = "none";
    }

    if (shouldLockDocumentElement) {
      documentElement.style.overflow = "hidden";
    }

    return () => {
      scrollTarget.style.overflow = previousOverflow;
      scrollTarget.style.touchAction = previousTouchAction;

      if (shouldLockDocumentElement) {
        documentElement.style.overflow = previousHtmlOverflow;
      }
    };
  }, [isLocked, allowZoom]);
}
