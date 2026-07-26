import { redirect } from "next/navigation";
import { categories } from "../artworks";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  await params;
  redirect("/art");
}
