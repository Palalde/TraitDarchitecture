import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";

type TraitSequencePhase = "draw" | "erase" | "complete";

interface T2ALogoAnimatedProps {
  animateFinal?: boolean;
  animateTrait?: boolean;
  animateShadow?: boolean;
  className?: string;
  eraseDuration?: number;
  finalDuration?: number;
  onFinalComplete?: () => void;
  onEraseComplete?: () => void;
  onEraseProgress?: (progress: number) => void;
  onShadowComplete?: () => void;
  onTraitComplete?: () => void;
  onTraitProgress?: (progress: number) => void;
  shadowDuration?: number;
  showFinal?: boolean;
  showShadow?: boolean;
  showTrait?: boolean;
  style?: CSSProperties;
  traitDuration?: number;
}

/**
 * T2A Logo with 3 layers extracted from the Inkscape SVG:
 * - Layer 1 (trait): single stroke path traversing the screen
 * - Layer 2 (shadow): group of paths forming a subtle shadow
 * - Layer 3 (logo final): 4 fill paths forming the solid logo
 */
export function T2ALogoAnimated({
  animateFinal = false,
  animateShadow = false,
  animateTrait = false,
  className,
  eraseDuration = 2,
  finalDuration = 3,
  onFinalComplete,
  onEraseComplete,
  onEraseProgress,
  onShadowComplete,
  onTraitComplete,
  onTraitProgress,
  shadowDuration = 3,
  showFinal = true,
  showShadow = true,
  showTrait = true,
  style,
  traitDuration = 2,
}: T2ALogoAnimatedProps) {
  const [traitSequencePhase, setTraitSequencePhase] =
    useState<TraitSequencePhase>(animateTrait ? "draw" : "complete");

  const isDrawing = animateTrait && traitSequencePhase === "draw";
  const isErasing = animateTrait && traitSequencePhase === "erase";

  return (
    <svg
      viewBox="393 292 360 200"
      fill="none"
      overflow="visible"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <defs>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath5">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-396.00511,-330.92071)"
            id="path5"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath6">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-638.20391,-357.13711)"
            id="path6"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath7">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-395.49091,-328.86441)"
            id="path7"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath8">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-192.88731,-256.89761)"
            id="path8"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath9">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-396.00511,-327.32231)"
            id="path9"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath10">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-612.49271,-357.13711)"
            id="path10"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath11">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-369.26561,-331.43471)"
            id="path11"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath12">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-411.43181,-282.086)"
            id="path12"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath13">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-203.686,-256.89761)"
            id="path13"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath14">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-436.62871,-344.80001)"
            id="path14"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath15">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-487.02251,-278.48771)"
            id="path15"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath16">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-362.06651,-331.94881)"
            id="path16"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath17">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-489.59361,-250.72901)"
            id="path17"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath18">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-411.43181,-261.524)"
            id="path18"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath19">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-436.62871,-348.91241)"
            id="path19"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath20">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-467.48201,-253.29931)"
            id="path20"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath21">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-638.20391,-357.13711)"
            id="path21"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath22">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-386.74911,-329.89251)"
            id="path22"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath23">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-462.33981,-318.58351)"
            id="path23"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath24">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-469.02471,-281.57201)"
            id="path24"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath25">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-436.62871,-351.48261)"
            id="path25"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath26">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-467.99621,-303.16201)"
            id="path26"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath27">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-411.43181,-258.43981)"
            id="path27"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath28">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-386.23491,-257.41171)"
            id="path28"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath29">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-436.62871,-351.48261)"
            id="path29"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath30">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-465.93941,-357.13711)"
            id="path30"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath31">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-488.56521,-282.086)"
            id="path31"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath32">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-465.93941,-341.71571)"
            id="path32"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath33">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-486.50831,-257.41171)"
            id="path33"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath34">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-462.33981,-281.57201)"
            id="path34"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath35">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-386.74911,-329.89251)"
            id="path35"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath36">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-436.62871,-284.65621)"
            id="path36"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath37">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-407.83221,-259.46791)"
            id="path37"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath38">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-225.2833,-257.41171)"
            id="path38"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath39">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-436.62871,-282.60011)"
            id="path39"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath40">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-470.05321,-287.2265)"
            id="path40"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath41">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-206.77131,-256.89761)"
            id="path41"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath42">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-396.00511,-330.92071)"
            id="path42"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath43">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-391.37711,-258.95381)"
            id="path43"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath44">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-391.37711,-257.41171)"
            id="path44"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath45">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-390.34871,-255.86951)"
            id="path45"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath46">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-390.86291,-256.89761)"
            id="path46"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath47">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-573.41191,-355.59501)"
            id="path47"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath48">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-407.31801,-254.32741)"
            id="path48"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath49">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-496.79271,-250.21501)"
            id="path49"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath50">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-472.62431,-353.53881)"
            id="path50"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath51">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-387.77761,-254.32741)"
            id="path51"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath52">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-496.79271,-250.21501)"
            id="path52"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath53">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-373.89361,-256.89761)"
            id="path53"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath54">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-471.08161,-300.07771)"
            id="path54"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath55">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-471.59581,-293.3951)"
            id="path55"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath56">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-416.57401,-256.89761)"
            id="path56"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath57">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-435.06001,-355.55941)"
            id="path57"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath58">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-386.74911,-286.71241)"
            id="path58"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath59">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-471.08161,-300.07771)"
            id="path59"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath60">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-471.59581,-293.3951)"
            id="path60"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath61">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-433.54341,-256.89761)"
            id="path61"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath62">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-386.74911,-312.41491)"
            id="path62"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath63">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-386.74911,-319.09751)"
            id="path63"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath64">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-484.96561,-283.62811)"
            id="path64"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath65">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-481.36601,-283.62811)"
            id="path65"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath66">
          <path
            d="M 130.063,357.218 H 692.23 v -119.4 H 130.063 Z"
            transform="translate(-488.05091,-283.62811)"
            id="path66"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath129">
          <path
            d="M 0,595.276 H 841.89 V 0 H 0 Z"
            transform="matrix(1.3333333,0,0,-1.3333333,0,793.70133)"
            id="path129"
          />
        </clipPath>
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath131">
          <path
            d="M 0,595.276 H 841.89 V 0 H 0 Z"
            transform="translate(-859.79612,-357.21831)"
            id="path131"
          />
        </clipPath>
      </defs>

      {/* Couche 3 — Logo final (4 fill paths) */}
      {showFinal ? (
        <motion.g
          key={animateFinal ? "final-animated" : "final-static"}
          id="layer-logo-final"
          vectorEffect="none"
          initial={animateFinal ? { opacity: 0 } : false}
          animate={animateFinal ? { opacity: 1 } : { opacity: 1 }}
          transition={
            animateFinal
              ? {
                  duration: finalDuration,
                  ease: "linear",
                }
              : { duration: 0 }
          }
          onAnimationComplete={animateFinal ? onFinalComplete : undefined}
        >
          <path
            id="path1"
            d="M 0,0 V -75.142 H 12.955 Z"
            style={{
              fill: "var(--logo-fill)",
              fillOpacity: 1,
              fillRule: "nonzero",
              stroke: "none",
            }}
            transform="matrix(1.3333333,0,0,-1.3333333,616.53187,317.0912)"
          />
          <path
            id="path2"
            d="M 0,0 V 75.142 L 10.796,62.618 Z"
            style={{
              fill: "var(--logo-fill)",
              fillOpacity: 1,
              fillRule: "nonzero",
              stroke: "none",
            }}
            transform="matrix(1.3333333,0,0,-1.3333333,516.25413,450.6772)"
          />
          <path
            id="path3"
            d="M 0,0 V 25.047 H 75.142 V 12.524 H 8.302 L 8.302,0 Z"
            style={{
              fill: "var(--logo-fill)",
              fillOpacity: 1,
              fillRule: "nonzero",
              stroke: "none",
            }}
            transform="matrix(1.3333333,0,0,-1.3333333,482.94587,350.48773)"
          />
          <path
            id="path4"
            d="m 0,0 v -27.256 h -84.603 v 12.523 h 75.255 v 25.336 z"
            style={{
              fill: "var(--logo-fill)",
              fillOpacity: 1,
              fillRule: "nonzero",
              stroke: "none",
            }}
            transform="matrix(1.3333333,0,0,-1.3333333,662.54267,431.03347)"
          />
        </motion.g>
      ) : null}

      {/* Couche 2 — Ombrage (shadow paths) */}
      {showShadow ? (
        <motion.g
          key={animateShadow ? "shadow-animated" : "shadow-static"}
          id="layer-shadow"
          initial={animateShadow ? { opacity: 0 } : false}
          animate={animateShadow ? { opacity: [0, 1, 0] } : { opacity: 1 }}
          transition={
            animateShadow
              ? {
                  duration: shadowDuration,
                  ease: "linear",
                  times: [0, 0.45, 1],
                }
              : { duration: 0 }
          }
          onAnimationComplete={animateShadow ? onShadowComplete : undefined}
        >
          <g id="g128" clipPath="url(#clipPath129)">
            <path
              d="m 0,0 -1.238,-0.208 c -2.53,2.476 -5.415,3.583 -8.946,3.626 -12.875,-2.158 -17.74,6.429 -2.096,7.868 13.813,0.537 27.64,0.53 41.479,-0.022 8.066,2.287 8.36,-1.869 8.593,-8.144 0.582,-15.674 0.408,-31.612 -0.202,-47.253 -1.11,-1.436 -2.849,-2.022 -5.217,-1.758 -6.499,0.761 -12.489,0.09 -17.969,-2.012 -1.99,-5.489 -2.6,-11.569 -1.831,-18.24 l -0.746,-2.225 c -0.146,-0.449 -0.318,-0.443 -0.514,0 0.195,5.649 -1.218,14.179 0.275,19.515 0.865,3.09 3.476,4.394 6.671,4.652 3.258,0.264 8.289,0.016 11.785,-10e-4 0.989,-0.005 1.783,-0.556 2.986,-0.429 4.829,0.511 2.087,5.698 3.429,8.96 -1.727,12.285 0.516,25.182 0.017,37.431 C 36.411,3.349 34.85,5.445 34.674,7.226 25.476,6.479 16.168,6.548 6.917,6.658 3.673,6.697 0.929,8.155 -2.254,5.689 -3.576,4.665 0.497,3.268 1.562,2.332 2.16,1.806 5.311,-1.906 5.525,-2.444 7.299,-6.896 7.638,-16.467 7.126,-21.26 5.572,-35.809 1.873,-51.396 -1.412,-65.672 c -0.415,-1.804 -0.256,-3.832 -0.811,-5.872 -3.575,-13.137 -13.789,-10.73 -24.765,-11.759 -64.657,1.46 -129.14,1.159 -193.895,1.029 -11.773,-0.023 -29.324,-0.889 -39.953,4.271 -0.676,0.328 -4.882,2.895 -5.012,3.217 -0.428,1.057 0.701,0.722 1.273,0.763 5.771,0.415 12.382,-0.021 18.263,0 1.792,-1.301 3.692,-2.284 5.699,-2.946 6.801,0.579 13.57,0.157 20.304,-1.266 13.676,-0.574 27.27,-0.481 40.884,0.084 54.788,-1.453 110.28,-1.592 164.341,-1.323 3.677,0.103 7.144,1.211 9.428,3.909 -0.441,0.137 -0.432,0.309 0,0.514 l 0.514,0.514 c -0.444,0.167 -0.443,0.338 0,0.514 l 0.514,0.514 c -0.871,-0.002 -0.514,0.951 0,1.542 0.421,2.261 0.936,4.489 1.543,6.683 2.861,16.536 5.623,33.091 8.284,49.666 C 5.697,-10.851 3.811,-3.22 0,0"
              style={{
                fill: "var(--logo-shadow-fcfbfc)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,528.0068,352.47373)"
              clipPath="url(#clipPath5)"
              id="path67"
            />
            <path
              d="M 0,0 C 17.987,0.138 36.004,-0.1 53.991,-0.003 54.137,-0.773 53.823,-1.17 53.118,-1.438 50.582,-2.404 43.991,-2.275 40.904,-2.593 29.119,-3.807 17.426,-3.421 5.379,-3.622 c -16.965,-0.285 -34.864,-0.531 -51.895,-1.54 -3.661,-0.217 -8.329,1.227 -10.301,1.109 -1.11,-0.067 -1.824,-0.939 -3.063,-1.114 -3.224,-0.455 -7.884,0.173 -11.36,0.052 -25.636,-0.894 -51.367,-0.778 -77.134,-0.561 -3.279,0.028 -6.676,0.754 -10.288,0.56 -2.658,-0.142 -8.336,-0.102 -8.486,-3.341 0.354,-5.825 0.434,-12.259 1.054,-18.016 0.199,-1.844 1.455,-3.182 1.533,-4.135 0.956,-11.567 3.711,-22.835 5.143,-34.428 0.184,-1.486 -0.332,-3.946 -0.021,-5.066 0.073,-0.261 2.87,-1.374 3.369,-1.401 1.574,-0.085 5.639,0.72 7.143,0.445 0.689,-0.126 7.83,-5.466 8.152,-6.183 0.477,-1.061 0.329,-2.322 0.747,-3.351 0.244,-0.6 1.01,-0.654 1.175,-1.008 3.002,-6.425 3.936,-16.809 2.94,-23.888 -1.676,-11.908 -7.752,-12.81 -18.076,-13.281 -19.598,-0.893 -43.291,-0.677 -62.81,0.489 -0.924,0.056 -1.73,-0.482 -2.876,-0.358 -5.802,0.628 -10.729,2.976 -12.036,9.138 -0.254,1.199 0.113,2.197 -0.098,3.408 -0.166,0.952 -1.02,1.739 -1.131,2.557 -0.182,1.338 0.749,3.697 1.54,4.838 0.503,-0.919 0.675,-2.119 0.514,-3.599 0.428,-0.129 0.417,-0.302 0,-0.514 1.155,-11.103 8.866,-13.259 18.691,-13.425 21.237,-0.36 42.784,-0.481 63.86,0.507 7.495,1.091 9.814,7.184 9.8,14.098 l -0.819,14.756 -0.77,0.204 c -1.768,7.715 -5.336,14.595 -14.362,13.941 -2.455,-0.459 -7.329,-0.055 -8.429,2.623 -2.292,19.767 -4.652,39.53 -7.08,59.287 -0.736,4.373 0.736,6.779 4.415,7.221 1.952,0.638 3.959,1.131 6.023,1.139 l 82.994,0.029 3.029,-0.654 c 20.356,0.979 40.773,1.568 61.252,1.766 C -7.853,-1.533 -3.759,-1.094 0,0"
              style={{
                fill: "var(--logo-shadow-faf9fa)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,850.93853,317.51853)"
              clipPath="url(#clipPath6)"
              id="path68"
            />
            <path
              d="m 0,0 c -3.425,2.514 -7.142,3.893 -11.149,4.135 -7.306,-1.488 -17.176,-2.298 -13.255,8.685 1.115,3.121 1.534,3.907 5.081,4.663 16.345,0.191 32.79,0.201 49.333,0.029 4.662,2.069 9.008,0.4 9.087,-5.268 0.663,-18.178 0.706,-36.425 0.126,-54.742 -1.089,-1.917 -3.153,-2.707 -6.192,-2.372 -4.739,0.305 -9.197,-0.037 -13.374,-1.027 l 0.398,-0.881 c -1.369,-0.01 -2.745,0.006 -4.114,0 -0.974,-3.544 -1.3,-7.42 -0.977,-11.627 -0.358,-2.087 -0.718,-4.037 -1.08,-5.851 -0.406,-1.789 -0.679,-3.627 -0.818,-5.514 l -0.725,0.373 c -0.77,0.626 -0.349,2.156 0,3.085 -0.104,4.281 -0.299,9.428 -0.021,13.644 0.518,7.857 1.808,8.954 9.54,9.483 4.001,0.273 8.39,-0.36 12.331,0.012 2.822,0.267 3.166,0.51 3.369,3.313 0.912,12.572 0.748,31.587 0.003,44.254 -0.109,1.844 -0.445,7.032 -1.786,7.98 -1.9,1.342 -4.298,-0.112 -6.211,-0.081 -13.425,0.217 -27.131,0.866 -40.644,0.066 -2.273,-0.134 -10.377,-0.879 -9.415,-4.287 0.698,-2.47 7.455,-1.475 9.381,-1.609 C -4.766,6.02 -4.275,6.37 0.514,2.056 5.052,-2.055 5.508,-7.658 5.544,-13.465 3.198,-30.824 0.15,-48.097 -3.6,-65.284 c 0.275,-1.482 0.103,-3.025 -0.514,-4.627 -0.626,-2.659 -1.826,-4.202 -3.599,-4.626 -0.323,0.398 -0.454,0.839 -0.228,1.279 2.357,4.584 2.779,8.193 3.277,13.494 2.862,14.124 5.479,28.264 7.418,42.536 C 3.538,-11.456 3.744,-4.742 0,0"
              style={{
                fill: "var(--logo-shadow-f7f6f7)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,527.3212,355.21547)"
              clipPath="url(#clipPath7)"
              id="path69"
            />
            <path
              d="m 0,0 2.018,-0.766 c 26.443,-1.844 54.755,-3.497 82.199,-3.152 32.173,-0.563 65.49,-1.036 96.855,-0.54 l 12.276,0.86 c 1.486,0.668 2.857,1.354 4.113,2.056 -1.188,-1.726 -2.677,-2.574 -3.959,-4.102 -14.856,-2.023 -29.746,-0.437 -44.659,-0.5 -41.078,-0.173 -82.796,0.504 -123.882,0.981 -8.46,0.098 -16.908,-0.818 -25.213,-0.486 -6.147,0.245 -12.446,0.174 -18.5,0.479 -2.106,0.107 -5.301,1.554 -7.758,1.589 C -31.973,-3.501 -40.064,-6.348 -43.195,0 -28.812,0.052 -14.382,0.134 0,0"
              style={{
                fill: "var(--logo-shadow-f9f8f9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,257.18307,451.1712)"
              clipPath="url(#clipPath8)"
              id="path70"
            />
            <path
              d="m 0,0 c 2.859,-2.483 3.007,-8.993 2.498,-12.874 -2.717,-19.309 -5.907,-38.093 -9.568,-56.352 -0.599,-1.56 -1.419,-3.1 -3.015,-3.843 -47.384,-1.586 -95.104,-1.597 -143.163,-0.033 -6.957,0.313 -14.97,0.842 -21.073,2.677 0.898,0.446 2.64,0.4 3.599,0 1.25,0.442 3.327,0.413 4.628,0 47.694,-1.275 95.387,-1.397 143.078,-0.364 l 0.904,0.364 c 4.108,0.055 8.222,0.226 12.342,0.514 v 15.936 c 1.116,0.714 1.341,-0.189 1.534,-1.253 3.505,13.484 5.969,27.333 7.942,41.177 C 0.797,-6.4 0.208,2.5 -9.256,2.57 -7.727,1.936 -8.217,0.174 -9.77,0 c -0.208,1.12 0.299,3.21 0,4.112 -5.914,0.24 -3.474,2.409 0.878,1.369 C -5.559,4.684 -1.895,2.901 0,0"
              style={{
                fill: "var(--logo-shadow-e9ebf0)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,528.0068,357.2716)"
              clipPath="url(#clipPath9)"
              id="path71"
            />
            <path
              d="m 0,0 c -11.74,-2.012 -24.461,-2.393 -36.463,-2.167 -0.876,0.016 -1.748,0.284 -2.618,0.625 l -12.185,-0.893 -90.61,-0.142 c -3.283,-0.476 -4.53,-3.193 -3.741,-8.149 l -0.936,-0.583 c 0.24,-1.385 0.24,-2.755 0,-4.112 -0.512,0.111 -0.855,0.797 -1.029,2.056 -1.607,5.146 -1.264,9.601 1.029,13.365 z"
              style={{
                fill: "var(--logo-shadow-ededf2)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,816.65693,317.51853)"
              clipPath="url(#clipPath10)"
              id="path72"
            />
            <path
              d="m 0,0 c 0.494,0.942 0.503,1.925 0.027,2.947 -0.896,11.01 1.114,15.178 13.51,13.902 15.692,-0.297 31.177,-0.369 47.233,0.137 3.463,-0.041 4.285,-1.211 5.588,-4.325 1.046,-19.342 1.003,-39.583 -0.163,-59.087 -3.928,-1.723 -8.456,-2.37 -13.583,-1.942 l 0.353,-0.467 c 0.54,0.194 1.054,0.194 1.543,0 0.449,-0.146 0.442,-0.317 0,-0.514 -2.736,-0.018 -5.492,0.02 -8.228,0 l -3.085,0.519 c 2.409,2.275 6.966,0.95 10.081,2.004 2.29,-0.156 9.159,-0.435 10.776,0.53 0.399,0.238 1.016,0.973 1.145,1.425 l 0.131,50.29 c -0.843,4.575 0.334,9.642 -5.949,9.545 C 57.815,14.939 57.163,13.979 56.336,13.933 42.999,13.186 27.232,14.747 13.635,14.37 8.523,13.022 4.544,15.981 2.398,9.661 2.185,9.032 2.619,8.315 2.543,8.038 2.436,7.651 1.569,7.745 1.52,7.385 1.497,7.219 1.782,4.216 1.827,4.055 2.914,0.112 14.211,2.469 17.617,1.933 c 3.081,-0.484 6.301,-2.476 8.608,-4.503 0.8,-0.698 0.971,-1.212 0.515,-1.542 C 23.782,-1.475 20.748,0.504 16.716,1.032 16.189,1.101 13.86,1.42 13.887,0.519 14.793,0.38 16.645,0.98 16.969,0 11.322,0.048 5.647,-0.065 0,0"
              style={{
                fill: "var(--logo-shadow-eff0f3)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,492.35413,351.7884)"
              clipPath="url(#clipPath11)"
              id="path73"
            />
            <path
              d="m 0,0 v -11.823 c -0.588,-2.675 -0.784,-5.469 -0.59,-8.384 -3.521,-11.937 5.89,-13.626 15.64,-13.567 20.392,0.908 40.87,0.878 61.055,-0.153 l 0.256,0.756 c 6.42,1.697 7.461,7.811 6.162,13.614 1.324,7.969 -0.504,14.25 -5.485,18.841 L 77.133,0 c -0.449,0.146 -0.442,0.318 0,0.514 6.915,-1.954 8.004,-10.861 8.414,-17.323 0.702,-11.077 -0.29,-22.798 -14.847,-20.155 -19.843,-0.327 -39.987,-0.215 -59.607,-0.053 -7.368,-0.036 -13.878,4.149 -14.104,11.932 -0.066,2.255 0.519,5.376 0.954,7.607 0.14,4.52 0.022,11.336 0.649,15.546 0.103,0.687 0.342,1.336 0.658,1.952 C -0.209,0.843 -0.055,0 0,0"
              style={{
                fill: "var(--logo-shadow-f1f1f4)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,548.57573,417.58667)"
              clipPath="url(#clipPath12)"
              id="path74"
            />
            <path
              d="m 0,0 c 0.988,0.425 2.108,0.441 3.085,0 1.706,-0.048 3.441,0.086 5.143,0 0.508,0.279 1.076,0.427 1.542,0 9.292,-0.659 18.58,-1.515 27.862,-2.567 46.881,-1.397 93.852,-1.53 140.913,-0.398 2.848,0.893 4.183,0.682 4.004,-0.633 -6.932,-2.236 -16.215,-0.959 -23.376,-1.007 -48.608,-0.322 -97.759,-0.69 -146.062,1.52 -6.352,0.29 -13.188,0.374 -19.542,1.025 -0.801,0.082 -4.668,0.654 -4.368,2.06 3.591,-0.033 7.21,0.073 10.799,0"
              style={{
                fill: "var(--logo-shadow-f7f6f8)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,271.58133,451.1712)"
              clipPath="url(#clipPath13)"
              id="path75"
            />
            <path
              d="m 0,0 c 0.067,-19.64 0.903,-40.663 0,-60.144 l -0.13,-0.689 c -4.504,-1.048 -9.26,-1.504 -14.268,-1.367 -1.28,0.012 -2.579,-0.057 -3.86,0 -0.627,0.028 -1.914,-0.389 -1.794,0.509 4.798,0.846 9.797,0.087 14.59,0.586 2.185,0.227 3.32,0.476 3.889,2.789 -0.058,12.862 0.831,25.679 0.569,38.55 -0.103,5.065 0.078,11.439 -0.593,16.371 -0.501,3.685 -1.011,6.543 -5.346,6.52 -6.919,-0.036 -14.016,-0.639 -21.104,-0.576 -3.473,0.031 -6.046,-0.482 -8.712,-0.5 -1.57,-0.01 -3.992,0.82 -5.753,0.838 -5.35,0.055 -14.327,0.316 -19.327,-0.44 -0.808,-0.122 -2.424,-0.666 -2.98,-1.276 -1.397,-1.532 -2.507,-9.617 -1.919,-11.603 0.423,-1.431 2.037,-1.345 2.458,-2.414 l -3.083,-0.519 c -1.389,0.016 -6.903,-0.392 -7.199,0.514 0.038,1.536 2.295,1.417 2.571,0 0.29,0.982 0.738,0.982 1.028,0 0.759,1.296 1.298,1.294 2.057,0 l 0.458,1.048 c -0.885,4.143 -0.85,14.892 3.943,16.4 L -5.504,4.899 C -1.958,4.272 -0.659,3.805 0,0"
              style={{
                fill: "var(--logo-shadow-eaecf0)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,582.1716,333.968)"
              clipPath="url(#clipPath14)"
              id="path76"
            />
            <path
              d="m 0,0 c 1.834,2.242 3.962,-2.046 4.746,-4.001 1.292,-3.224 2.619,-22.352 -2.641,-22.944 -22.924,0.108 -45.755,-0.108 -68.494,-0.65 -3.021,0.209 -5.826,0.568 -7.806,3.093 -0.635,0.811 -1.632,2.567 -0.367,2.912 0.283,0.422 1.135,0.359 1.542,0 l 1.15,-0.401 c 1.343,-2.589 4.122,-3.3 6.84,-3.25 6.589,0.121 13.306,0.276 19.912,0.612 0.347,0.018 0.679,0.318 1.008,0.698 2.475,0.191 4.95,0.274 7.432,0.323 5.741,0.114 11.718,-0.014 17.138,-1.58 l 1.646,1.054 c 5.694,0.472 11.325,0.715 16.92,0 5.598,-0.923 3.578,16.552 2.408,18.295 C 1.041,-5.255 0.958,-5.203 0,-5.141 -0.011,-3.433 0.05,-1.706 0,0"
              style={{
                fill: "var(--logo-shadow-d8dbe3)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,649.36333,422.3844)"
              clipPath="url(#clipPath15)"
              id="path77"
            />
            <path
              d="m 0,0 v 25.188 h 74.562 c 0.028,-1.365 -0.038,-2.747 0,-4.112 C 74.38,20.233 74.227,19.891 73.334,19.901 53.896,20.31 34.285,20.652 14.803,20.461 7.826,20.392 4.997,19.184 3.878,12.381 3.487,10.007 3.212,6.615 3.043,4.214 3.402,2.427 3.244,1.023 2.571,0 Z"
              style={{
                fill: "var(--logo-shadow-d0d2dc)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,482.75533,351.10293)"
              clipPath="url(#clipPath16)"
              id="path78"
            />
            <path
              d="m 0,0 -2.388,-0.62 c -21.27,0.435 -42.314,0.315 -63.132,-0.36 -4.455,-0.153 -10.503,0.144 -12.568,4.63 -0.576,1.25 -1.775,3.903 -0.074,4.061 0.062,-0.314 -0.091,-0.792 0,-1.028 l 1.029,-0.514 c 0.087,-3.596 3.306,-4.823 6.433,-5.135 7.105,-0.709 14.526,0.472 21.567,0.533 15.762,0.136 31.445,-0.884 47.21,-0.416 3.903,1.588 4.608,4.286 4.531,8.365 -0.061,3.23 -0.351,11.544 -1.191,14.262 -0.525,1.697 -2.036,3.903 -3.988,3.981 -0.024,0.82 0.116,1.818 0,2.57 0.243,0.216 0.487,0.386 0.736,0.394 C 1.514,30.825 3.957,23.026 4.277,20.269 4.866,15.187 5.032,7.358 3.799,2.542 3.084,1.228 1.51,-0.938 0,0"
              style={{
                fill: "var(--logo-shadow-e1e2e9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,652.79147,459.396)"
              clipPath="url(#clipPath17)"
              id="path79"
            />
            <path
              d="m 0,0 c -3.107,-8.336 4.078,-12.65 11.957,-11.783 19.883,0.712 40.639,0.857 60.415,0.199 0.547,-0.018 0.927,-0.166 1.162,-0.753 1.672,0.089 2.529,-0.254 2.571,-1.028 -5.712,-1.282 -13.841,0.036 -19.818,-0.536 -15.131,2.464 -32.464,-1.494 -47.316,-0.006 -2.818,0.282 -6.762,1.507 -8.587,3.753 C -3.014,-5.97 -1.403,-2.8 -1.034,1.805 -0.865,3.916 -1.872,7.441 0,8.739 0,5.832 -0.01,2.906 0,0"
              style={{
                fill: "var(--logo-shadow-ececf1)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,548.57573,445.00267)"
              clipPath="url(#clipPath18)"
              id="path80"
            />
            <path
              d="m 0,0 c 0.01,-1.368 -0.005,-2.744 0,-4.112 -1.557,1.643 -2.127,4.123 -4.874,4.123 l -58.511,-0.132 c -5.508,-0.988 -5.418,-12.561 -3.98,-16.84 -0.51,-0.02 -1.028,0.012 -1.541,-0.003 l -1.141,0.375 c -0.994,1.568 -0.296,18.964 5.097,18.601 19.468,0.023 39.434,0.09 58.941,0.324 L -0.376,1.18 Z"
              style={{
                fill: "var(--logo-shadow-e1e2e9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,582.1716,328.4848)"
              clipPath="url(#clipPath19)"
              id="path81"
            />
            <path
              d="m 0,0 c -4.214,0.082 -5.271,3.15 -0.476,3.399 4.122,-0.245 8.223,-0.178 12.303,0.199 2.304,0.132 4.704,0.303 7.199,0.514 0.505,0.502 0.462,0.517 0.543,1.232 0.471,4.19 0.001,10.283 -0.029,14.704 2.257,3.231 3.199,-3.038 3.358,-4.611 C 23.124,13.211 23.306,7.521 23.13,5.403 22.492,-2.265 17.128,0.499 12.108,0.539 8.01,0.571 3.885,-0.016 0,0"
              style={{
                fill: "var(--logo-shadow-d0d3dd)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,623.30933,455.96893)"
              clipPath="url(#clipPath20)"
              id="path82"
            />
            <path
              d="m 0,0 c -1.287,-2.015 -4.275,-1.936 -6.393,-2.055 -22.401,-1.258 -44.791,-0.792 -67.141,-1.029 l -0.235,0.717 c 2.978,0.358 5.97,0.632 8.977,0.825 12.979,0.254 26.147,1.221 39.081,1.542 C -17.164,0.212 -8.553,-0.065 0,0"
              style={{
                fill: "var(--logo-shadow-f5f4f7)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,850.93853,317.51853)"
              clipPath="url(#clipPath21)"
              id="path83"
            />
            <path
              d="M 0,0 C 0.015,0.342 -0.023,0.686 0.002,1.026 9.137,0.131 10.274,-6.244 9.791,-14.157 8.919,-28.439 4.326,-42.852 2.184,-56.93 1.497,-61.446 1.63,-66.06 0.899,-70.557 c -0.075,-0.462 -0.22,-1.544 -0.894,-1.407 -0.148,4.544 0.166,9.132 0.033,13.68 -0.027,0.923 -0.55,1.647 -0.552,1.739 -0.252,10.24 -0.047,20.595 0,30.843 0.146,0.448 0.318,0.442 0.514,0 1.271,-5.829 1.256,-11.648 0,-17.478 1.001,-2.817 1.26,-5.752 0.927,-8.71 2.809,12.095 5.138,24.407 6.878,36.63 0.609,6.985 0.77,12.491 -7.43,14.105 z"
              style={{
                fill: "var(--logo-shadow-e2e3e9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,515.66547,353.84467)"
              clipPath="url(#clipPath22)"
              id="path84"
            />
            <path
              d="m 0,0 c 1.91,-0.158 2.812,-2.557 2.886,-4.4 0.742,-10.355 1.536,-20.783 2.383,-31.283 l -0.641,-1.329 c -1.153,0.025 -3.862,-0.25 -4.628,0 -0.857,11.121 -0.531,22.281 0,33.414 -0.376,1.188 -0.378,2.4 0,3.598"
              style={{
                fill: "var(--logo-shadow-cdd0da)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,616.45307,368.92333)"
              clipPath="url(#clipPath23)"
              id="path85"
            />
            <path
              d="m 0,0 c -0.685,0.007 -1.372,-0.014 -2.057,0 -0.201,7.357 -1.269,14.573 -2.04,21.859 -0.39,3.686 -0.314,9.306 -1.062,12.734 -0.03,0.14 -1.547,1.413 -1.526,2.419 -0.402,6.376 -0.358,12.777 -0.261,19.167 0.018,1.162 2.164,0.532 2.095,-1.1 2.099,-15.554 3.496,-31.196 4.189,-46.924 l 1.353,-7.72 z"
              style={{
                fill: "var(--logo-shadow-d7d9e1)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,625.36627,418.272)"
              clipPath="url(#clipPath24)"
              id="path86"
            />
            <path
              d="m 0,0 c 0.013,-0.856 -0.006,-1.714 0,-2.57 l -5.378,1.563 -59.448,-0.244 c -0.824,-0.198 -1.405,-0.472 -2.032,-1.053 -2.56,-2.372 -3.57,-13.822 -2.048,-17.23 -0.684,-0.02 -1.372,0.006 -2.057,0 -0.805,3.124 -0.356,8.552 0.238,12.081 1.271,7.547 4.15,8.288 11.507,8.385 18.887,0.249 38.671,-0.095 57.454,-0.56 C -0.825,0.591 -0.237,0.467 0,0"
              style={{
                fill: "var(--logo-shadow-d8dbe3)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,582.1716,325.05787)"
              clipPath="url(#clipPath25)"
              id="path87"
            />
            <path
              d="m 0,0 1.808,-17.968 c 0.809,-1.484 1.064,-2.691 0.763,-3.622 -0.514,0.003 -1.028,-0.005 -1.543,0 0.087,2.355 -0.797,4.641 -1.019,6.948 -1.45,15.059 -1.263,33.123 -4.785,47.656 -0.124,0.515 -0.153,1.548 -0.875,1.425 -0.019,-6.332 0.006,-12.686 -0.005,-19.018 -0.003,-1.198 10e-4,-2.4 0,-3.598 -0.146,-0.449 -0.318,-0.442 -0.515,0 0.035,7.866 -0.178,15.785 0,23.646 0.078,5.775 0.274,11.487 0.587,17.136 l 0.91,-0.227 C -2.623,36.819 -1.022,19.565 0.321,3.306 0.411,2.22 0.242,1.113 0,0"
              style={{
                fill: "var(--logo-shadow-e2e3e8)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,623.99493,389.48533)"
              clipPath="url(#clipPath26)"
              id="path88"
            />
            <path
              d="M 0,0 C 0,-0.065 -0.532,-0.454 -0.508,-1.205 -0.426,-3.777 2.174,-6.752 4.6,-7.482 10.8,-9.348 20.087,-7.83 26.505,-7.688 38.2,-7.429 49.91,-7.724 61.43,-7.686 67.006,-7.667 72.592,-7.751 78.162,-7.711 79.704,-9.666 75.087,-9.757 73.534,-9.253 69.59,-9.439 64.541,-8.731 60.444,-8.717 46.872,-8.669 33.351,-8.742 19.776,-8.718 15.313,-8.71 10.662,-9.394 5.947,-8.706 0.775,-7.951 -3.274,-1.55 0,3.084 0.003,2.057 0.006,1.027 0,0"
              style={{
                fill: "var(--logo-shadow-e6e7ed)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,548.57573,449.11493)"
              clipPath="url(#clipPath27)"
              id="path89"
            />
            <path
              d="m 0,0 c 0.026,-0.506 -0.334,-0.476 -0.745,-0.528 -3.292,-0.421 -8.081,0.044 -11.596,0.014 -47.943,-1.417 -96.023,-1.403 -143.983,0 h -4.628 c -0.449,0.146 -0.442,0.318 0,0.514 C -107.31,0.036 -53.641,-0.027 0,0"
              style={{
                fill: "var(--logo-shadow-f7f6f8)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,514.97987,450.48573)"
              clipPath="url(#clipPath28)"
              id="path90"
            />
            <path
              d="m 0,0 c -2.172,-0.468 -4.472,0.551 -6.43,0.559 -14.556,0.057 -29.453,-0.758 -44.242,-0.58 -3.949,0.047 -8.126,0.91 -12.338,0.553 -9.703,-0.823 -7.209,-12.986 -7.953,-20.066 -0.342,-0.003 -0.685,0 -1.028,0 0.324,1.389 -0.362,3.176 -0.259,4.375 0.037,0.431 0.673,0.944 0.737,1.551 0.749,7.095 -0.516,14.006 8.498,14.659 C -43.75,2.446 -21.537,0.789 -1.928,0.846 -0.997,0.849 -0.729,0.816 0,1.542 0.014,1.029 -0.008,0.514 0,0"
              style={{
                fill: "var(--logo-shadow-d2d5de)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,582.1716,325.05787)"
              clipPath="url(#clipPath29)"
              id="path91"
            />
            <path
              d="m 0,0 c 1.452,-1.962 -0.3,-1.957 -0.477,-2.447 -1.144,-3.16 -0.817,-7.472 -0.551,-10.918 2.387,-16.138 4.302,-32.623 5.581,-48.885 0.196,-2.5 0.368,-5.391 -0.439,-7.661 -0.922,5.263 -1.608,10.575 -2.057,15.936 -1.101,15.241 -2.293,30.401 -4.098,45.509 -0.244,2.045 -1.712,3.96 -1.05,6.407 -0.897,0.121 -0.483,-1.165 -0.508,-1.791 -0.184,-4.456 0.136,-8.951 0.02,-13.411 -0.017,-0.664 -0.533,-1.177 -0.535,-1.245 L -4.117,0.003 Z"
              style={{
                fill: "var(--logo-shadow-e8eaef)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,621.25253,317.51853)"
              clipPath="url(#clipPath30)"
              id="path92"
            />
            <path
              d="m 0,0 c 1.782,-0.748 5.132,-5.701 5.543,-7.567 0.843,-3.827 0.456,-7.597 0.578,-11.197 0.066,-1.953 0.684,-3.588 0.588,-5.666 -0.268,-5.8 -2.276,-8.271 -7.737,-9.497 l -2.572,1.028 c 0.625,0.029 3.265,0.455 3.771,0.624 0.713,0.238 0.708,0.811 0.857,0.918 2.668,1.91 3.971,4.154 4.08,7.533 0.04,1.269 -0.506,2.301 -0.503,3.499 0.014,7.046 1.411,15.626 -6.148,19.297 -0.028,0.184 0.054,0.402 0,0.514 C -2.598,-0.319 -3.626,-0.148 -4.628,0 -4.232,1.52 -0.992,1.177 0,0"
              style={{
                fill: "var(--logo-shadow-ececf1)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,651.42027,417.58667)"
              clipPath="url(#clipPath31)"
              id="path93"
            />
            <path
              d="m 0,0 c 2.377,-11.765 3.584,-24.253 4.464,-36.309 0.029,-0.395 -0.133,-0.804 -0.35,-1.217 0.205,-2.743 0.458,-5.555 1.028,-8.224 0.493,-0.438 0.382,-1.535 0,-2.057 l 0.601,-3.566 c -0.911,-8.312 5.796,-8.118 11.931,-7.759 l 0.324,-0.498 c 0.924,-0.029 1.86,0.106 2.785,-0.054 0.365,-0.04 0.227,-0.309 0.3,-0.46 -4.962,0.036 -9.95,-0.049 -14.912,0 -1.786,0.643 -2.98,4.09 -2.057,5.655 0.048,2.958 -0.016,5.953 -0.236,8.885 C 2.683,-29.707 0.191,-13.783 -1.028,2.056 -0.719,1.547 -0.106,0.496 0,0"
              style={{
                fill: "var(--logo-shadow-eaebf0)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,621.25253,338.0804)"
              clipPath="url(#clipPath32)"
              id="path94"
            />
            <path
              d="m 0,0 c -0.97,-0.964 -5.435,-0.478 -7.199,-0.514 -5.768,-0.055 -11.489,-0.423 -17.164,-1.103 -9.564,-0.039 -19.098,0.328 -28.602,1.103 -0.748,-0.442 -1.549,-0.889 -2.433,-0.952 -4.531,-0.325 -10.47,-0.543 -14.536,0.952 -0.671,-1.517 -1.707,-1.262 -2.571,0 -0.501,0.025 -1.092,-0.079 -1.543,0 -0.528,0.092 -0.757,-0.188 -1.028,0.514 z"
              style={{
                fill: "var(--logo-shadow-ececf1)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,648.67773,450.48573)"
              clipPath="url(#clipPath33)"
              id="path95"
            />
            <path
              d="M 0,0 C -0.759,0.248 -0.467,0.689 -0.537,1.257 -1.631,10.1 -0.555,24.002 -0.514,33.413 H 0 C -0.015,22.284 0.011,11.13 0,0"
              style={{
                fill: "var(--logo-shadow-d7d9e1)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,616.45307,418.272)"
              clipPath="url(#clipPath34)"
              id="path96"
            />
            <path
              d="M 0,0 C 3.56,-0.802 7.632,-3.322 8.521,-7.161 9.489,-11.345 7.764,-20.227 7.049,-24.782 5.843,-32.468 3.788,-46.667 1.403,-53.579 1.144,-54.33 0.898,-55.299 0.005,-55.517 -0.017,-51.411 0.017,-47.286 0,-43.18 c 1.999,6.47 4.111,14.351 5.426,21.321 0.697,3.696 1.284,7.381 1.353,11.143 0.072,3.908 -1.471,7.419 -5.781,7.084 C 0.753,-5.151 0.42,-6.682 0,-8.225 0.458,-8.32 0.439,-8.494 0,-8.739 c 0.399,-0.668 0.399,-1.371 0,-2.056 1.568,-1.482 1.453,-5.134 0,-6.683 0.311,-2.565 0.701,-6.043 0,-8.224 h -0.514 c 0.033,7.267 -0.654,16.102 0,23.132 0.051,0.554 0.46,1.318 0.514,2.57"
              style={{
                fill: "var(--logo-shadow-d8dae2)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,515.66547,353.84467)"
              clipPath="url(#clipPath35)"
              id="path97"
            />
            <path
              d="m 0,0 c -0.027,-0.583 0.135,-1.674 0,-2.056 -4.253,-0.589 -8.591,-0.451 -12.856,0 -0.514,0.003 -1.028,-0.005 -1.542,0 2.997,1.237 6.814,0.096 9.983,0.558 C -2.687,-1.246 -1.686,-0.046 0,0"
              style={{
                fill: "var(--logo-shadow-e5e4e9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,582.1716,414.15973)"
              clipPath="url(#clipPath36)"
              id="path98"
            />
            <path
              d="m 0,0 c 0.93,-0.395 0.961,-3.718 0,-4.112 -0.061,-0.565 -0.233,-0.736 -0.514,-0.514 -0.85,0.669 -0.561,2.508 -0.514,3.598 0.063,1.502 0.468,2.798 0.514,4.112 L 0,3.084 C 0.026,2.032 -0.028,0.762 0,0"
              style={{
                fill: "var(--logo-shadow-f9f8f9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,543.77627,447.74413)"
              clipPath="url(#clipPath37)"
              id="path99"
            />
            <path
              d="m 0,0 v -0.514 h -3.6 c -2.564,-0.29 -5.306,-0.29 -8.227,0 -0.511,0.032 -1.031,-0.026 -1.543,0 0.534,0.852 1.951,0.512 2.821,0.523 C -7.036,0.053 -3.507,-0.002 0,0"
              style={{
                fill: "var(--logo-shadow-f9f8f9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,300.37773,450.48573)"
              clipPath="url(#clipPath38)"
              id="path100"
            />
            <path
              d="m 0,0 c -0.182,-0.516 -0.214,-0.46 -0.745,-0.528 -3.413,-0.44 -8.46,0.038 -12.111,0.014 V 0 C -8.578,-0.024 -4.278,0.018 0,0"
              style={{
                fill: "var(--logo-shadow-eaecf0)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,582.1716,416.9012)"
              clipPath="url(#clipPath39)"
              id="path101"
            />
            <path
              d="m 0,0 c 0.122,-0.827 -0.187,-1.796 0.102,-2.712 0.353,-1.116 2.024,-1.52 1.955,-2.943 -0.514,0.006 -1.029,-0.003 -1.543,0 -2.341,6.763 -2.054,14.436 -2.571,21.591 0.588,-1.67 0.84,-4.111 1.024,-5.917 C -0.688,6.639 -0.484,3.272 0,0"
              style={{
                fill: "var(--logo-shadow-e2e3e9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,626.7376,410.73267)"
              clipPath="url(#clipPath40)"
              id="path102"
            />
            <path
              d="M 0,0 C -1.027,0.029 -2.058,-0.021 -3.085,0 -2.567,0.841 -0.487,0.826 0,0"
              style={{
                fill: "var(--logo-shadow-f9f8f9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,275.69507,451.1712)"
              clipPath="url(#clipPath41)"
              id="path103"
            />
            <path
              d="M 0,0 C 1.555,-1.401 3.732,-2.854 4.42,-5.134 4.669,-5.959 6.247,-15.153 6.216,-15.69 6.161,-16.648 5.438,-17.241 5.394,-17.731 4.768,-24.693 3.718,-32.276 1.908,-38.65 c -0.879,-3.099 0.213,-1.785 0.123,-4.183 -0.088,-2.365 -1.993,-3.84 -2.424,-6.381 -0.91,-5.358 -1.654,-10.69 -2.692,-16.07 -0.163,-0.994 -0.506,-1.679 -1.029,-2.056 0.639,6.209 2.009,11.576 3.012,17.808 1.541,9.57 6.714,34.002 4.786,42.163 C 3.026,-4.583 1.372,-2.413 0,0"
              style={{
                fill: "var(--logo-shadow-f8f7f8)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,528.0068,352.47373)"
              clipPath="url(#clipPath42)"
              id="path104"
            />
            <path
              d="M 0,0 C 0.222,1.563 0.353,3.058 0.514,4.626 L 1.543,6.683 C 1.02,3.975 1.248,2.768 0,0"
              style={{
                fill: "var(--logo-shadow-f9f8f9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,521.83613,448.4296)"
              clipPath="url(#clipPath43)"
              id="path105"
            />
            <path
              d="m 0,0 -0.514,-0.514 c -0.061,-0.151 0.064,-0.377 0,-0.514 l -0.514,-0.514 c -0.075,-0.134 0.078,-0.401 0,-0.514 -1.531,-1.845 -2.462,-1.524 -4.114,-2.056 -0.493,1.331 0.466,1.858 1.542,1.028 2.755,1.574 1.666,1.79 2.86,4.082 C -0.546,1.372 -0.033,1.47 0,1.542 -0.069,1.055 0.081,0.473 0,0"
              style={{
                fill: "var(--logo-shadow-f8f7f8)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,521.83613,450.48573)"
              clipPath="url(#clipPath44)"
              id="path106"
            />
            <path
              d="M 0,0 0.514,0.514 C 0.379,0.226 0.057,0.102 0,0"
              style={{
                fill: "var(--logo-shadow-f9f8f9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,520.46493,452.542)"
              clipPath="url(#clipPath45)"
              id="path107"
            />
            <path
              d="M 0,0 C 0.088,0.219 0.314,0.392 0.514,0.514 0.472,0.271 0.245,0.062 0,0"
              style={{
                fill: "var(--logo-shadow-f9f8f9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,521.15053,451.1712)"
              clipPath="url(#clipPath46)"
              id="path108"
            />
            <path
              d="m 0,0 c -2.639,-2.027 -6.341,0.933 -8.742,-1.542 -30.201,-0.321 -61.873,0.84 -92.046,-0.514 l -0.148,-0.406 c -5.158,0.701 -4.54,-5.184 -4.129,-8.788 l 6.415,-51.039 c -0.656,-4.598 0.689,-7.652 4.033,-9.164 l 2.571,-0.514 c 0.155,0.764 0.617,0.681 1.029,0 0.854,0.415 1.731,0.413 2.571,0 0.146,0.449 0.317,0.442 0.514,0 0.111,-0.291 0.185,-0.526 0.125,-0.567 -0.155,-0.106 -1.211,-0.35 -1.555,-0.413 -8.895,-1.611 -13.622,1.249 -12.454,10.747 -0.103,1.872 -0.275,3.757 -0.514,5.655 -0.753,0.327 -0.774,0.743 0,1.028 -1.499,15.427 -3.213,30.677 -5.143,45.75 -0.005,4.643 -1.07,9.075 4.886,9.767 4.528,0.525 12.466,-0.51 17.462,-0.537 C -56.61,-0.692 -28.509,-0.558 0,0"
              style={{
                fill: "var(--logo-shadow-f5f4f7)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,764.5492,319.57467)"
              clipPath="url(#clipPath47)"
              id="path109"
            />
            <path
              d="m 0,0 c 3.858,-12.523 15.77,-12.403 27.421,-12.243 17.231,0.981 33.973,0.95 50.227,-0.094 11.805,0.22 13.737,6.673 13.644,17.132 -0.03,3.362 -0.209,6.756 -0.408,10.149 l 0.648,0.992 c 1.343,-4.912 1.754,-17.189 0.265,-22.113 -1.936,-6.397 -7.874,-7.361 -13.871,-7.724 -18.308,-1.108 -43.371,-0.953 -61.752,-0.003 -5.783,0.299 -9.268,0.222 -13.089,4.908 C 2.684,-8.505 0.878,-6.322 0.779,-6.161 0.577,-5.836 -0.607,-0.79 0,0"
              style={{
                fill: "var(--logo-shadow-f9f8f9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,543.09067,454.59813)"
              clipPath="url(#clipPath48)"
              id="path110"
            />
            <path
              d="m 0,0 0.588,-0.426 c -1.368,-5.352 -5.506,-7.952 -12.415,-7.799 -1.872,-0.646 -8.787,-0.365 -11.035,0.021 -17.154,1.455 -37.74,-2.042 -54.473,0.035 -6.535,0.811 -10.871,6.048 -12.14,12.281 -0.032,0.157 0.005,0.349 0,0.514 -0.009,0.289 0.186,0.574 0.515,0.514 l 0.762,-0.358 c 1.487,-8.44 11.293,-10.766 18.666,-10.922 16.421,-0.348 32.946,-0.299 49.19,0.575 6.644,-1.281 15.676,-1.111 19.184,5.811 z"
              style={{
                fill: "var(--logo-shadow-f7f6f7)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,662.39027,460.08133)"
              clipPath="url(#clipPath49)"
              id="path111"
            />
            <path
              d="m 0,0 c 0.298,-1.91 -2.335,-0.593 -3.13,-1.88 -2.242,-3.631 0.1,-9.513 0.55,-13.293 1.765,-14.835 3.489,-29.346 5.589,-44.272 0.408,-2.903 -0.626,-6.145 1.598,-8.173 3.076,-2.805 10.266,0.178 14.708,-2.778 0.353,-0.235 3.592,-3.9 3.849,-4.375 0.879,-1.626 2.53,-6.564 3.061,-8.505 0.047,-2.313 -0.055,-4.641 -0.024,-6.959 0.036,-2.744 0.571,-6.545 0.495,-9.186 -0.083,-2.868 -1.657,-7.563 -3.816,-9.554 -2.575,-2.376 -7.158,-3.495 -10.539,-2.574 0.06,0.021 0.141,0.73 0.845,0.932 2.747,0.789 4.657,-0.36 7.863,1.93 2.505,1.789 2.374,2.94 3.119,5.363 l -0.754,1.101 c 1.894,10.648 2.912,26.411 -7.987,32.312 -0.275,-0.42 -1.047,-0.24 -1.543,0 -0.143,-0.824 -0.612,-0.743 -1.028,0 h -0.515 c -0.811,0.407 -1.754,0.408 -2.571,0 -0.339,0.002 -0.692,-0.027 -1.028,0 l -2.571,0.514 c -1.736,0.439 -4.137,0.7 -4.521,2.942 -0.108,0.631 0.339,1.353 0.243,1.869 -0.75,4.019 -1.319,8.764 -1.861,12.96 -1.641,12.691 -2.92,25.427 -4.687,37.977 -0.223,1.585 -0.231,11.029 0.131,12.26 C -3.964,0.522 -1.483,-0.066 0,0"
              style={{
                fill: "var(--logo-shadow-f8f7f8)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,630.16573,322.31627)"
              clipPath="url(#clipPath50)"
              id="path112"
            />
            <path
              d="m 0,0 c -0.602,-0.344 -1.452,-1.009 -1.543,-1.028 -0.087,-0.018 -0.984,0.542 -1.725,0.466 -42.583,-4.351 -88.265,1.665 -131.222,-0.487 -13.345,-0.039 -26.722,2.805 -39.831,3.619 h 8.227 c 1.658,-0.575 4.131,-0.854 5.916,-1.026 44.02,-4.223 94.664,-1.79 139.376,-1.517 4.91,0.03 10.428,-0.523 15.395,-0.02 8.65,0.877 6.497,8.891 7.526,15.096 2.463,14.865 6.974,31.479 8.099,46.393 0.415,5.505 -0.478,6.717 -1.99,11.499 -0.164,0.516 -0.185,1.08 -0.515,1.542 0.773,-0.678 1.726,-1.12 2.276,-2.097 1.795,-3.186 1.588,-9.392 1.299,-13.079 C 10.121,44.47 5.861,24.175 2.935,9.146 2.312,5.943 1.708,2.82 0,0"
              style={{
                fill: "var(--logo-shadow-f3f3f5)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,517.0368,454.59813)"
              clipPath="url(#clipPath51)"
              id="path113"
            />
            <path
              d="m 0,0 c -1.392,-1.444 -2.356,-3.784 -4.154,-4.843 -1.276,-0.753 -8.649,-2.687 -10.077,-2.712 -1.108,-0.019 -2.478,0.787 -4.001,0.891 -4.479,0.308 -11.042,-0.479 -15.944,-0.509 -11.349,-0.069 -23.755,-0.631 -34.982,-0.019 -8.393,0.458 -18.144,2.446 -19.802,12.332 -0.195,1.162 0.047,2.83 0,4.113 2.244,0.949 -0.772,3.712 1.542,5.14 -0.182,-5.861 -1.645,-11.51 3.634,-15.643 4.943,-3.87 10.845,-2.646 16.699,-2.841 17.544,-0.585 35.033,0.007 52.43,0.026 3.157,0.003 4.34,-1.208 7.917,0.26 4.51,1.851 5.685,6.421 6.085,10.888 0.09,1.008 -0.422,1.909 -0.397,2.918 0.146,5.766 1.029,11.652 -1.777,16.733 -1.513,2.741 -2.651,4.086 -5.401,5.651 -0.526,-0.253 -0.739,-0.028 -0.514,0.514 -0.449,0.146 -0.442,0.318 0,0.514 1.607,-0.249 3.153,-1.403 4.369,-2.573 C 2.011,24.702 2.492,8.096 0,0"
              style={{
                fill: "var(--logo-shadow-f5f5f6)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,662.39027,460.08133)"
              clipPath="url(#clipPath52)"
              id="path114"
            />
            <path
              d="m 0,0 c 0.287,-1.553 -0.783,-0.993 -1.774,-1.026 -19.509,-0.645 -40.204,-0.493 -60.211,-0.537 -23.101,-0.051 -48.013,-0.671 -70.947,0.529 -3.665,0.192 -7.51,-0.256 -11.05,1.034 C -96.008,0 -47.97,-0.408 0,0"
              style={{
                fill: "var(--logo-shadow-e5e5ea)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,498.5248,451.1712)"
              clipPath="url(#clipPath53)"
              id="path115"
            />
            <path
              d="m 0,0 c -0.9,0.718 -1.243,2.089 -1.028,4.112 -1.9,12.166 -1.587,25.714 -4.114,37.526 -10e-4,1.368 0.001,2.744 0,4.112 l 3.08,-19.797 C -2.091,18.656 -0.846,11.339 -0.031,4.346 0.137,2.908 -0.067,1.438 0,0"
              style={{
                fill: "var(--logo-shadow-f1f0f3)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,628.1088,393.59773)"
              clipPath="url(#clipPath54)"
              id="path116"
            />
            <path
              d="m 0,0 c 0.112,-1.262 0.731,-2.686 0.896,-3.993 0.099,-0.787 -0.375,-1.53 -0.271,-2.316 0.641,-4.844 8.476,-4.085 12.016,-3.994 0.672,0.017 1.169,0.533 1.243,0.536 0.341,0.015 0.688,-0.021 1.028,0 0.629,-0.101 1.143,-0.273 1.543,-0.514 0.158,-0.069 0.315,-0.4 0.514,-0.514 v -0.514 c -0.89,0.374 -3.982,0.954 -4.628,0 -6.414,0.206 -11.806,-1.88 -12.8,6.479 -0.211,1.771 0.051,3.577 -0.055,5.344 C -0.285,0.802 -0.114,0.631 0,0"
              style={{
                fill: "var(--logo-shadow-f0eff3)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,628.7944,402.50787)"
              clipPath="url(#clipPath55)"
              id="path117"
            />
            <path
              d="M 0,0 C 3.115,-3.394 12.837,-2.638 17.171,-1.503 16.918,-1.386 16.851,-0.885 16.969,0 32.208,0.23 47.5,-0.309 62.735,0 59.037,-1.602 52.746,0.378 49.202,-0.494 48.697,-0.619 48.142,-2.385 48.335,-2.568 l 2.573,-1.03 C 44.957,-3.574 38.737,-2.929 32.632,-3.062 24.091,-3.247 15.041,-4.683 6.433,-4.107 3.079,-3.883 -1.558,-3.837 -2.571,0 -1.719,-0.043 -0.854,0.013 0,0"
              style={{
                fill: "var(--logo-shadow-d4d7df)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,555.432,451.1712)"
              clipPath="url(#clipPath56)"
              id="path118"
            />
            <path
              d="m 0,0 c 1.372,-2.212 -2.98,-1.511 -4.239,-1.705 -4.844,-0.746 -5.791,-0.354 -10.369,-0.294 -14.525,0.188 -29.148,-0.253 -43.647,-0.349 -2.239,-0.015 -3.247,1.127 -6.117,0.189 -4.62,-1.51 -4.493,-3.857 -5.579,-7.69 -0.112,-0.396 -0.883,-0.394 -0.968,-0.759 -0.358,-1.528 0.201,-3.867 -0.017,-5.558 -0.09,-0.704 -0.356,-1.593 -1.026,-0.765 -0.805,1.9 0.073,3.939 -10e-4,5.401 -0.132,2.619 -1.318,9.401 -0.262,11.568 1.062,2.177 9.869,-0.297 12.369,0.487 C -43.354,1.46 -26.5,1.343 -10.022,0.529 -8.363,0.447 -0.571,0.921 0,0"
              style={{
                fill: "var(--logo-shadow-ccced9)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,580.08,319.62213)"
              clipPath="url(#clipPath57)"
              id="path119"
            />
            <path
              d="m 0,0 c -0.024,5.818 0,11.659 0,17.478 v 8.224 C 0.896,26.094 1.322,25.895 1.48,24.978 1.466,17.179 2.214,14.395 4.148,23.967 4.665,26.529 7.088,39.631 1.705,36.489 1.416,35.456 0.848,34.945 0,34.955 c 0.032,1.88 -0.024,3.777 -0.002,5.657 4.186,0.559 6.834,-1.839 7.227,-5.888 C 8.023,26.52 4.556,12.98 2.481,4.974 1.978,3.032 2.594,0.245 0,0"
              style={{
                fill: "var(--logo-shadow-d0d2dc)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,515.66547,411.41813)"
              clipPath="url(#clipPath58)"
              id="path120"
            />
            <path
              d="m 0,0 c 0.04,-0.334 -0.028,-0.691 0,-1.028 0.41,-0.909 0.543,-2.329 0,-3.084 -0.748,0.564 -0.726,1.386 -0.839,2.202 -0.236,1.709 -0.86,4.479 -0.189,6.022 C -0.855,3.003 -0.119,1.001 0,0"
              style={{
                fill: "var(--logo-shadow-f0eff3)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,628.1088,393.59773)"
              clipPath="url(#clipPath59)"
              id="path121"
            />
            <path
              d="m 0,0 -0.514,0.514 c -0.041,0.681 0.044,1.376 0,2.056 -0.067,1.019 0.084,2.069 0,3.085 L -0.099,5.312 C 0.397,3.776 -0.101,1.139 0,0"
              style={{
                fill: "var(--logo-shadow-f1f0f3)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,628.7944,402.50787)"
              clipPath="url(#clipPath60)"
              id="path122"
            />
            <path
              d="M 0,0 C 0.068,-0.003 0.583,-0.496 1.245,-0.535 3.279,-0.656 6.717,-0.106 8.418,-0.581 9.524,-0.89 8.862,-2.468 8.735,-2.564 8.291,-2.898 6.333,-2.075 5.453,-2.105 -0.863,-2.324 -7.665,-4.082 -14.019,-2.962 -15.636,-2.677 -17.186,-1.942 -16.969,0 -11.339,-0.088 -5.618,0.255 0,0"
              style={{
                fill: "var(--logo-shadow-d0d2db)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,578.05787,451.1712)"
              clipPath="url(#clipPath61)"
              id="path123"
            />
            <path
              d="M 0,0 C -0.138,2.198 0.029,4.475 0,6.683 0.38,7.328 0.393,8.092 0,8.739 0.002,8.91 -0.003,9.082 0,9.253 1.405,14.902 5.752,12.735 6.194,7.993 6.47,5.038 4.847,-6.361 3.094,-8.49 0.063,-12.169 0.625,-2.4 0.535,-1.245 0.483,-0.583 0.005,-0.074 0,0"
              style={{
                fill: "var(--logo-shadow-c8cbd6)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,515.66547,377.14813)"
              clipPath="url(#clipPath62)"
              id="path124"
            />
            <path
              d="M 0,0 C -0.009,0.684 -0.009,1.372 0,2.056 0.769,1.89 0.801,0.213 0,0"
              style={{
                fill: "var(--logo-shadow-d0d2dc)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,515.66547,368.238)"
              clipPath="url(#clipPath63)"
              id="path125"
            />
            <path
              d="M 0,0 C -0.857,0.003 -1.714,-0.005 -2.571,0 -2.233,0.81 -0.339,0.81 0,0"
              style={{
                fill: "var(--logo-shadow-f5f5f6)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,646.6208,415.53053)"
              clipPath="url(#clipPath64)"
              id="path126"
            />
            <path
              d="M 0,0 C -1.314,0.108 -1.492,0.241 -2.571,0.514 -1.747,0.484 -0.439,0.833 0,0"
              style={{
                fill: "var(--logo-shadow-f5f5f6)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,641.82133,415.53053)"
              clipPath="url(#clipPath65)"
              id="path127"
            />
            <path
              d="M 0,0 V -0.514 C -0.352,-0.359 -1.218,-0.706 -1.543,0 -1.08,0.029 -0.428,0.066 0,0"
              style={{
                fill: "var(--logo-shadow-f5f4f7)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
              }}
              transform="matrix(1.3333333,0,0,-1.3333333,650.73453,415.53053)"
              clipPath="url(#clipPath66)"
              id="path128"
            />
          </g>
        </motion.g>
      ) : null}

      {/* Couche 1 — Trait (stroke path) */}
      <g id="layer-trait" style={{ display: showTrait ? undefined : "none" }}>
        <motion.path
          id="path130"
          d="m -1072.676,-100.03 h 600 v 75.022 h -25.008 v 25.008 h 75.023 V -75.023 h -25.008 v -25.007 h 75.023 v 25.007 h -25.007 V 0 h 1350"
          vectorEffect="none"
          initial={animateTrait ? { pathLength: 0, pathOffset: 0 } : false}
          animate={
            isErasing
              ? { pathLength: 0, pathOffset: 1 }
              : traitSequencePhase === "complete"
                ? {
                    pathLength: animateTrait ? 0 : 1,
                    pathOffset: animateTrait ? 1 : 0,
                  }
                : { pathLength: 1, pathOffset: 0 }
          }
          transition={
            isDrawing
              ? { duration: traitDuration, ease: "linear" }
              : isErasing
                ? { duration: eraseDuration, ease: "linear" }
                : { duration: 0 }
          }
          onUpdate={(latest) => {
            if (isDrawing && onTraitProgress) {
              onTraitProgress((latest.pathLength as number) ?? 0);
            }

            if (isErasing && onEraseProgress) {
              onEraseProgress((latest.pathOffset as number) ?? 0);
            }
          }}
          onAnimationComplete={() => {
            if (isDrawing) {
              onTraitComplete?.();
              setTraitSequencePhase("erase");
              return;
            }

            if (isErasing) {
              onEraseComplete?.();
              setTraitSequencePhase("complete");
            }
          }}
          style={{
            fill: "none",
            stroke: "var(--trait)",
            strokeWidth: 2,
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            strokeOpacity: 1,
          }}
          transform="matrix(1.3333333,0,0,-1.3333333,1146.3948,317.41027)"
        />
      </g>
    </svg>
  );
}
