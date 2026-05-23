// Shared Tailwind class fragments for the /trait page.
// Kept as static string constants so Tailwind v4 can statically detect them.

/** Vertical axis horizontal placement across breakpoints (page-wide convention). */
export const TRAIT_AXIS_LEFT = "left-6 sm:left-8 md:left-10 lg:left-[27%]";

/**
 * Narrative text column indent across breakpoints.
 * Mobile/tablet: padding-left scales with axis; desktop: column shifts to lg:ml-[31%].
 * Combine with `lg:max-w-*` per section if a specific width is needed.
 */
export const TRAIT_NARRATIVE_INDENT =
  "pl-10 sm:pl-12 md:pl-14 lg:ml-[31%] lg:pl-0";

/** Formula matrix columns shared by the header row and each formula row. */
export const TRAIT_FORMULA_MATRIX_GRID =
  "md:grid md:grid-cols-[minmax(11rem,1.15fr)_repeat(3,minmax(7rem,1fr))] md:items-center md:gap-x-6 lg:grid-cols-[minmax(13rem,1.1fr)_repeat(3,minmax(8rem,1fr))] lg:gap-x-8";
