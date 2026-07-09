import type { Config } from "tailwindcss";

/*
 * Tailwind v4 reads brand tokens from the `@theme` block in
 * app/globals.css — that file is the source of truth. This config exists
 * for editor tooling/content-path awareness and to document the brand
 * rules from josbong-site-spec.md section 3:
 *
 * - navy (#000010) and orange (#F26201) are the ONLY brand colors.
 * - No tints, shades, or gradients of navy/orange — exact hex only.
 * - No opacity modifiers (bg-navy/50, text-orange/70) to fake a lighter
 *   variant — use the gray-100..gray-600 scale for muted/disabled states.
 * - Orange is an accent only: CTAs, active states, hover links, small
 *   highlights. It should occupy a small percentage of any screen.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#000010",
        orange: "#F26201",
      },
      borderRadius: {
        lg: "8px",
      },
    },
  },
};

export default config;
