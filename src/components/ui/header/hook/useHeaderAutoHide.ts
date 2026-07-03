import { useCallback, useEffect, useRef, useState } from "react";

interface UseHeaderAutoHideOptions {
  minDelta?: number;
  topOffset?: number;
}

interface UseHeaderAutoHideResult {
  isHeaderVisible: boolean;
  /** Force the header back on-screen — wire to onFocus so a keyboard user
   *  tabbing into a nav link never lands on an off-canvas (invisible) target. */
  showHeader: () => void;
}

export function useHeaderAutoHide(
  options: UseHeaderAutoHideOptions = {},
): UseHeaderAutoHideResult {
  const { minDelta = 20, topOffset = 0 } = options;
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const downwardDistanceRef = useRef(0);
  const upwardDistanceRef = useRef(0);

  useEffect(() => {
    let rafId = 0;
    let isScheduled = false;

    const processScroll = () => {
      isScheduled = false;
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY <= topOffset) {
        downwardDistanceRef.current = 0;
        upwardDistanceRef.current = 0;
        lastScrollYRef.current = currentScrollY;
        setIsHeaderVisible(true);
        return;
      }

      if (delta > 0) {
        downwardDistanceRef.current += delta;
        upwardDistanceRef.current = 0;

        if (downwardDistanceRef.current >= minDelta) {
          setIsHeaderVisible(false);
        }
      }

      if (delta < 0) {
        upwardDistanceRef.current += Math.abs(delta);
        downwardDistanceRef.current = 0;

        if (upwardDistanceRef.current >= minDelta) {
          setIsHeaderVisible(true);
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleScroll = () => {
      if (isScheduled) return;
      isScheduled = true;
      rafId = requestAnimationFrame(processScroll);
    };

    lastScrollYRef.current = Math.max(window.scrollY, 0);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [minDelta, topOffset]);

  const showHeader = useCallback(() => {
    downwardDistanceRef.current = 0;
    upwardDistanceRef.current = 0;
    lastScrollYRef.current = Math.max(window.scrollY, 0);
    setIsHeaderVisible(true);
  }, []);

  return { isHeaderVisible, showHeader };
}
