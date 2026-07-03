interface HeaderHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
  label?: string;
}

/** Must match the `id` on the `<nav>` rendered by HeaderMobileMenu. */
export const HEADER_MOBILE_NAV_ID = "header-mobile-nav";

export function HeaderHamburger({
  isOpen,
  onClick,
  label = "Ouvrir le menu mobile",
}: HeaderHamburgerProps) {
  return (
    <button
      aria-controls={HEADER_MOBILE_NAV_ID}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Fermer le menu mobile" : label}
      className="group relative inline-flex h-[calc(var(--header-height)*0.72)] w-[calc(var(--header-height)*0.72)] items-center justify-center text-(--t2a-blue-dark) transition-colors duration-200 ease-out hover:text-(--text-primary) focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--trait) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-primary)"
      onClick={onClick}
      type="button"
      title={isOpen ? "Fermer le menu mobile" : label}
    >
      <span className="sr-only">
        {isOpen ? "Fermer le menu mobile" : label}
      </span>
      <span aria-hidden="true" className="relative block h-5 w-7">
        <span
          className={[
            "absolute left-0 top-1/2 h-px w-7 origin-center bg-current transition-transform duration-300 ease-out",
            isOpen ? "translate-y-0 rotate-45" : "-translate-y-1.75 rotate-0",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-0 top-1/2 h-px w-7 origin-center bg-current transition-all duration-300 ease-out",
            isOpen
              ? "translate-y-0 scale-x-0 opacity-0"
              : "translate-y-0 scale-x-100 opacity-100",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-0 top-1/2 h-px w-7 origin-center bg-current transition-transform duration-300 ease-out",
            isOpen ? "translate-y-0 -rotate-45" : "translate-y-1.75 rotate-0",
          ].join(" ")}
        />
      </span>
    </button>
  );
}
