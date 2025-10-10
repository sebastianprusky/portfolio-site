"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname() ?? "/";

  const links = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/projects", label: "projects" },
    { href: "/experience", label: "experience" },
    { href: "/art", label: "art" },
  ];

  return (
    <nav>
      <div className="flex justify-center gap-4 mt-8 mb-6">
        {links.map((l) => {
          const isActive = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive ? "page" : undefined}
              className={
                // reserve space so bolding doesn't shift siblings: inline-block + min width (uses ch unit)
                "no-underline inline-block text-center px-1 min-w-[10ch] transition-colors transition-transform " +
                "hover:font-bold " +
                (isActive ? "font-bold text-foreground" : "text-foreground")
              }
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}