import { useEffect, useState } from "react";

export function normalizePathname(pathname: string) {
  if (!pathname) {
    return "/";
  }

  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function getCurrentPathname() {
  if (typeof window === "undefined") {
    return "/";
  }

  return normalizePathname(window.location.pathname || "/");
}

export function isPathActive(pathname: string, href: string) {
  const normalizedPathname = normalizePathname(pathname);
  const normalizedHref = normalizePathname(href);

  if (normalizedHref === "/") {
    return normalizedPathname === normalizedHref;
  }

  return (
    normalizedPathname === normalizedHref ||
    normalizedPathname.startsWith(`${normalizedHref}/`)
  );
}

export function useCurrentPathname(initialPathname: string) {
  const [pathname, setPathname] = useState(() =>
    normalizePathname(initialPathname),
  );

  useEffect(() => {
    const updatePathname = () => {
      setPathname(getCurrentPathname());
    };

    updatePathname();
    window.addEventListener("popstate", updatePathname);

    return () => {
      window.removeEventListener("popstate", updatePathname);
    };
  }, []);

  return pathname;
}
