import Link from "next/link";

type SiteHeaderProps = {
  current?: "home" | "art" | "projects" | "about";
};

export function SectionNav({ className }: { className?: string }) {
  return (
    <nav className={className} aria-label="Portfolio sections">
      <Link href="/projects">Projects</Link>
      <Link href="/art">Sketches &amp; Paintings</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link
        className="home-link"
        aria-current={current === "home" ? "page" : undefined}
        href="/"
      >
        Home
      </Link>
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
    </header>
  );
}
