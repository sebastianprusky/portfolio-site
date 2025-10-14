"use client";

import { useRef, useEffect, useState } from "react";

type ArtItem = { src: string; title: string; subtitle?: string; };

const artImages: ArtItem[] = [
  { src: "/restaurant.jpg", title: "red restaurant", subtitle: "oil on canvas" },
  { src: "/drive.jpg", title: "navigator", subtitle: "oil on canvas" },
  { src: "/prayingmantises.JPEG", title: "seaside", subtitle: "oil on wood board" },
  { src: "/mantissketch.jpg", title: "seaside (planning sketch)", subtitle: "" },
  { src: "/rollercoaster.jpg", title: "pit stop", subtitle: "oil on canvas" },
  { src: "/deserthaircut.jpg", title: "deserted", subtitle: "oil on wood board" },
  { src: "/desertsketch.jpg", title: "deserted (planning sketch)", subtitle: "" },
  { src: "/gate.jpg", title: "gates", subtitle: "colored pencil on watercolor paper" },
  { src: "/treeman.jpg", title: "rodeo", subtitle: "colored pencil on black paper" },
];

export default function Art() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const count = artImages.length;

  // goTo handles wrapping (looping) and centers the selected item
  const goTo = (index: number) => {
    const idx = ((index % count) + count) % count; // safe positive modulo
    setCurrent(idx);
    const el = containerRef.current?.children[idx] as HTMLElement | undefined;
    if (el) {
      // center the chosen item in the scroll container
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // center the initial item on mount
  useEffect(() => {
    goTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          className="w-full max-w-5xl mx-auto overflow-x-auto art-carousel no-scrollbar px-6 py-4 flex gap-6 snap-x snap-mandatory"
        >
          {artImages.map((item, i) => (
            <figure
              key={i}
              // avoid any shadows from global .active rules by forcing no boxShadow inline
              style={{ boxShadow: "none" }}
              className={`art-item snap-center flex-shrink-0 flex flex-col items-center ${current === i ? "active" : ""}`}
            >
              <img
                src={item.src}
                alt={item.title}
                // ensure images have no shadow or filter applied
                className="h-[28rem] w-auto object-contain shadow-none"
                style={{ filter: "none", boxShadow: "none" }}
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