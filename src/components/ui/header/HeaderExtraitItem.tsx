import { NavLink } from "react-router-dom";

interface HeaderExtraitItemProps {
  label: string;
  to: string;
}

export function HeaderExtraitItem({ label, to }: HeaderExtraitItemProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        [
          "group relative inline-flex h-full items-center justify-center whitespace-nowrap pr-5 pl-2",
          "text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-[1.35rem]",
          "tracking-[0.08em] transition-colors duration-200 ease-out ",
          isActive
            ? "text-(--t2a-blue-) font-semibold"
            : "font-normal hover:font-semibold text-(--t2a-blue-dark) hover:text-(--t2a-blue-dark)",
        ].join(" ")
      }
      to={to}
    >
      {({ isActive }) => (
        <>
          <span className="inline-block origin-center scale-y-200">
            <span className="inline-block transition-transform duration-200 ease-out group-hover:scale-105">
              {label}
            </span>
          </span>
          <span
            aria-hidden="true"
            className={[
              "pointer-events-none absolute right-1 top-1/2 h-0.5 w-3 -translate-y-1/2 origin-left bg-(--text-primary) opacity-80",
              "transition-transform duration-200 ease-out",
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
            ].join(" ")}
          />
        </>
      )}
    </NavLink>
  );
}
