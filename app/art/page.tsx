"use client";

import React, { JSX, useState, useRef, useEffect } from "react";

type ArtItem = { src: string; title: string; subtitle?: string; };

const artImages: ArtItem[] = [
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.intersectionRatio > 0.6) {
            el.classList.add("active");
          } else {
            el.classList.remove("active");
          }
        });
      },
      {
        root: container,
        threshold: [0.6] // when ~60% visible within container
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + artImages.length) % artImages.length);
  const next = () => setCurrent((c) => (c + 1) % artImages.length);

  const scrollByWidth = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.75);
    el.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  const { src, title, subtitle } = artImages[current];

  return (
  <main className="min-h-screen flex flex-col items-center justify-start relative overflow-auto px-4">
    <h1 className="text-2xl font-semibold mb-1 text-center" style={{ fontFamily: "Times New Roman, Times, serif" }}>artwork</h1>
    <div className="text-base mb-4 text-center max-w-2xl">a selection of my pieces and sketches from over the years</div>

  <div className="relative w-full flex items-center justify-center mb-4" style={{ minHeight: '32rem', width: '820px' }}>
        {/* left half hit area - clicking anywhere on left side goes previous */}
        <button
          aria-label="Previous (left side)"
          onClick={prev}
          className="absolute left-0 top-0 h-full w-1/2 z-20 bg-transparent cursor-pointer"
        />

        {/* right half hit area - clicking anywhere on right side goes next */}
        <button
          aria-label="Next (right side)"
          onClick={next}
          className="absolute right-0 top-0 h-full w-1/2 z-20 bg-transparent cursor-pointer"
        />

        {/* Left arrow (visual) - fixed in viewport, wider apart */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="text-3xl px-6 z-50 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/50"
          style={{
            minWidth: '80px',
            position: 'fixed',
            left: 'calc(50% - 450px)',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          &#8592;
        </button>

        <div
          ref={containerRef}
          className="w-full max-w-5xl mx-auto overflow-x-auto art-carousel no-scrollbar px-6 py-4 flex gap-6"
        >
          {artImages.map((item, i) => (
            <figure
              key={i}
              ref={(el) => (itemRefs.current[i] = el)}
              className="art-item snap-center flex-shrink-0 flex flex-col items-center"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-[28rem] w-auto object-contain"
                loading="lazy"
              />
              <figcaption className="mt-3 text-center">
                <div className="font-semibold">{item.title}</div>
                {item.subtitle && <div className="italic text-sm">{item.subtitle}</div>}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Right arrow (visual) - fixed in viewport, wider apart */}
        <button
          onClick={next}
          aria-label="Next"
          className="text-3xl px-6 z-50 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/50"
          style={{
            minWidth: '80px',
            position: 'fixed',
            left: 'calc(50% + 450px)',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          &#8594;
        </button>
       </div>
    </main>
  );
}