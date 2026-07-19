type SiteHeaderProps = {
  current?: "art" | "projects" | "about";
};

export function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Sebastian Prusky home">
        Sebastian Prusky
      </a>
      <nav aria-label="Primary navigation">
        <a aria-current={current === "art" ? "page" : undefined} href="/art">
          Art
        </a>
        <a
          aria-current={current === "projects" ? "page" : undefined}
          href="/projects"
        >
          Projects
        </a>
        <a
          aria-current={current === "about" ? "page" : undefined}
          href="/about"
        >
          About
        </a>
      </nav>
    </header>
  );
}
