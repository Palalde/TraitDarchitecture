import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HeaderExtraitItem } from "./HeaderExtraitItem";
import { HeaderHamburger } from "./HeaderHamburger";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { HeaderSocialIcon } from "./HeaderSocialIcon.tsx";
import { FacebookLogo } from "./logo/FacebookLogo.tsx";
import { InstagramLogo } from "./logo/InstagramLogo.tsx";
import { LinkedInLogo } from "./logo/LinkedInLogo.tsx";
import { T2ALogoBrut } from "./logo/T2ALogoBrut.tsx";
import { HeaderNavItem } from "./HeaderNavItem.tsx";
import { T2ALogoLineRight } from "./logo/T2ALogoLineRight.tsx";

export function Header() {
  const { pathname } = useLocation();
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const isMobileMenuOpen = mobileMenuPath === pathname;
  const PincipalColor = "var(--t2a-blue)";

  return (
    <header
      aria-label="En-tete principal"
      className="fixed inset-x-0 top-0 z-50"
      style={{ height: "var(--header-height)" }}
    >
      {/* wrapper */}
      <div
        className="relative flex h-full w-full items-start justify-end overflow-hidden"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: PincipalColor,
        }}
      >
        {/* leftLogo */}
        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 sm:pl-4 md:pl-5 lg:pl-6">
          <Link
            aria-label="Retour a l'accueil"
            className="inline-flex items-center transition-transform duration-200 ease-out hover:scale-105"
            to="/"
          >
            <T2ALogoBrut
              className="w-auto"
              title="Logo gauche ATELIER TraiT D'ARCHITECTURE"
              style={{
                height: "calc(var(--header-height) * 0.5)",
                color: PincipalColor,
              }}
            />
          </Link>
        </div>
        {/* nav */}
        <nav
          aria-label="Navigation principale"
          className="absolute inset-y-0 left-[calc(var(--header-height)*1.2)] z-20 flex items-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-3"
        >
          <HeaderNavItem label="ATELIER" to="/atelier" />
          <HeaderNavItem label="TraiT" to="/trait/philosophie" />
          <HeaderNavItem label="D'ARCHITECTURE" to="/architecture" />
        </nav>
        {/* contact */}
        <div className="absolute inset-y-0 right-[calc(var(--header-height)*4)] z-20 hidden items-center md:flex">
          <HeaderNavItem label="Contact" to="/contact" />
        </div>
        {/* social */}
        <div className="absolute inset-y-0 right-[calc(var(--header-height)*2.5)] z-20 hidden items-center gap-2 md:flex lg:gap-2.5">
          <HeaderSocialIcon
            href="https://www.instagram.com/atelier.trait.darchitecture/"
            label="Instagram"
          >
            <InstagramLogo
              className="h-full w-full"
              style={{ color: PincipalColor }}
            />
          </HeaderSocialIcon>
          <HeaderSocialIcon
            href="https://www.facebook.com/profile.php?id=61578637113872#"
            label="Facebook"
          >
            <FacebookLogo
              className="h-full w-full"
              style={{ color: PincipalColor }}
            />
          </HeaderSocialIcon>
          <HeaderSocialIcon
            href="https://www.linkedin.com/company/atelier-trait-d-architecture/"
            label="LinkedIn"
          >
            <LinkedInLogo
              className="h-full w-full"
              style={{ color: PincipalColor }}
            />
          </HeaderSocialIcon>
        </div>

        {/* rightLogo */}
        <T2ALogoLineRight
          className="h-full w-auto max-w-none shrink-0"
          style={{ color: PincipalColor }}
        />

        {/* mobile hamburger */}
        <div className="absolute right-2 top-0 z-20 flex md:hidden lg:-right-2">
          <HeaderHamburger
            isOpen={isMobileMenuOpen}
            onClick={() =>
              setMobileMenuPath((previousPath) =>
                previousPath === pathname ? null : pathname,
              )
            }
          />
        </div>

        {/* extrait */}
        <div className="absolute -right-3 z-20 hidden top-4 md:flex lg:-right-2">
          <HeaderExtraitItem label="EXTraiT" to="/extrait" />
        </div>
        {/* mobile menu */}
      </div>
      <HeaderMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuPath(null)}
      />
    </header>
  );
}
