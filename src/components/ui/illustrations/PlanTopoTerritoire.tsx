import { memo, useEffect, useState } from "react";

import planTopoTerritoireUrl from "./T2A_Plan_Topo territoire 2.svg";

const XML_DECLARATION_PATTERN = /^<\?xml[\s\S]*?\?>\s*/;
const SVG_COMMENT_PATTERN = /<!--([\s\S]*?)-->\s*/g;

interface PlanTopoTerritoireProps {
  className?: string;
  title?: string;
  decorative?: boolean;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

let cachedSvgMarkup: string | null = null;
let svgMarkupPromise: Promise<string> | null = null;

function sanitizeSvgMarkup(svgMarkup: string) {
  return svgMarkup
    .replace(XML_DECLARATION_PATTERN, "")
    .replace(SVG_COMMENT_PATTERN, "")
    .trim();
}

function loadSvgMarkup() {
  if (cachedSvgMarkup !== null) {
    return Promise.resolve(cachedSvgMarkup);
  }

  if (svgMarkupPromise !== null) {
    return svgMarkupPromise;
  }

  svgMarkupPromise = fetch(planTopoTerritoireUrl)
    .then((response) => response.text())
    .then((markup) => {
      const sanitizedMarkup = sanitizeSvgMarkup(markup);

      cachedSvgMarkup = sanitizedMarkup;

      return sanitizedMarkup;
    })
    .finally(() => {
      svgMarkupPromise = null;
    });

  return svgMarkupPromise;
}

function buildInlineSvgMarkup({
  className,
  title,
  decorative,
  svgMarkup,
}: {
  className: string;
  title: string;
  decorative: boolean;
  svgMarkup: string;
}) {
  const escapedTitle = escapeHtml(title);
  const escapedClassName = className ? escapeHtml(className) : "";

  return svgMarkup.replace(/<svg\b([^>]*)>/, (_match, attributes) => {
    const classAttribute = escapedClassName
      ? ` class="${escapedClassName}"`
      : "";
    const accessibilityAttributes = decorative
      ? ' aria-hidden="true" focusable="false"'
      : ` role="img" aria-label="${escapedTitle}"`;
    const titleMarkup = decorative ? "" : `<title>${escapedTitle}</title>`;

    return `<svg${attributes}${classAttribute}${accessibilityAttributes}>${titleMarkup}`;
  });
}

export const PlanTopoTerritoire = memo(function PlanTopoTerritoire({
  className,
  title = "Plan topo territoire",
  decorative = false,
}: PlanTopoTerritoireProps) {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(cachedSvgMarkup);

  useEffect(() => {
    if (cachedSvgMarkup !== null) {
      return;
    }

    let isActive = true;

    loadSvgMarkup()
      .then((markup) => {
        if (isActive) {
          setSvgMarkup(markup);
        }
      })
      .catch(() => {
        if (isActive) {
          setSvgMarkup("");
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  if (!svgMarkup) {
    return null;
  }

  return (
    <span
      aria-hidden={decorative || undefined}
      dangerouslySetInnerHTML={{
        __html: buildInlineSvgMarkup({
          className: className ?? "",
          title,
          decorative,
          svgMarkup,
        }),
      }}
    />
  );
});
