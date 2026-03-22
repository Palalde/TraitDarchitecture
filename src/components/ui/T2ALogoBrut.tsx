interface T2ALogoBrutProps {
  className?: string
  title?: string
}

export function T2ALogoBrut({
  className,
  title = "Logo ATELIER TraiT D'ARCHITECTURE",
}: T2ALogoBrutProps) {
  return (
    <svg
      aria-label={title}
      className={className}
      role="img"
      viewBox="0 0 306 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m226.9 0.2v170.08h29.32z"
        fill="currentColor"
      />
      <path
        d="m56.67 226.97v-170.08l24.44 28.35z"
        fill="currentColor"
      />
      <path
        d="m0.13 56.89v-56.69h170.08v28.35h-151.29v28.34z"
        fill="currentColor"
      />
      <path
        d="m305.01 193.62v61.7h-191.5v-28.35h170.34v-57.35z"
        fill="currentColor"
      />
    </svg>
  )
}