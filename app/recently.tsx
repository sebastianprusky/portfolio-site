import { recentItems, recentlyUpdated } from "./recently-data";

export function Recently() {
  return (
    <section
      aria-labelledby="recently-heading"
      className="recently-section"
      data-page-enter="content"
    >
      <header className="recently-header">
        <h2 id="recently-heading">Recently</h2>
        <p>Updated {recentlyUpdated}</p>
      </header>

      <div className="recently-grid">
        {recentItems.map((item) => (
          <article className="recent-item" key={item.slug}>
            <p className="recent-category">{item.category}</p>
            <a
              aria-label={`${item.action.label}: ${item.title}`}
              className="recent-preview-card"
              href={item.action.href}
              rel="noreferrer"
              target="_blank"
            >
              <span className="recent-preview-copy">
                <strong>{item.title}</strong>
                <span>{item.byline}</span>
              </span>
              <span className="recent-preview-action">
                {item.action.label} <span aria-hidden="true">↗</span>
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
