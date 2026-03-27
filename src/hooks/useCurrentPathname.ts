import { useEffect, useState } from "react";

function getCurrentPathname() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname || "/";
}

export function isPathActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function useCurrentPathname() {
  const [pathname, setPathname] = useState(getCurrentPathname);

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
