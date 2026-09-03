export type ArtCategory = "sketches" | "paintings";

export type Artwork = {
  slug: string;
  title: string;
  category: ArtCategory;
  year: string;
  medium: string;
  src: string;
  thumbnailSrc: string;
  width: number;
  height: number;
  note: string;
};

export const categoryDetails: Record<ArtCategory, { title: string }> = {
  sketches: {
    title: "Artwork",
  },
  paintings: {
    title: "Artwork",
  },
};

export const artworks: Artwork[] = [
  {
    slug: "bridge-cyclist",
    title: "on the way home",
    category: "sketches",
    year: "2022",
    medium: "watercolor, colored pencil, pen",
    src: "/art/sketch-02-bridge-display.webp",
    thumbnailSrc: "/art/sketch-02-bridge-thumb.webp",
    width: 2077,
    height: 2100,
    note: "An exercise in multi-media art, capturing the dreaminess of a memory with friends by adding a surreal element",
  },
  {
    slug: "room-study",
    title: "mr morale & the big steppers",
    category: "sketches",
    year: "2022",
    medium: "colored pencil",
    src: "/art/sketch-03-room-display.webp",
    thumbnailSrc: "/art/sketch-03-room-thumb.webp",
    width: 1859,
    height: 1859,
    note: "An exercise in fine details and shadow (reference: Mr. Morale & the Big Steppers, 2022)",
  },
  {
    slug: "spirit-landscape",
    title: "kids see ghosts",
    category: "sketches",
    year: "2022",
    medium: "colored pencil",
    src: "/art/sketch-05-spirits-display.webp",
    thumbnailSrc: "/art/sketch-05-spirits-thumb.webp",
    width: 2176,
    height: 2200,
    note: "An exercise in color blending (reference: Kids See Ghosts, 2018)",
  },
  {
    slug: "drake-study",
    title: "nothing was the same",
    category: "sketches",
    year: "2022",
    medium: "colored pencil",
    src: "/art/sketch-06-drake-display.webp",
    thumbnailSrc: "/art/sketch-06-drake-thumb.webp",
    width: 2183,
    height: 2200,
    note: "An exercise in creating perceived texture (reference: Nothing Was the Same, 2011)",
  },
  {
    slug: "mantis-study",
    title: "\"seaside\" planning",
    category: "sketches",
    year: "2024",
    medium: "pencil, colored pencil",
    src: "/art/sketch-07-mantis-study-display.webp",
    thumbnailSrc: "/art/sketch-07-mantis-study-thumb.webp",
    width: 1724,
    height: 2200,
    note: "Planning page for painting \"seaside,\" experimenting with composition, color palette, and subject detail",
  },
  {
    slug: "palm-portrait",
    title: "girl sketch",
    category: "sketches",
    year: "2024",
    medium: "watercolor, colored pencil",
    src: "/art/sketch-08-palms-display.webp",
    thumbnailSrc: "/art/sketch-08-palms-thumb.webp",
    width: 2200,
    height: 1650,
    note: "A portrait study focusing on conveying emotion through facial expression and depth of colors",
  },
  {
    slug: "blueberry-study",
    title: "blue sketch",
    category: "sketches",
    year: "2024",
    medium: "watercolor, colored pencil",
    src: "/art/sketch-09-blueberries-display.webp",
    thumbnailSrc: "/art/sketch-09-blueberries-thumb.webp",
    width: 2200,
    height: 1683,
    note: "An exercise in abstract composition",
  },
  {
    slug: "desert-haircut",
    title: "deserted",
    category: "paintings",
    year: "2023",
    medium: "oil on wood",
    src: "/art/painting-01-desert-haircut-display.webp",
    thumbnailSrc: "/art/painting-01-desert-haircut-thumb.webp",
    width: 2200,
    height: 1760,
    note: "The headless barber and unusual setting aim to create an eerie mood. The warped perspective and rounded, far-away horizon line add to the empty and surreal feel of the scene.",
  },
  {
    slug: "night-drive",
    title: "gps",
    category: "paintings",
    year: "2025",
    medium: "oil on canvas",
    src: "/art/painting-02-drive-display.webp",
    thumbnailSrc: "/art/painting-02-drive-thumb.webp",
    width: 2200,
    height: 1704,
    note: "A nighttime adventure with friends, mirrored by the chaos of shouting out navigation cues to a driver. Experiment in point-of-view perspective.",
  },
  {
    slug: "praying-mantises",
    title: "seaside",
    category: "paintings",
    year: "2024",
    medium: "oil on wood",
    src: "/art/painting-03-praying-mantises-display.webp",
    thumbnailSrc: "/art/painting-03-praying-mantises-thumb.webp",
    width: 2200,
    height: 1696,
    note: "A trio of praying mantises sit at a seaside steakhouse. This piece draws attention using the contrast of the praying mantises with a lavish setting, utilizing the visual similarity in anatomical features between the mantises and humans.",
  },
  {
    slug: "restaurant",
    title: "red restaurant",
    category: "paintings",
    year: "2023",
    medium: "oil on canvas",
    src: "/art/painting-04-restaurant-display.webp",
    thumbnailSrc: "/art/painting-04-restaurant-thumb.webp",
    width: 2200,
    height: 1769,
    note: "A couple waits for their food at a restaurant while staring down at their phones. This piece keeps the viewer's eye moving using lines in varying directions, including the restaurant walls and ceiling, the checkered cloth, and positioning of the subjects' arms. Experiment in depth and foreshortening.",
  },
  {
    slug: "rollercoaster",
    title: "snack break",
    category: "paintings",
    year: "2023",
    medium: "oil on canvas",
    src: "/art/painting-05-rollercoaster-display.webp",
    thumbnailSrc: "/art/painting-05-rollercoaster-thumb.webp",
    width: 1748,
    height: 2200,
    note: "A rollercoaster rider with a menu looks up at a waiter taking his order. This piece merges opposing scenes and uses a foreshortened perspective to engage the viewer.",
  },
];

export const categories = Object.keys(categoryDetails) as ArtCategory[];

export function isArtCategory(value: string): value is ArtCategory {
  return categories.includes(value as ArtCategory);
}
