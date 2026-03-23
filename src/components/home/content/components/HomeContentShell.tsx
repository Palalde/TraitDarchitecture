import { PlanTopoTerritoire } from "../../../ui/illustrations/PlanTopoTerritoire";

export function HomeContentShell() {
  return (
    <section
      className="relative min-h-[200vh] w-full overflow-hidden bg-(--bg-primary)"
      aria-label="Contenu principal de l'accueil"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden"
      >
        <PlanTopoTerritoire
          decorative
          className="mt-0 h-auto w-100 sm:w-250 max-w-none opacity-[0.05] dark:opacity-[0.05]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-(--trait)"
      />
    </section>
  );
}
