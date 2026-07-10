"use client";

import { TypeAnimation } from "react-type-animation";
import { getServicesByCategory } from "@/lib/services";

const PAUSE_MS = 1400;

const sequence = getServicesByCategory("general").flatMap((service) => [
  service.shortLabel ?? service.title,
  PAUSE_MS,
]);

export default function HeroTypewriter() {
  return (
    <span className="inline-block w-[8em] text-left align-baseline whitespace-nowrap">
      <TypeAnimation
        sequence={sequence}
        wrapper="span"
        speed={40}
        repeat={Infinity}
        cursor
      />
    </span>
  );
}
