"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type TrainRun = {
  height: number;
  id: number;
  top: number;
};

export function ChicagoEasterEgg() {
  const [trainRun, setTrainRun] = useState<TrainRun | null>(null);
  const animationActionRef = useRef(0);
  const runnerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!trainRun || !runnerRef.current) return;

    const [animation] = runnerRef.current.getAnimations();
    if (!animation) return;

    const action = ++animationActionRef.current;
    animation.finished
      .then(() => {
        if (action === animationActionRef.current) setTrainRun(null);
      })
      .catch(() => {});
  }, [trainRun]);

  function driveChicagoTrain() {
    if (trainRun && runnerRef.current) {
      const [animation] = runnerRef.current.getAnimations();

      if (!animation) {
        setTrainRun(null);
        return;
      }

      const action = ++animationActionRef.current;
      animation.reverse();
      animation.finished
        .then(() => {
          if (action === animationActionRef.current) setTrainRun(null);
        })
        .catch(() => {});
      return;
    }

    const headerRect = document
      .querySelector<HTMLElement>(".site-header")
      ?.getBoundingClientRect();
    const headerBottom = Math.max(12, headerRect?.bottom ?? 78);
    const visibleContentTops = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".about-heading, .about-clock, .about-copy p, .contact-links",
      ),
    )
      .map((element) => element.getBoundingClientRect())
      .filter(
        (rect) =>
          rect.bottom > headerBottom + 24 && rect.top > headerBottom + 24,
      )
      .map((rect) => rect.top);
    const contentTop = Math.min(...visibleContentTops, window.innerHeight);
    const openSpace = Math.max(64, contentTop - headerBottom);
    const maximumHeight = window.innerWidth <= 650 ? 68 : 112;
    const height = Math.min(maximumHeight, Math.max(48, openSpace * 0.56));
    const top = headerBottom + (openSpace - height) / 2;

    setTrainRun((currentRun) => ({
      height,
      id: (currentRun?.id ?? 0) + 1,
      top,
    }));
  }

  return (
    <>
      <button
        className="about-chicago-trigger"
        onClick={driveChicagoTrain}
        type="button"
      >
        Chicago, IL
      </button>
      {trainRun ? (
        <div
          aria-hidden="true"
          className="chicago-train-track"
          key={trainRun.id}
          style={
            {
              "--train-height": `${trainRun.height}px`,
              "--train-top": `${trainRun.top}px`,
            } as CSSProperties
          }
        >
          <span className="chicago-train-runner" ref={runnerRef}>
            <span className="chicago-train" />
          </span>
        </div>
      ) : null}
    </>
  );
}
