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
      {/* fixed-width container so links distribute evenly */}
      <div className="w-full max-w-2xl mx-auto mt-8 mb-4 flex">
        {links.map((l) => {
          const isActive = pathname === l.href;
          return (
            // flex-1 gives each link an equal width; text-center keeps label centered
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive ? "page" : undefined}
              className={
                "no-underline flex-1 text-center px-2 transition-colors " +
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