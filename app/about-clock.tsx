"use client";

import { useEffect, useState } from "react";

type ClockZone = "est" | "cst";

const ZONES: Record<ClockZone, { city: string; timeZone: string; zoneLabel: string }> = {
  est: {
    city: "miami, fl",
    timeZone: "America/New_York",
    zoneLabel: "EST",
  },
  cst: {
    city: "chicago, il",
    timeZone: "America/Chicago",
    zoneLabel: "CST",
  },
};

const TIME_FORMATTERS: Record<ClockZone, Intl.DateTimeFormat> = {
  est: new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZone: ZONES.est.timeZone,
  }),
  cst: new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZone: ZONES.cst.timeZone,
  }),
};

export function AboutClock() {
  const [activeZone, setActiveZone] = useState<ClockZone>("est");
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setNow(new Date()), 0);
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  const selectedZone = ZONES[activeZone];
  const formattedTime = now
    ? TIME_FORMATTERS[activeZone].format(now)
    : "--:--:--";

  return (
    <div className="about-clock-block">
      <div aria-label="Choose clock location" className="about-locations">
        {(Object.entries(ZONES) as Array<[ClockZone, (typeof ZONES)[ClockZone]]>).map(
          ([zone, details], index) => (
            <span className="about-location-choice" key={zone}>
              {index > 0 ? <span aria-hidden="true" className="about-location-separator"> &amp; </span> : null}
              <button
                aria-pressed={activeZone === zone}
                className="about-location-button"
                onClick={() => setActiveZone(zone)}
                type="button"
              >
                {details.city}
              </button>
            </span>
          ),
        )}
      </div>
      <p className="about-clock">
        <time dateTime={now?.toISOString()}>{formattedTime}</time>
        <span>{selectedZone.zoneLabel}</span>
      </p>
    </div>
  );
}
