"use client";

import React, { JSX, useState } from "react";


const artImages = [
  {
    src: "/restaurant.jpg",
    title: "red restaurant",
    subtitle: "oil on canvas"
  },
   {
    src: "/drive.jpg",
    title: "navigator",
    subtitle: "oil on canvas"
  },
  {
    src: "/prayingmantises.JPEG",
    title: "seaside",
    subtitle: "oil on wood board"
  },
  {
    src: "/mantissketch.jpg",
    title: "seaside (planning sketch)",
    subtitle: ""
  },
  {
    src: "/rollercoaster.jpg",
    title: "pit stop",
    subtitle: "oil on canvas"
  },
  {
    src: "/deserthaircut.jpg",
    title: "deserted",
    subtitle: "oil on wood board"
  },
  {
    src: "/desertsketch.jpg",
    title: "deserted (planning sketch)",
    subtitle: ""
  },
  {
    src: "/gate.jpg",
    title: "gates",
    subtitle: "colored pencil on watercolor paper"
  },
  {
    src: "/treeman.jpg",
    title: "rodeo",
    subtitle: "colored pencil on black paper"
  },
  
];

export default function Art(): JSX.Element {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + artImages.length) % artImages.length);
  const next = () => setCurrent((current + 1) % artImages.length);

  const { src, title, subtitle } = artImages[current];

  return (
  <main className="min-h-screen flex flex-col items-center justify-start relative overflow-auto">
    <h1 className="text-2xl font-semibold mb-1 text-center" style={{ fontFamily: 'Times New Roman, Times, serif' }}>artwork</h1>
    <div className="text-base mb-4 text-center max-w-2xl">a selection of my pieces and sketches from over the years</div>
  <div className="relative flex items-center justify-center mb-4" style={{ minHeight: '32rem', width: '820px' }}>
        <button
          onClick={prev}
          aria-label="Previous"
          className="text-3xl px-6 absolute left-0 top-1/2 -translate-y-1/2 z-10"
          style={{ minWidth: '80px' }}
        >
          &#8592;
        </button>
  <div className="flex flex-col items-center justify-center w-full">
          <img src={src} alt={title.replace("'", "&apos;")} className="h-[28rem] w-auto rounded mb-4 shadow-2xl" />
          <div className="text-center">
            <div className="text-xl font-semibold">{title}</div>
            <div className="text-base mt-1 italic">{subtitle}</div>
          </div>
        </div>
        <button
          onClick={next}
          aria-label="Next"
          className="text-3xl px-6 absolute right-0 top-1/2 -translate-y-1/2 z-10"
          style={{ minWidth: '80px' }}
        >
          &#8594;
        </button>
      </div>
    </main>
  );
}