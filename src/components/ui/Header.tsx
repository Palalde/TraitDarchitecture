import { T2ALogoLineRight } from './T2ALogoLineRight'

export function Header() {
  return (
    <header
      aria-label="En-tete principal"
      className="fixed inset-x-0 top-0 z-50"
      style={{ height: 'var(--header-height)' }}
    >
      {/* rightLogo */}
      <div
        className="flex h-full w-full items-start justify-end overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--trait)' }}
      >
        <T2ALogoLineRight className="h-full w-auto max-w-none shrink-0" />
      </div>
    </header>
  )
}