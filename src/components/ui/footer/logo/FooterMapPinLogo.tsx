import { memo } from "react";

interface FooterMapPinLogoProps {
  className?: string;
  title?: string;
}

export const FooterMapPinLogo = memo(function FooterMapPinLogo({
  className,
  title = "Repère de localisation",
}: FooterMapPinLogoProps) {
  return (
    <svg
      aria-label={title}
      className={className}
      role="img"
      viewBox="0 0 28 36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H9v2H7v2H5v4H3v8h2v4h2v4h2v4h2v4h6v-4h2v-4h2v-4h2v-4h2v-8h-2V6h-2V4h-2V2h-5Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M14 10h-3v2H9v4h2v2h6v-2h2v-4h-2v-2h-3Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path d="M20 6v4h4z" fill="currentColor" opacity="0.28" />
      <path d="M9 26v4h2v4h2v-6z" fill="currentColor" opacity="0.18" />
    </svg>
  );
});
