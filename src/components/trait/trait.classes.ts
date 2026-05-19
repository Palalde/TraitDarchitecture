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
