import { useEffect, useState } from "react";
import { HeaderExtraitItem } from "./HeaderExtraitItem";
import { HeaderHamburger } from "./HeaderHamburger";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { HeaderSocialIcon } from "./HeaderSocialIcon";
import { HeaderThemeToggle } from "./HeaderThemeToggle";
import { useHeaderAutoHide } from "./hook/useHeaderAutoHide";
import { useHeaderMobileMenu } from "./hook/useHeaderMobileMenu";
import { T2ALogoBrut } from "./logo/T2ALogoBrut";
import { HeaderNavItem } from "./HeaderNavItem";
import { T2ALogoLineRight } from "./logo/T2ALogoLineRight";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useCurrentPathname } from "@/hooks/useCurrentPathname";
import { FacebookLogo, InstagramLogo, LinkedInLogo } from "../social/logo";

// ════════════════════════════════════════════════════════════════════════════
// Right cluster fine-tuning (desktop ≥ md) — Contact · RS (social) · theme toggle
// ----------------------------------------------------------------------------
// These are the ONLY knobs to move/resize that trio. They are applied as INLINE
// STYLES on purpose: the header is `transition:persist`, and a freshly-minted
// Tailwind arbitrary class (e.g. right-[calc(...)] or h-[calc(...)]) can fail to
// re-inject after a View Transition in dev — the element then loses the rule and
// jumps/resizes. Inline styles are owned by React and never desync, so tweak the
// numbers below and the change applies live (no rebuild caveat). Lengths are
// relative to --header-height so the whole cluster scales across breakpoints.
// ════════════════════════════════════════════════════════════════════════════
const HEADER_RIGHT = {
  /** Position of the whole cluster (the RS block) from the right logo. ↑ = further left. */
  clusterRight: "calc(var(--header-height) * 2.22)",
  /** Spacing between the three social icons (RS). */
  socialGap: "calc(var(--header-height) * 0.16)",
  /** Contact ↔ social icons. More negative pulls Contact closer to the RS. */
  contactToSocial: "calc(var(--header-height) * -0.22)",
  /** Social icons ↔ theme toggle. Higher pushes the toggle further right. */
  socialToToggle: "calc(var(--header-height) * 0.05)",
  /** Theme toggle button size (RS icons are 0.32 — this is slightly larger). */
  toggleSize: "calc(var(--header-height) * 0.45)",
} as const;

interface HeaderProps {
  animateEntrance?: boolean;
  pathname: string;
  waitForLanding?: boolean;
}

export function Header({
  animateEntrance = false,
  pathname,
  waitForLanding = false,
}: HeaderProps) {
  const currentPathname = useCurrentPathname(pathname);
  const { closeMobileMenu, isMobileMenuOpen, toggleMobileMenu } =
    useHeaderMobileMenu(currentPathname);
  const { isHeaderVisible, showHeader } = useHeaderAutoHide();
  const reducedMotion = useReducedMotion();
  const headerVisible = isHeaderVisible || isMobileMenuOpen;
  const [hasEnteredFromLanding, setHasEnteredFromLanding] =
    useState(animateEntrance);
  const [isReadyToRender, setIsReadyToRender] = useState(!waitForLanding);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!waitForLanding) {
      return;
    }

    const revealHeader = () => {
      setHasEnteredFromLanding(true);
      setIsReadyToRender(true);
    };

    if (document.body.classList.contains("landing-dismissed")) {
      revealHeader();
      return;
    }

    window.addEventListener("landing:dismissed", revealHeader);

    return () => {
      window.removeEventListener("landing:dismissed", revealHeader);
    };
  }, [waitForLanding]);

  // Enable CSS transitions only after the first paint. When entering from the
  // landing screen, the initial paint is forced to translateY(-100%) with no
  // transition so the next frame can animate the slide-in down to 0.
  useEffect(() => {
    if (!isReadyToRender) return;
    const raf = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(raf);
  }, [isReadyToRender]);

  useEffect(() => {
    if (!isReadyToRender) {
      delete document.body.dataset.t2aHeaderVisible;
      return;
    }

    document.body.dataset.t2aHeaderVisible = headerVisible ? "true" : "false";

    return () => {
      delete document.body.dataset.t2aHeaderVisible;
    };
  }, [headerVisible, isReadyToRender]);

  if (!isReadyToRender) {
    return null;
  }

  const forceOffscreenForEntrance = hasEnteredFromLanding && !isMounted;
  const offscreen = forceOffscreenForEntrance || !headerVisible;
  const transitionActive = isMounted && !reducedMotion;

  return (
    <header
      aria-label="En-tête principal"
      className="t2a-header-persist fixed inset-x-0 top-0 z-50 h-(--header-height) will-change-transform"
      onFocus={showHeader}
      style={{
        transform: offscreen ? "translateY(-100%)" : "translateY(0)",
        transition: transitionActive
          ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)"
          : "none",
      }}
    >
      {/* wrapper */}
      <div className="relative z-10 flex h-full w-full items-start justify-end overflow-x-hidden bg-transparent text-(--t2a-blue)">
        {/* leftLogo */}
        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 sm:pl-4 md:pl-5 lg:pl-6">
          <a
            aria-label="Retour à l'accueil"
            className="inline-flex items-center transition-transform duration-200 ease-out hover:scale-105"
            href="/"
          >
            <T2ALogoBrut
              className="h-[calc(var(--header-height)*0.5)] w-auto text-(--t2a-blue)"
              title="Logo gauche ATELIER TraiT D'ARCHITECTURE"
            />
          </a>
        </div>
        {/* nav */}
        <nav
          aria-label="Navigation principale"
          className="absolute inset-y-0 left-[calc(var(--header-height)*1.2)] z-20 flex items-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-3"
        >
          <HeaderNavItem
            label="ATELIER"
            pathname={currentPathname}
            to="/atelier"
          />
          <HeaderNavItem
            activePath="/trait"
            label="TraiT"
            pathname={currentPathname}
            to="/trait"
          />
          <HeaderNavItem
            label="D'ARCHITECTURE"
            pathname={currentPathname}
            to="/architecture"
          />
        </nav>
        {/* Contact · social (RS) · theme toggle — one right-anchored flex
            cluster. Every position/size below comes from HEADER_RIGHT (top of
            file) via inline styles, so nothing desyncs across the persisted
            header's View Transitions and each knob is tunable live. */}
        <div
          className="absolute inset-y-0 z-20 hidden items-center md:flex"
          style={{
            right: HEADER_RIGHT.clusterRight,
            columnGap: HEADER_RIGHT.socialGap,
          }}
        >
          <HeaderNavItem
            label="Contact"
            pathname={currentPathname}
            style={{ marginRight: HEADER_RIGHT.contactToSocial }}
            to="/contact"
          />
          <HeaderSocialIcon
            href="https://www.instagram.com/atelier.trait.darchitecture/"
            label="Instagram"
          >
            <InstagramLogo className="h-full w-full" />
          </HeaderSocialIcon>
          <HeaderSocialIcon
            href="https://www.facebook.com/profile.php?id=61578637113872#"
            label="Facebook"
          >
            <FacebookLogo className="h-full w-full" />
          </HeaderSocialIcon>
          <HeaderSocialIcon
            href="https://www.linkedin.com/company/atelier-trait-d-architecture/"
            label="LinkedIn"
          >
            <LinkedInLogo className="h-full w-full" />
          </HeaderSocialIcon>
          <HeaderThemeToggle
            size={HEADER_RIGHT.toggleSize}
            style={{ marginLeft: HEADER_RIGHT.socialToToggle }}
          />
        </div>

        {/* rightLogo */}
        <T2ALogoLineRight className="h-full w-auto max-w-none shrink-0 text-(--t2a-blue)" />

        {/* mobile hamburger */}
        <div className="absolute right-2 top-0 z-20 flex md:hidden">
          <HeaderHamburger
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>

        {/* extrait */}
        <div className="absolute -right-3 z-20 hidden top-4 md:flex lg:-right-2">
          <HeaderExtraitItem
            label="EXTraiT"
            pathname={currentPathname}
            to="/extrait"
          />
        </div>
        {/* mobile menu */}
      </div>
      <HeaderMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={currentPathname}
      />
    </header>
  );
}
