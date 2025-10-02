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
    src: "/drive.jpg",
    title: "navigator",
    subtitle: "oil on canvas"
  },
  {
    src: "/deserthaircut.jpg",
    title: "deserted",
    subtitle: "oil on wood board"
  },
  {
    src: "/rollercoaster.jpg",
    title: "pit stop",
    subtitle: "oil on canvas"
  },
  {
    src: "/gate.jpg",
    title: "gates",
    subtitle: "colored pencil on watercolor paper"
  }
];

export default function Art(): JSX.Element {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + artImages.length) % artImages.length);
  const next = () => setCurrent((current + 1) % artImages.length);

  const { src, title, subtitle } = artImages[current];

  return (
  <main className="min-h-screen mt-8 px-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Times New Roman, Times, serif' }}>Art</h1>
      <div className="relative flex items-center justify-center mb-4" style={{ minHeight: '32rem' }}>
        <button
          onClick={prev}
          aria-label="Previous"
          className="text-3xl px-2 absolute left-0 top-1/2 -translate-y-1/2 z-10"
          style={{ minWidth: '48px' }}
        >
          &#8592;
        </button>
        <div className="flex flex-col items-center justify-center mx-16 w-full">
          <img src={src} alt={title.replace("'", "&apos;")} className="h-[28rem] w-auto rounded mb-4 shadow-2xl" />
          <div className="text-center">
            <div className="text-xl font-semibold">{title}</div>
            <div className="text-base mt-1">{subtitle}</div>
          </div>
        </div>
        <button
          onClick={next}
          aria-label="Next"
          className="text-3xl px-2 absolute right-0 top-1/2 -translate-y-1/2 z-10"
          style={{ minWidth: '48px' }}
        >
          &#8594;
        </button>
      </div>
    </main>
  );
}