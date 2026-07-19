import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../site-header";
import {
  artworks,
  categories,
  categoryDetails,
  isArtCategory,
} from "../artworks";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!isArtCategory(category)) return {};
  return { title: `${categoryDetails[category].title} | Sebastian Prusky` };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  if (!isArtCategory(category)) notFound();

  const details = categoryDetails[category];
  const categoryWorks = artworks.filter((work) => work.category === category);

  return (
    <main className="gallery-page">
      <SiteHeader current="art" />
      <header className="gallery-header">
        <a href="/art">Art</a>
        <h1>{details.title}</h1>
        <p>{details.description}</p>
      </header>

      {categoryWorks.length ? (
        <div className="artwork-grid">
          {categoryWorks.map((work) => (
            <a
              className="artwork-link"
              href={`/art/${category}/${work.slug}`}
              key={work.slug}
            >
              <img src={work.src} alt={work.title} />
              <span>{work.title}</span>
            </a>
          ))}
        </div>
      ) : (
        <section className="empty-state" aria-label="Photography coming soon">
          <p>Photography will be added here.</p>
        </section>
      )}
    </main>
  );
}
