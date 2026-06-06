import { useEffect, useState } from "react";

const ZONES = [
  { value: "all", label: "Toutes" },
  { value: "corse", label: "Corse" },
  { value: "cote-bleue", label: "Côte Bleue" },
  { value: "provence", label: "Provence" },
] as const;

type Zone = (typeof ZONES)[number]["value"];

interface ArchitectureFiltersProps {
  total: number;
  counts: Record<Exclude<Zone, "all">, number>;
}

export function ArchitectureFilters({
  total,
  counts,
}: ArchitectureFiltersProps) {
  const [activeZone, setActiveZone] = useState<Zone>("all");
  const visibleCount = activeZone === "all" ? total : (counts[activeZone] ?? 0);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-project-card]");
    cards.forEach((card) => {
      const match = activeZone === "all" || card.dataset.zone === activeZone;
      card.classList.toggle("hidden", !match);
    });
  }, [activeZone]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-(--border) pb-3 sm:gap-x-2">
        {ZONES.map((zone) => {
          const isActive = activeZone === zone.value;
          return (
            <button
              key={zone.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveZone(zone.value)}
              className={[
                "group relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap px-3 py-1.5",
                "text-sm tracking-[0.08em] transition-colors duration-200 ease-out sm:px-4 sm:text-base",
                isActive
                  ? "font-semibold text-(--t2a-blue-dark) dark:text-(--t2a-blue)"
                  : "font-normal text-(--text-secondary) hover:text-(--t2a-blue-dark) dark:hover:text-(--t2a-blue)",
              ].join(" ")}
            >
              <span className="transition-transform duration-200 ease-out group-hover:scale-105">
                {zone.label}
              </span>
              <span
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[calc(100%-1.5rem)] -translate-x-1/2 origin-center bg-(--t2a-blue) opacity-80",
                  "transition-transform duration-200 ease-out",
                  isActive
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.12em] text-(--text-muted)">
        {visibleCount} projet{visibleCount > 1 ? "s" : ""}
      </p>
    </div>
  );
}
