"use client";

import { TypeAnimation } from "react-type-animation";

const PAUSE_MS = 1400;

export default function HeroTypewriter() {
  return (
    <span className="inline-block w-[8em] text-left align-baseline font-semibold text-navy">
      <TypeAnimation
        sequence={[
          "Ideation",
          PAUSE_MS,
          "Research",
          PAUSE_MS,
          "Analysis",
          PAUSE_MS,
          "Consultancy",
          PAUSE_MS,
        ]}
        wrapper="span"
        speed={40}
        repeat={Infinity}
        cursor
      />
    </span>
  );
}
