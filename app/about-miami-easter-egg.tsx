"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChicagoEasterEgg } from "./about-chicago-easter-egg";
import { NorthwesternEasterEgg } from "./about-northwestern-easter-egg";

const PALM_HOLD_DURATION = 3570;

const palms = [
  { className: "miami-palm miami-palm-1", label: "compact curved palm" },
  { className: "miami-palm miami-palm-2", label: "broad straight palm" },
  { className: "miami-palm miami-palm-3", label: "tall curved palm" },
  { className: "miami-palm miami-palm-4", label: "dense upright palm" },
];

export function AboutMiamiEasterEgg() {
  const [animationRun, setAnimationRun] = useState(0);
  const animationActionRef = useRef(0);
  const animationDirectionRef = useRef<"down" | "hold" | "up">("up");
  const holdTimerRef = useRef<number | null>(null);
  const palmsRef = useRef<HTMLDivElement | null>(null);
  const reverseMiamiPalmsRef = useRef<() => void>(() => {});

  const clearHoldTimer = useCallback(() => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  const monitorPalmAnimations = useCallback((
    animations: Animation[],
    direction: "down" | "up",
  ) => {
    const action = ++animationActionRef.current;

    Promise.all(animations.map((animation) => animation.finished))
      .then(() => {
        if (action !== animationActionRef.current) return;

        if (direction === "down") {
          setAnimationRun(0);
          return;
        }

        animationDirectionRef.current = "hold";
        holdTimerRef.current = window.setTimeout(() => {
          reverseMiamiPalmsRef.current();
        }, PALM_HOLD_DURATION);
      })
      .catch(() => {});
  }, []);

  const reverseMiamiPalms = useCallback(() => {
    clearHoldTimer();

    const animations = Array.from(
      palmsRef.current?.querySelectorAll<HTMLElement>(".miami-palm") ?? [],
    ).flatMap((palm) => palm.getAnimations());

    if (animations.length === 0) {
      setAnimationRun(0);
      return;
    }

    const nextDirection =
      animationDirectionRef.current === "down" ? "up" : "down";
    animationDirectionRef.current = nextDirection;
    animations.forEach((animation) => animation.reverse());
    monitorPalmAnimations(animations, nextDirection);
  }, [clearHoldTimer, monitorPalmAnimations]);

  useEffect(() => {
    reverseMiamiPalmsRef.current = reverseMiamiPalms;
  }, [reverseMiamiPalms]);

  useLayoutEffect(() => {
    if (animationRun === 0 || palmsRef.current === null) return;

    const overlay = palmsRef.current;
    const viewportHeight = window.innerHeight;
    const contactLinksRect = document
      .querySelector<HTMLElement>(".contact-links")
      ?.getBoundingClientRect();
    const contactSafeHeight =
      contactLinksRect &&
      contactLinksRect.bottom > 0 &&
      contactLinksRect.top < viewportHeight
        ? viewportHeight - contactLinksRect.bottom - 24
        : Number.POSITIVE_INFINITY;
    const textRects: DOMRect[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
      const textNode = walker.currentNode;
      const parent = textNode.parentElement;

      if (
        !parent ||
        parent.closest(".miami-palms") ||
        parent.closest("script, style") ||
        !textNode.textContent?.trim()
      ) {
        continue;
      }

      const range = document.createRange();
      range.selectNodeContents(textNode);

      for (const rect of range.getClientRects()) {
        if (rect.bottom > 0 && rect.top < viewportHeight) {
          textRects.push(rect);
        }
      }
    }

    const overlayLeft = overlay.getBoundingClientRect().left;

    overlay.querySelectorAll<HTMLElement>(".miami-palm").forEach((palm) => {
      const desiredWidth = palm.offsetWidth;
      const left = overlayLeft + palm.offsetLeft;
      const right = left + desiredWidth;
      const aspect = Number.parseFloat(
        window.getComputedStyle(palm).getPropertyValue("--palm-aspect"),
      );
      const heightFactor = Number.parseFloat(
        window.getComputedStyle(palm).getPropertyValue("--palm-height-factor"),
      );
      let safeHeight = contactSafeHeight;

      for (const rect of textRects) {
        if (rect.right + 12 > left && rect.left - 12 < right) {
          safeHeight = Math.min(safeHeight, viewportHeight - rect.bottom - 18);
        }
      }

      if (Number.isFinite(safeHeight)) {
        palm.style.width = `${Math.max(
          0,
          Math.min(desiredWidth, safeHeight * aspect * heightFactor),
        )}px`;
      }
    });

    animationDirectionRef.current = "up";
    const animations = Array.from(
      overlay.querySelectorAll<HTMLElement>(".miami-palm"),
    ).flatMap((palm) => palm.getAnimations());
    monitorPalmAnimations(animations, "up");
  }, [animationRun, monitorPalmAnimations]);

  useEffect(() => {
    return () => {
      clearHoldTimer();
      animationActionRef.current += 1;
    };
  }, [clearHoldTimer]);

  function revealMiamiPalms() {
    if (animationRun > 0) return;

    clearHoldTimer();
    setAnimationRun((currentRun) => currentRun + 1);
  }

  return (
    <>
      <p>
        I&apos;m an engineer and artist from{" "}
        <button
          className="about-miami-trigger"
          onClick={revealMiamiPalms}
          type="button"
        >
          Miami, FL
        </button>
        . My work focuses on projects that bring beauty and functionality to
        the user experience, across both visual art and tech. I&apos;m currently
        studying Computer Science and MMSS at{" "}
        <NorthwesternEasterEgg /> in <ChicagoEasterEgg />.
      </p>
      {animationRun > 0 ? (
        <div
          aria-hidden="true"
          className="miami-palms is-active"
          key={animationRun}
          ref={palmsRef}
        >
          {palms.map((palm) => (
            <span
              aria-label={palm.label}
              className={palm.className}
              key={palm.className}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
