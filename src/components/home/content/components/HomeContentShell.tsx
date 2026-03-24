import { T2ALogoAnimated } from "../../Landing/components/T2ALogoAnimated";

export function HomeContentShell() {
  return (
    <section
      className="relative min-h-[200vh] w-full overflow-hidden"
      style={{
        background: "var(--bg-primary) 40%, var(--gradient-end) 100%)",
      }}
      aria-label="Contenu principal de l'accueil"
    >
      {/* Illustration header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden"
      >
        <div className="relative mt-0 w-160 sm:w-200 lg:w-350 xl:w-640 max-w-none overflow-hidden opacity-[0.20] dark:opacity-[0.10]">
          <img
            alt=""
            className="h-auto w-full max-w-none grayscale"
            draggable={false}
            src="/media/illustrations/T2A_Plan_Topo%20territoire.webp"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-multiply "
          />
        </div>
      </div>
      <T2ALogoAnimated />
      {/* <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-(--trait)"
      /> */}

      {/* Illustration footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden"
      >
        <img
          alt=""
          className="w-full max-w-none object-cover object-bottom grayscale opacity-[0.7] dark:opacity-[0.5]"
          draggable={false}
          src="/media/illustrations/T2A_Coupe_Mer-elargie.webp"
        />
      </div>
    </section>
  );
}
