import type { ReactNode } from "react";

interface HeaderSocialIconProps {
  children: ReactNode;
  className?: string;
  href: string;
  label: string;
  onClick?: () => void;
}

export function HeaderSocialIcon({
  children,
  className,
  href,
  label,
  onClick,
}: HeaderSocialIconProps) {
  return (
    <a
      aria-label={label}
      className={[
        "inline-flex h-[calc(var(--header-height)*0.32)] w-[calc(var(--header-height)*0.32)] items-center justify-center transition-transform duration-200 ease-out hover:scale-110",
        className ?? "",
      ].join(" ")}
      href={href}
      onClick={onClick}
      rel="noreferrer"
      target="_blank"
      title={label}
    >
      {children}
    </a>
  );
}
