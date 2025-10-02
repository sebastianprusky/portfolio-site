"use client";

import React, { JSX, useState } from "react";


const artImages = [
  {
    src: "/restaurant.jpg",
    title: "red restaurant",
    subtitle: "oil on canvas"
  },
  {
    src: "/prayingmantises.JPEG",
    title: "seaside",
    subtitle: "oil on wood board"
  },
  {
    src: "/car.jpeg",
    title: "navigator",
    subtitle: "oil on canvas"
  }
  {
    src: "/deserthaircut.jpg",
    title: "deserted",
    subtitle: "oil on wood board"
  }
  {
    src: "/rollercoaster.jpg",
    title: "pit stop",
    subtitle: "oil on canvas"
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
  <img src={src} alt={title} className="max-h-[48rem] max-w-2xl rounded shadow-lg" />
        <button onClick={next} aria-label="Next" className="text-3xl px-2">&#8594;</button>
      </div>
      <div className="text-center">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-base mt-1">{subtitle}</div>
      </div>
    </main>
  );
}