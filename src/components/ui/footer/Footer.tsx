import type { ReactNode } from "react";
import { T2ALogoLineLeft } from "./logo/T2ALogoLineLeft";

interface FooterProps {
  children?: ReactNode;
}

export function Footer({ children }: FooterProps) {
  return (
    <footer
      aria-label="Pied de page"
      className="relative flex min-h-36 w-full flex-col overflow-hidden bg-(--gradient-end) lg:min-h-44 lg:flex-row"
    >
      <div className="absolute flex items-start pointer-events-none -left-30 md:-left-48 h-8 md:h-12.5  top-3 lg:top-4 ">
        <T2ALogoLineLeft className="h-full w-auto max-w-none shrink-0 text-(--trait)" />
      </div>
      {children}
    </footer>
  );
}
