import type { Metadata } from "next";
import { SiteHeader } from "../site-header";
import { categoryDetails } from "./artworks";

export const metadata: Metadata = {
  title: "Art | Sebastian Prusky",
};

const categoryPreviews = [
  {
    slug: "sketches",
    image: "/art/sketch-09-blueberries.png",
  },
  {
    slug: "paintings",
    image: "/art/painting-01-desert-haircut.jpg",
  },
  {
    slug: "photography",
    image: null,
  },
] as const;

export default function ArtPage() {
  return (
    <main className="section-page">
      <SiteHeader current="art" />
      <header className="page-title">
        <p>Selected work</p>
        <h1>Art</h1>
      </header>
      <nav className="category-grid" aria-label="Art categories">
        {categoryPreviews.map(({ slug, image }, index) => {
          const category = categoryDetails[slug];
          return (
            <a className="category-link" href={`/art/${slug}`} key={slug}>
              {image ? <img src={image} alt="" /> : <span className="empty-image" />}
              <span className="category-index">0{index + 1}</span>
              <span className="category-name">{category.title}</span>
              <span className="category-description">{category.description}</span>
            </a>
          );
        })}
      </nav>
    </main>
  );
}
