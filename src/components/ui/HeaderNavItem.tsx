import { NavLink } from 'react-router-dom'

interface HeaderNavItemProps {
  label: string
  to: string
}

export function HeaderNavItem({ label, to }: HeaderNavItemProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        [
          'group relative inline-flex h-full items-center justify-center whitespace-nowrap px-2 sm:px-3 md:px-4',
          'text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-[1.35rem]',
          'tracking-[0.08em] transition-colors duration-200 ease-out',
          'text-(--text-primary)',
          isActive ? 'font-semibold' : 'font-normal hover:font-semibold',
        ].join(' ')
      }
      to={to}
    >
      {({ isActive }) => (
        <>
          <span className="transition-transform duration-200 ease-out group-hover:scale-105">
            {label}
          </span>
          <span
            aria-hidden="true"
            className={[
              'pointer-events-none absolute bottom-[10%] left-1/2 h-0.5 w-[calc(100%-1rem)] -translate-x-1/2 origin-center bg-(--text-primary)',
              'transition-transform duration-200 ease-out',
              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
            ].join(' ')}
          />
        </>
      )}
    </NavLink>
  )
}