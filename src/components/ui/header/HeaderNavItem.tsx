import { isPathActive } from "@/hooks/useCurrentPathname";

interface HeaderNavItemProps {
  activePath?: string;
  label: string;
  pathname: string;
  to: string;
}

export function HeaderNavItem({
  activePath,
  label,
  pathname,
  to,
}: HeaderNavItemProps) {
  const isActive = isPathActive(pathname, activePath ?? to);

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={[
        "group relative inline-flex h-full items-center justify-center whitespace-nowrap px-2 sm:px-3 md:px-4",
        "text-sm sm:text-sm md:text-base lg:text-base 2xl:text-[1.35rem]",
        "tracking-[0.08em] transition-colors duration-200 ease-out text-(--t2a-blue-dark)",
        isActive ? "font-semibold" : "font-normal hover:font-semibold",
      ].join(" ")}
      href={to}
    >
      <>
        <span className="transition-transform duration-200 ease-out group-hover:scale-105">
          {label}
        </span>
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute bottom-[10%] left-1/2 h-0.5 w-[calc(100%-1rem)] -translate-x-1/2 origin-center bg-(--text-primary) opacity-80",
            "transition-transform duration-200 ease-out",
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          ].join(" ")}
        />
      </>
    </a>
  );
}
