"use client";

import { Fragment, useEffect, useState } from "react";

const SYMBOLS = "#%&*+/<=>?@[]^_{}";
const ANIMATION_SPEED = 1.5;
const FRAME_DURATION = Math.round(52 / ANIMATION_SPEED);
const REVEAL_DELAY = Math.round(58 / ANIMATION_SPEED);
const SCRAMBLE_LEAD_IN = Math.round(420 / ANIMATION_SPEED);

function symbolFor(index: number, frame: number) {
  const step = 5 + (index % 3);
  return SYMBOLS[(index * 7 + frame * step) % SYMBOLS.length];
}

type ScrambleHeadingProps = {
  accentLastWord?: boolean;
  autoPlay?: boolean;
  children: string;
  className?: string;
  id: string;
  stacked?: boolean;
};

export function ScrambleHeading({
  accentLastWord = false,
  autoPlay = false,
  children,
  className,
  id,
  stacked = true,
}: ScrambleHeadingProps) {
  const words = children.split(" ");
  const visibleCharacterCount = words.reduce((count, word) => count + word.length, 0);
  const totalDuration = SCRAMBLE_LEAD_IN + visibleCharacterCount * REVEAL_DELAY;
  const [elapsed, setElapsed] = useState(autoPlay ? 0 : totalDuration);
  const [run, setRun] = useState(autoPlay ? 1 : 0);

  useEffect(() => {
    if (run === 0) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      const nextElapsed = performance.now() - startedAt;
      setElapsed(Math.min(nextElapsed, totalDuration));
      if (nextElapsed >= totalDuration) {
        window.clearInterval(timer);
        setRun(0);
      }
    }, FRAME_DURATION);

    return () => window.clearInterval(timer);
  }, [run, totalDuration]);

  function replay() {
    setElapsed(0);
    setRun((currentRun) => currentRun + 1);
  }

  const frame = Math.floor(elapsed / FRAME_DURATION);
  const revealedCount = Math.max(0, Math.floor((elapsed - SCRAMBLE_LEAD_IN) / REVEAL_DELAY));
  let visibleIndex = 0;

  function wordClassName(wordIndex: number) {
    return accentLastWord && wordIndex === words.length - 1
      ? "scramble-word scramble-word-portfolio"
      : "scramble-word scramble-word-name";
  }

  const triggerClassName = stacked
    ? "scramble-trigger scramble-trigger-stacked"
    : "scramble-trigger scramble-trigger-inline";

  return (
    <h1 aria-label={children} className={className} id={id}>
      <button
        aria-label={`Replay ${children} animation`}
        className={triggerClassName}
        onClick={replay}
        type="button"
      >
        <span aria-hidden="true" className="scramble-reduced">
          {words.map((word, wordIndex) => (
            <Fragment key={`${word}-reduced-${wordIndex}`}>
              <span className={wordClassName(wordIndex)}>{word}</span>
              {wordIndex < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
        <span aria-hidden="true" className="scramble-text">
          {words.map((word, wordIndex) => (
            <Fragment key={`${word}-${wordIndex}`}>
              <span className={wordClassName(wordIndex)}>
                {Array.from(word).map((character, characterOffset) => {
                  const characterIndex = visibleIndex;
                  visibleIndex += 1;
                  const resolved = characterIndex < revealedCount;

                  return (
                    <span
                      className={resolved ? "scramble-character is-resolved" : "scramble-character"}
                      key={`${character}-${characterOffset}`}
                    >
                      <span className="scramble-character-width">{character}</span>
                      <span className="scramble-glyph">
                        {resolved ? character : symbolFor(characterIndex, frame)}
                      </span>
                    </span>
                  );
                })}
              </span>
              {wordIndex < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      </button>
    </h1>
  );
}
