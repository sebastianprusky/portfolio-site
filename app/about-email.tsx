"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

const EMAIL = "sebastianprusky2028@u.northwestern.edu";

function fallbackCopyEmail() {
  const field = document.createElement("textarea");
  field.value = EMAIL;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  return copied;
}

export function AboutEmail() {
  const [copied, setCopied] = useState(false);
  const [statusPosition, setStatusPosition] = useState({ x: 0, y: 0 });
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    };
  }, []);

  async function copyEmail(event: MouseEvent<HTMLButtonElement>) {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const activatedByKeyboard = event.detail === 0;
    const clickX = activatedByKeyboard ? buttonRect.left + buttonRect.width / 2 : event.clientX;
    const clickY = activatedByKeyboard ? buttonRect.bottom : event.clientY;

    setStatusPosition({
      x: Math.min(window.innerWidth - 56, Math.max(56, clickX)),
      y: Math.min(window.innerHeight - 34, clickY + 14),
    });

    let copySucceeded = false;

    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(EMAIL);
      copySucceeded = true;
    } catch {
      copySucceeded = fallbackCopyEmail();
    }

    if (!copySucceeded) return;

    setCopied(true);
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <span className="about-email-wrap">
      <button className="about-email" onClick={copyEmail} type="button">
        {EMAIL}
      </button>
      <span
        aria-live="polite"
        className="about-email-status"
        data-visible={copied ? "true" : "false"}
        role="status"
        style={{ left: statusPosition.x, top: statusPosition.y }}
      >
        {copied ? "email copied" : ""}
      </span>
    </span>
  );
}
