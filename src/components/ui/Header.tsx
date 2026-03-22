import { T2ALogoBrut } from "./T2ALogoBrut";
import { HeaderNavItem } from "./HeaderNavItem.tsx";
import { T2ALogoLineRight } from "./T2ALogoLineRight";

export function Header() {
  return (
    <header
      aria-label="En-tete principal"
      className="fixed inset-x-0 top-0 z-50"
      style={{ height: "var(--header-height)" }}
    >
      {/* wrapper */}
      <div
        className="relative flex h-full w-full items-start justify-end overflow-hidden"
        style={{ backgroundColor: "var(--bg-primary)", color: "var(--trait)" }}
      >
        {/* leftLogo */}
        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 sm:pl-4 md:pl-5 lg:pl-6">
          <T2ALogoBrut
            className="w-auto"
            title="Logo gauche ATELIER TraiT D'ARCHITECTURE"
            style={{
              height: "calc(var(--header-height) * 0.5)",
              color: "var(--t2a-blue)",
            }}
          />
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

        {/* rightLogo */}
        <T2ALogoLineRight
          className="h-full w-auto max-w-none shrink-0"
          style={{ color: "var(--t2a-blue)" }}
        />
      </div>
    </header>
  );
}
