import { motion } from "framer-motion";
import { T2ALogoAnimated } from "./T2ALogoAnimated";

interface LandingScreenProps {
  handleSlideUpComplete: () => void;
  isSlidingUp: boolean;
  landingSlideUpDuration: number;
}

export function LandingScreen({
  handleSlideUpComplete,
  isSlidingUp,
  landingSlideUpDuration,
}: LandingScreenProps) {
  return (
    <motion.section
      className="relative z-10 h-screen w-full overflow-hidden bg-(--bg-primary)"
      initial={false}
      animate={{ y: isSlidingUp ? "-100%" : 0 }}
      onAnimationComplete={isSlidingUp ? handleSlideUpComplete : undefined}
      transition={{ duration: landingSlideUpDuration, ease: "easeOut" }}
    >
      {/* wrapper */}
      <div
        className="absolute top-1/2 left-1/2 flex items-start"
        style={{
          transform: "translate(calc(var(--landing-center) * -1), -50%)",
        }}
      >
        {/* logo */}
        <T2ALogoAnimated
          className="w-(--landing-logo) shrink-0"
          showFinal
          showShadow={false}
          showTrait={false}
        />
        {/* title */}
        <div
          className="-ml-4 select-none"
          style={{
            marginTop: "calc(var(--landing-offset) * -1)",
          }}
        >
          <span className="flex items-baseline gap-[0.7em] whitespace-nowrap text-(--t2a-blue-dark) text-(length:--landing-text) leading-(--landing-leading)">
            <span className="font-normal">ATELIER</span>
            <span className="font-semibold">TraiT</span>
            <span className="font-normal">D'ARCHITECTURE</span>
          </span>
        </div>
        {/* noms */}
        <div
          className="absolute bottom-0 select-none text-center whitespace-nowrap"
          style={{
            left: "var(--landing-center)",
            transform: "translateX(-50%)",
          }}
        >
          <span
            className="block font-light text-(--t2a-blue-light) text-(length:--landing-names) leading-none"
            style={{ transform: "translateY(-0.7em)" }}
          >
            Théa BATTISTINI & Titouan GRANET
          </span>
        </div>
      </div>
      {/* vertical trait */}
      <div
        className="absolute left-1/2 bottom-0"
        style={{ transform: "translateX(-50%)", width: "1px", height: "25%" }}
      >
        <div
          className="h-full w-full bg-(--trait)"
          style={{ transformOrigin: "bottom center" }}
        />
      </div>
    </motion.section>
  );
}
