import type { ReactNode } from "react";

interface HeaderSocialIconProps {
  children: ReactNode;
  href: string;
  label: string;
}

export function HeaderSocialIcon({
  children,
  href,
  label,
}: HeaderSocialIconProps) {
  return (
    <a
      aria-label={label}
      className="inline-flex items-center justify-center transition-transform duration-200 ease-out hover:scale-110"
      href={href}
      rel="noreferrer"
      target="_blank"
      title={label}
      style={{
        height: "calc(var(--header-height) * 0.32)",
        width: "calc(var(--header-height) * 0.32)",
      }}
    >
      {children}
    </a>
  );
}
