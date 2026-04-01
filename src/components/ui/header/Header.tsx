import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HeaderExtraitItem } from "./HeaderExtraitItem";
import { HeaderHamburger } from "./HeaderHamburger";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { HeaderSocialIcon } from "./HeaderSocialIcon";
import { useHeaderAutoHide } from "./hook/useHeaderAutoHide";
import { useHeaderMobileMenu } from "./hook/useHeaderMobileMenu";
import { T2ALogoBrut } from "./logo/T2ALogoBrut";
import { HeaderNavItem } from "./HeaderNavItem";
import { T2ALogoLineRight } from "./logo/T2ALogoLineRight";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useCurrentPathname } from "@/hooks/useCurrentPathname";
import { FacebookLogo, InstagramLogo, LinkedInLogo } from "../social/logo";

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
  const { isHeaderVisible } = useHeaderAutoHide();
  const reducedMotion = useReducedMotion();
  const headerVisible = isHeaderVisible || isMobileMenuOpen;
  const [hasEnteredFromLanding, setHasEnteredFromLanding] =
    useState(animateEntrance);
  const [isReadyToRender, setIsReadyToRender] = useState(!waitForLanding);

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

  if (!isReadyToRender) {
    return null;
  }

  return (
    <motion.header
      aria-label="En-tête principal"
      animate={{ y: headerVisible ? 0 : "-100%" }}
      className="fixed inset-x-0 top-0 z-50 h-(--header-height)"
      initial={hasEnteredFromLanding ? { y: "-100%" } : false}
      transition={{
        duration: reducedMotion ? 0 : 0.42,
        ease: [0.22, 1, 0.36, 1],
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
            to="/trait/philosophie"
          />
          <HeaderNavItem
            label="D'ARCHITECTURE"
            pathname={currentPathname}
            to="/architecture"
          />
        </nav>
        {/* contact */}
        <div className="absolute inset-y-0 right-[calc(var(--header-height)*4)] z-20 hidden items-center md:flex">
          <HeaderNavItem
            label="Contact"
            pathname={currentPathname}
            to="/contact"
          />
        </div>
        {/* social */}
        <div className="absolute inset-y-0 right-[calc(var(--header-height)*2.5)] z-20 hidden items-center gap-2 md:flex lg:gap-2.5">
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
    </motion.header>
  );
}
