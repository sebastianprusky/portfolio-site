export type ArtCategory = "sketches" | "paintings";

export type Artwork = {
  slug: string;
  title: string;
  category: ArtCategory;
  year: string;
  medium: string;
  src: string;
  note: string;
};

export const categoryDetails: Record<ArtCategory, { title: string }> = {
  sketches: {
    title: "Sketches",
  },
  paintings: {
    title: "Paintings",
  },
};

export const artworks: Artwork[] = [
  {
    slug: "bridge-cyclist",
    title: "Bridge Cyclist",
    category: "sketches",
    year: "2022",
    medium: "Colored drawing",
    src: "/art/sketch-02-bridge.jpg",
    note: "A perspective study built around motion, distance, and an open road.",
  },
  {
    slug: "room-study",
    title: "Room Study",
    category: "sketches",
    year: "2022",
    medium: "Figurative drawing",
    src: "/art/sketch-03-room.jpg",
    note: "A domestic scene exploring overlapping figures and warm interior light.",
  },
  {
    slug: "spirit-landscape",
    title: "Spirit Landscape",
    category: "sketches",
    year: "2022",
    medium: "Colored drawing",
    src: "/art/sketch-05-spirits.jpg",
    note: "An imagined landscape of figures, creatures, and shifting color.",
  },
  {
    slug: "drake-study",
    title: "Drake Study",
    category: "sketches",
    year: "2022",
    medium: "Colored drawing",
    src: "/art/sketch-06-drake.jpg",
    note: "A portrait study framed by a bright, cloud-filled sky.",
  },
  {
    slug: "mantis-study",
    title: "Mantis Study",
    category: "sketches",
    year: "2024",
    medium: "Preparatory drawing",
    src: "/art/sketch-07-mantis-study.jpg",
    note: "Planning sketches, palette tests, and reference material for a larger painting.",
  },
  {
    slug: "palm-portrait",
    title: "Palm Portrait",
    category: "sketches",
    year: "2024",
    medium: "Watercolor study",
    src: "/art/sketch-08-palms.png",
    note: "A quiet portrait study balancing figure, foliage, and open paper.",
  },
  {
    slug: "blueberry-study",
    title: "Blueberry Study",
    category: "sketches",
    year: "2024",
    medium: "Watercolor study",
    src: "/art/sketch-09-blueberries.png",
    note: "A monochromatic collection of figures, gestures, and blueberry forms.",
  },
  {
    slug: "desert-haircut",
    title: "Desert Haircut",
    category: "paintings",
    year: "Year to be added",
    medium: "Painting",
    src: "/art/painting-01-desert-haircut.jpg",
    note: "A surreal outdoor haircut staged across an expansive desert landscape.",
  },
  {
    slug: "night-drive",
    title: "Night Drive",
    category: "paintings",
    year: "Year to be added",
    medium: "Painting",
    src: "/art/painting-02-drive.png",
    note: "A layered view of navigation, attention, and movement through the city at night.",
  },
  {
    slug: "praying-mantises",
    title: "Praying Mantises",
    category: "paintings",
    year: "Year to be added",
    medium: "Painting",
    src: "/art/painting-03-praying-mantises.jpeg",
    note: "A familiar meal recast with three mantis figures at the table.",
  },
  {
    slug: "restaurant",
    title: "Restaurant",
    category: "paintings",
    year: "Year to be added",
    medium: "Painting",
    src: "/art/painting-04-restaurant.jpg",
    note: "An observational scene centered on waiting, attention, and shared space.",
  },
  {
    slug: "rollercoaster",
    title: "Rollercoaster",
    category: "paintings",
    year: "Year to be added",
    medium: "Painting",
    src: "/art/painting-05-rollercoaster.jpg",
    note: "A tilted point of view capturing anticipation before the ride begins.",
  },
];

export const categories = Object.keys(categoryDetails) as ArtCategory[];

export function isArtCategory(value: string): value is ArtCategory {
  return categories.includes(value as ArtCategory);
}
