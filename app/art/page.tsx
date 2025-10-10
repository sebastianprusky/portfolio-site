"use client";

import React, { JSX, useRef } from "react";

type ArtItem = {
  src: string;
  title: string;
  subtitle?: string;
};

const artImages: ArtItem[] = [
  { src: "/mantissketch.jpg", title: "Mantis Sketch", subtitle: "Ink on paper" },
  { src: "/desertsketch.jpg", title: "Desert Sketch", subtitle: "Pencil study" },
  { src: "/car.jpeg", title: "Car", subtitle: "Oil on canvas" },
  { src: "/drive.jpg", title: "Drive", subtitle: "Digital" },
  { src: "/rollercoaster.jpg", title: "Rollercoaster", subtitle: "Photo study" },
];

export default function Art(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollByWidth = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.75); // scroll ~75% of visible width
    el.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start relative overflow-auto px-4">
      <h1
        className="text-2xl font-semibold mb-1 text-center"
        style={{ fontFamily: "Times New Roman, Times, serif" }}
      >
        Art
      </h1>
      <div className="text-base mb-4 text-center max-w-2xl">A selection of my artwork</div>

      <div className="relative w-full flex items-center justify-center">
        {/* Left arrow (fixed position) */}
        <button
          aria-label="Previous"
          onClick={() => scrollByWidth("left")}
          className="absolute left-2 z-20 h-12 w-12 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/50"
        >
          ‹
        </button>

        {/* Scrollable carousel */}
        <div
          ref={containerRef}
          className="w-full max-w-5xl mx-auto overflow-x-auto scroll-smooth no-scrollbar px-6 py-4 flex gap-6 snap-x snap-mandatory"
          // CSS helper ensures smooth snap + scrolling behavior
        >
          {artImages.map((item, i) => (
            <figure
              key={i}
              className="snap-center flex-shrink-0 flex flex-col items-center"
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-[28rem] w-auto object-contain drop-shadow-2xl"
                style={{ display: "block" }}
              />
              <figcaption className="mt-3 text-center">
                <div className="font-semibold">{item.title}</div>
                {item.subtitle && <div className="italic text-sm">{item.subtitle}</div>}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Right arrow (fixed position) */}
        <button
          aria-label="Next"
          onClick={() => scrollByWidth("right")}
          className="absolute right-2 z-20 h-12 w-12 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/50"
        >
          ›
        </button>
      </div>
    </main>
  );
}