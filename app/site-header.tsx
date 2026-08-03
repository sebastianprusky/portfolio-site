import Link from "next/link";
import { ThemeToggle } from "./theme";

type SiteHeaderProps = {
  current?: "home" | "art" | "projects" | "about";
};

export function SectionNav({
  className,
  pageEnter,
}: {
  className?: string;
  pageEnter?: "content" | "title";
}) {
  return (
    <nav className={className} aria-label="Portfolio sections" data-page-enter={pageEnter}>
      <Link href="/projects">Projects</Link>
      <Link href="/art">Sketches &amp; Paintings</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <header className={current === "home" ? "site-header site-header-home" : "site-header"}>
      {current !== "home" && (
        <Link className="home-link" href="/">
          Home
        </Link>
      )}
      {current !== "home" && (
        <nav aria-label="Primary navigation">
          <Link
            aria-current={current === "projects" ? "page" : undefined}
            href="/projects"
          >
            Projects
          </Link>
          <Link aria-current={current === "art" ? "page" : undefined} href="/art">
            Sketches &amp; Paintings
          </Link>
          <Link
            aria-current={current === "about" ? "page" : undefined}
            href="/about"
          >
            About
          </Link>
        </nav>
      )}
      <ThemeToggle />
    </header>
  );
}
