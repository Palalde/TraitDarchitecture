import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { isPathActive } from "@/hooks/useCurrentPathname";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeaderSocialIcon } from "./HeaderSocialIcon";
import { FacebookLogo, InstagramLogo, LinkedInLogo } from "../social/logo";

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

interface MobileMenuLinkProps {
  isActive: boolean;
  isEmphasized?: boolean;
  label: string;
  onClick: () => void;
  to: string;
}

function MobileMenuLink({
  isActive,
  isEmphasized = false,
  label,
  onClick,
  to,
}: MobileMenuLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={[
        "group inline-flex items-center justify-center whitespace-nowrap text-center tracking-[0.08em] transition-colors duration-200 ease-out",
        isEmphasized
          ? "text-xl font-semibold text-(--t2a-blue)"
          : "text-lg font-normal text-(--t2a-blue)",
        isActive ? "text-(--t2a-blue)" : "hover:text-(--t2a-blue)",
      ].join(" ")}
      href={to}
      onClick={onClick}
    >
      {isEmphasized ? (
        <span className="inline-block origin-center scale-y-150 transition-transform duration-200 ease-out group-hover:scale-105">
          {label}
        </span>
      ) : (
        <span className="transition-transform duration-200 ease-out group-hover:scale-105">
          {label}
        </span>
      )}
    </a>
  );
}

export function HeaderMobileMenu({
  isOpen,
  onClose,
  pathname,
}: HeaderMobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const navigationRef = useRef<HTMLElement | null>(null);
  // Keep the menu mounted during its exit transition so we can fade/slide out.
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const EXIT_MS = prefersReducedMotion ? 0 : 280;

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Next frame so the "hidden" styles render first, then transition runs.
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    setIsVisible(false);
    if (!shouldRender) return;
    const timer = window.setTimeout(() => setShouldRender(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen, shouldRender, EXIT_MS]);

  // Force-unmount the menu synchronously before Astro's View Transition
  // captures the old snapshot. Otherwise the menu's 280ms exit animation
  // leaves it visible during the snapshot, freezing it full-screen over
  // the reveal on the next page.
  useEffect(() => {
    const forceClose = () => {
      flushSync(() => {
        setIsVisible(false);
        setShouldRender(false);
      });
    };
    document.addEventListener("astro:before-preparation", forceClose);
    return () =>
      document.removeEventListener("astro:before-preparation", forceClose);
  }, []);

  useBodyScrollLock(isOpen);
  useFocusTrap(navigationRef, isOpen && isVisible);

  if (!shouldRender) {
    return null;
  }

  const transitionStyle = prefersReducedMotion
    ? { transition: "none" }
    : {
        transition:
          "opacity 280ms cubic-bezier(0.22, 1, 0.36, 1), transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
      };

  return (
    <>
      <button
        aria-label="Fermer le menu mobile"
        className="fixed inset-x-0 bottom-0 top-(--header-height) bg-(--bg-primary)/20 backdrop-blur-sm md:hidden"
        onClick={onClose}
        style={{
          opacity: isVisible ? 1 : 0,
          ...transitionStyle,
        }}
        type="button"
      />
      <div
        className="absolute inset-x-0 top-full z-0 border-b border-(--trait) md:hidden"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: prefersReducedMotion
            ? "translateY(0)"
            : isVisible
              ? "translateY(0)"
              : "translateY(-16px)",
          ...transitionStyle,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 top-[calc(var(--header-height)*-1)] bg-(--bg-primary)"
        />
        <nav
          aria-label="Menu mobile"
          className="relative z-10 px-6 pb-6 pt-5"
          ref={navigationRef}
          tabIndex={-1}
        >
          <div className="flex flex-col items-center gap-5">
            <MobileMenuLink
              isActive={isPathActive(pathname, "/contact")}
              label="Contact"
              onClick={onClose}
              to="/contact"
            />
            <div
              aria-hidden="true"
              className="h-px w-full max-w-40 bg-(--trait) opacity-80"
            />
            <MobileMenuLink
              isActive={isPathActive(pathname, "/extrait")}
              isEmphasized
              label="EXTraiT"
              onClick={onClose}
              to="/extrait"
            />
          </div>
          <div className="mt-6 flex items-center justify-center gap-5 border-t border-(--trait) pt-5">
            <HeaderSocialIcon
              className="h-[calc(var(--header-height)*0.85)] w-[calc(var(--header-height)*0.85)] [&>svg]:h-full [&>svg]:w-full"
              href="https://www.instagram.com/atelier.trait.darchitecture/"
              label="Instagram"
              onClick={onClose}
            >
              <InstagramLogo className="h-full w-full text-(--t2a-blue)" />
            </HeaderSocialIcon>
            <HeaderSocialIcon
              className="h-[calc(var(--header-height)*0.85)] w-[calc(var(--header-height)*0.85)] [&>svg]:h-full [&>svg]:w-full"
              href="https://www.facebook.com/profile.php?id=61578637113872#"
              label="Facebook"
              onClick={onClose}
            >
              <FacebookLogo className="h-full w-full text-(--t2a-blue)" />
            </HeaderSocialIcon>
            <HeaderSocialIcon
              className="h-[calc(var(--header-height)*0.85)] w-[calc(var(--header-height)*0.85)] [&>svg]:h-full [&>svg]:w-full"
              href="https://www.linkedin.com/company/atelier-trait-d-architecture/"
              label="LinkedIn"
              onClick={onClose}
            >
              <LinkedInLogo className="h-full w-full text-(--t2a-blue)" />
            </HeaderSocialIcon>
          </div>
        </nav>
      </div>
    </>
  );
}
