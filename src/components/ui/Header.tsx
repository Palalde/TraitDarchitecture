import { T2ALogoBrut } from './T2ALogoBrut'
import { T2ALogoLineRight } from './T2ALogoLineRight'

export function Header() {
  return (
    <header
      aria-label="En-tete principal"
      className="fixed inset-x-0 top-0 z-50"
      style={{ height: 'var(--header-height)' }}
    >
        {/* wrapper */}
      <div
        className="relative flex h-full w-full items-start justify-end overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--trait)' }}
      >
        {/* leftLogo */}
        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 sm:pl-4 md:pl-5 lg:pl-6">
          <T2ALogoBrut
            className="w-auto"
            title="Logo gauche ATELIER TraiT D'ARCHITECTURE"
            style={{ height: 'calc(var(--header-height) * 0.5)' }}
          />
        </div>

        {/* rightLogo */}
        <T2ALogoLineRight className="h-full w-auto max-w-none shrink-0" />
      </div>
    </header>
  )
}