import { useEffect } from "react";

const OVERLAY_SCROLLBARS_VIEWPORT_SELECTOR =
  "[data-overlayscrollbars-viewport]";

function getScrollLockTarget() {
  return (
    document.querySelector<HTMLElement>(OVERLAY_SCROLLBARS_VIEWPORT_SELECTOR) ??
    document.body
  );
}

export function useBodyScrollLock(isLocked: boolean) {
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
    scrollTarget.style.touchAction = "none";

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
  }, [isLocked]);
}
