
import React, { JSX, useState } from "react";


const artImages = [
  {
    src: "/restaurant.jpg",
    title: "Sunset Over Lake",
    subtitle: "Acrylic on canvas, 2023"
  },
  {
    src: "/prayingmantises.JPEG",
    title: "Global Vision",
    subtitle: "Digital illustration, 2024"
  },
  {
    src: "car.jpeg",
    title: "Open Window",
    subtitle: "Watercolor, 2022"
  }
];

export default function Art(): JSX.Element {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + artImages.length) % artImages.length);
  const next = () => setCurrent((current + 1) % artImages.length);

  const { src, title, subtitle } = artImages[current];

  return (
    <main className="p-25 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Art</h1>
      <div className="flex items-center gap-8 mb-4">
        <button onClick={prev} aria-label="Previous" className="text-3xl px-2">&#8592;</button>
        <img src={src} alt={title} className="max-h-96 max-w-xs rounded shadow-lg" />
        <button onClick={next} aria-label="Next" className="text-3xl px-2">&#8594;</button>
      </div>
      <div className="text-center">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-base mt-1">{subtitle}</div>
      </div>
    </main>
  );
}