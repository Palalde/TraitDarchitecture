import type { ReactNode } from "react";

interface HeaderSocialIconProps {
  children: ReactNode;
  label: string;
}

export function HeaderSocialIcon({ children, label }: HeaderSocialIconProps) {
  return (
    <span
      aria-label={label}
      className="inline-flex items-center justify-center text-(--t2a-blue-dark) transition-transform duration-200 ease-out hover:scale-110"
      role="img"
      style={{ height: "calc(var(--header-height) * 0.32)", width: "calc(var(--header-height) * 0.32)" }}
    >
      {children}
    </span>
  );
}