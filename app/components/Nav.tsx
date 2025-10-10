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
      {/* fixed top-right position */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        {links.map((l) => {
          const isActive = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive ? "page" : undefined}
              className={
                "no-underline text-center transition-colors hover:font-bold " +
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