import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
} from "react";

const ZONES = [
  { value: "all", label: "Toutes" },
  { value: "corse", label: "Corse" },
  { value: "cote-bleue", label: "Côte Bleue" },
  { value: "provence", label: "Provence" },
] as const;

type Zone = (typeof ZONES)[number]["value"];

type FamilyKey = "type" | "materials" | "programs";

export interface FilterOption {
  value: string;
  label: string;
  available: boolean;
}

export interface ProjectMeta {
  zone: Exclude<Zone, "all">;
  types: string[];
  materials: string[];
  programs: string[];
}

interface ArchitectureFiltersProps {
  projects: ProjectMeta[];
  typeOptions: FilterOption[];
  materialOptions: FilterOption[];
  programOptions: FilterOption[];
}

function toggleSetValue(set: Set<string>, value: string): Set<string> {
  const next = new Set(set);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

export function ArchitectureFilters({
  projects,
  typeOptions,
  materialOptions,
  programOptions,
}: ArchitectureFiltersProps) {
  const [activeZone, setActiveZone] = useState<Zone>("all");
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set());
  const [activeMaterials, setActiveMaterials] = useState<Set<string>>(
    new Set(),
  );
  const [activePrograms, setActivePrograms] = useState<Set<string>>(new Set());
  const [openFamily, setOpenFamily] = useState<FamilyKey | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(
    () =>
      projects.map((project) => {
        if (activeZone !== "all" && project.zone !== activeZone) return false;
        if (
          activeTypes.size > 0 &&
          !project.types.some((value) => activeTypes.has(value))
        )
          return false;
        if (
          activeMaterials.size > 0 &&
          !project.materials.some((value) => activeMaterials.has(value))
        )
          return false;
        if (
          activePrograms.size > 0 &&
          !project.programs.some((value) => activePrograms.has(value))
        )
          return false;
        return true;
      }),
    [projects, activeZone, activeTypes, activeMaterials, activePrograms],
  );

  const visibleCount = useMemo(
    () => matches.reduce((count, match) => (match ? count + 1 : count), 0),
    [matches],
  );

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-project-card]");
    cards.forEach((card, index) => {
      card.classList.toggle("hidden", !matches[index]);
    });
  }, [matches]);

  useEffect(() => {
    if (openFamily === null) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenFamily(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenFamily(null);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openFamily]);

  const fineActiveCount =
    activeTypes.size + activeMaterials.size + activePrograms.size;

  const resetFine = () => {
    setActiveTypes(new Set());
    setActiveMaterials(new Set());
    setActivePrograms(new Set());
  };

  const resetAll = () => {
    resetFine();
    setActiveZone("all");
  };

  const families: {
    key: FamilyKey;
    label: string;
    options: FilterOption[];
    active: Set<string>;
    setActive: Dispatch<SetStateAction<Set<string>>>;
  }[] = [
    {
      key: "type",
      label: "Type",
      options: typeOptions,
      active: activeTypes,
      setActive: setActiveTypes,
    },
    {
      key: "materials",
      label: "Matériaux",
      options: materialOptions,
      active: activeMaterials,
      setActive: setActiveMaterials,
    },
    {
      key: "programs",
      label: "Programme",
      options: programOptions,
      active: activePrograms,
      setActive: setActivePrograms,
    },
  ];

  return (
    <div
      role="group"
      aria-label="Filtrer les projets"
      className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10"
    >
      <div
        data-reveal="fade-up"
        style={{ "--reveal-delay": "60ms" } as CSSProperties}
        className="flex flex-wrap items-center gap-x-1 gap-y-2 pb-3 sm:gap-x-2"
      >
        {ZONES.map((zone) => {
          const isActive = activeZone === zone.value;
          return (
            <button
              key={zone.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveZone(zone.value)}
              className={[
                "group relative inline-flex min-h-11 cursor-pointer items-center justify-center whitespace-nowrap px-3 py-1.5",
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

      <span
        aria-hidden="true"
        data-reveal="fade"
        style={{ "--reveal-delay": "120ms" } as CSSProperties}
        className="block h-px w-full bg-(--border)"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
        <div
          data-reveal="fade-up"
          style={{ "--reveal-delay": "180ms" } as CSSProperties}
          className="relative z-20 flex flex-wrap items-center gap-2"
        >
          {families.map((family) => {
            const isOpen = openFamily === family.key;
            const activeN = family.active.size;
            return (
              <div
                key={family.key}
                ref={isOpen ? containerRef : undefined}
                className="relative"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`filter-menu-${family.key}`}
                  onClick={() => setOpenFamily(isOpen ? null : family.key)}
                  className={[
                    "inline-flex min-h-11 cursor-pointer items-center gap-1.5 border px-3 py-1.5 text-sm tracking-[0.04em] transition-colors duration-200 ease-out",
                    activeN > 0 || isOpen
                      ? "border-(--t2a-blue) text-(--t2a-blue-dark) dark:text-(--t2a-blue)"
                      : "border-(--border) text-(--text-secondary) hover:border-(--t2a-blue) hover:text-(--t2a-blue-dark) dark:hover:text-(--t2a-blue)",
                  ].join(" ")}
                >
                  <span>
                    {family.label}
                    {activeN > 0 ? ` (${activeN})` : ""}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={[
                      "h-3 w-3 transition-transform duration-200 ease-out motion-reduce:transition-none",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  >
                    <path d="M2.5 4.5 6 8l3.5-3.5" />
                  </svg>
                </button>

                {isOpen && (
                  <div
                    id={`filter-menu-${family.key}`}
                    role="group"
                    aria-label={family.label}
                    className="absolute left-0 top-full z-20 mt-2 flex min-w-44 flex-col border border-(--border) bg-(--bg-primary) p-1"
                  >
                    {family.options.map((option) => {
                      const isActive = family.active.has(option.value);
                      if (!option.available) {
                        return (
                          <span
                            key={option.value}
                            aria-disabled="true"
                            className="flex min-h-11 cursor-not-allowed items-center gap-2 px-2 py-1.5 text-sm tracking-[0.02em] text-(--text-muted) opacity-50"
                          >
                            <span
                              aria-hidden="true"
                              className="inline-block h-3.5 w-3.5 shrink-0 border border-(--border)"
                            />
                            {option.label}
                          </span>
                        );
                      }
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="checkbox"
                          aria-checked={isActive}
                          onClick={() =>
                            family.setActive((set) =>
                              toggleSetValue(set, option.value),
                            )
                          }
                          className="flex min-h-11 cursor-pointer items-center gap-2 px-2 py-1.5 text-left text-sm tracking-[0.02em] text-(--text-secondary) transition-colors duration-200 ease-out hover:bg-(--t2a-blue-wash) hover:text-(--t2a-blue-dark) dark:hover:text-(--t2a-blue)"
                        >
                          <span
                            aria-hidden="true"
                            className={[
                              "inline-block h-3.5 w-3.5 shrink-0 border",
                              isActive
                                ? "border-(--t2a-blue) bg-(--t2a-blue)"
                                : "border-(--border)",
                            ].join(" ")}
                          />
                          <span
                            className={
                              isActive
                                ? "text-(--t2a-blue-dark) dark:text-(--t2a-blue)"
                                : ""
                            }
                          >
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {fineActiveCount > 0 && (
            <button
              type="button"
              onClick={resetFine}
              className="inline-flex min-h-11 items-center cursor-pointer text-xs uppercase tracking-[0.12em] text-(--text-muted) transition-colors duration-200 ease-out hover:text-(--t2a-blue-dark) dark:hover:text-(--t2a-blue)"
            >
              × Réinitialiser
            </button>
          )}
        </div>

        <p
          data-reveal="fade-up"
          style={{ "--reveal-delay": "240ms" } as CSSProperties}
          className="relative z-10 text-xs uppercase tracking-[0.12em] text-(--text-muted)"
        >
          {visibleCount} projet{visibleCount > 1 ? "s" : ""}
        </p>
      </div>

      {visibleCount === 0 && (
        <div className="mt-8 flex flex-col items-start gap-3">
          <p className="text-(--text-secondary)">
            Aucun projet ne correspond à ces filtres.
          </p>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex min-h-11 items-center cursor-pointer text-xs uppercase tracking-[0.12em] text-(--text-muted) transition-colors duration-200 ease-out hover:text-(--t2a-blue-dark) dark:hover:text-(--t2a-blue)"
          >
            × Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
