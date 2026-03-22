import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface UseHeaderMobileMenuResult {
  closeMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export function useHeaderMobileMenu(): UseHeaderMobileMenuResult {
  const { pathname } = useLocation();
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const isMobileMenuOpen = mobileMenuPath === pathname;

  //Close the mobile menu when the user scrolls
  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const handleScroll = () => {
      setMobileMenuPath(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  // Close the mobile menu when the route changes
  const closeMobileMenu = () => {
    setMobileMenuPath(null);
  };

  // Toggle the mobile menu open/closed based on the current path
  const toggleMobileMenu = () => {
    setMobileMenuPath((previousPath) =>
      previousPath === pathname ? null : pathname,
    );
  };

  return {
    closeMobileMenu,
    isMobileMenuOpen,
    toggleMobileMenu,
  };
}
