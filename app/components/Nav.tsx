"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav(): JSX.Element {
  const pathname = usePathname() ?? "/";

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/art", label: "Art" },
  ];

  return (
    <nav>
      <div className="flex justify-center gap-6 mt-8 mb-4">
        {links.map((l) => {
          const isActive = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive ? "page" : undefined}
              className={
                "no-underline transition-colors " +
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