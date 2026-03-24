import { FooterMapPinLogo } from "./logo/FooterMapPinLogo";

interface FooterOfficeProps {
  addressLines: readonly string[];
  city: string;
}

export function FooterOffice({ addressLines, city }: FooterOfficeProps) {
  return (
    <section
      aria-label={`Atelier ${city}`}
      className="flex flex-col items-center text-center"
    >
      <div className="flex items-center justify-center gap-2">
        <FooterMapPinLogo className="mt-0.5 h-3 w-3 shrink-0 text-(--trait)" />
        <h2 className="text-[0.78rem] font-semibold tracking-[0.24em] text-(--t2a-blue) uppercase">
          {city}
        </h2>
      </div>
      <address className="mt-4 space-y-1 text-[0.95rem] leading-[1.75] not-italic text-(--t2a-blue)">
        {addressLines.map((line) => (
          <p key={`${city}-${line}`}>{line}</p>
        ))}
      </address>
    </section>
  );
}
