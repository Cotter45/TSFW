import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-theme="dim"]'],
  theme: {},
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        emerald: {
          ...require("daisyui/src/theming/themes")["emerald"],
        },
      },
      {
        dim: {
          ...require("daisyui/src/theming/themes")["dim"],
          primary: "#257A57",
        },
      },
    ],
  },
  safelist: [
    // Button Variants
    {
      pattern:
        /btn-(neutral|primary|secondary|accent|info|success|warning|error|ghost|link|outline)/,
    },
    { pattern: /btn-(lg|md|sm|xs)/ },
    { pattern: /btn-(wide|block|circle|square)/ },
    "btn-active",
    "btn-disabled",
    "glass",
    "no-animation",

    // Placeholder Modifier
    "placeholder",

    // Typography (Prose) Sizes
    {
      pattern: /prose-(sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl)/,
    },

    // Avatar Variants
    {
      pattern: /avatar-(group|online|offline)/,
    },

    // Menu Variants
    {
      pattern: /menu-(vertical|horizontal|compact)/,
    },

    // Modal Variants
    {
      pattern: /modal-(top|bottom|middle)/,
    },
    "modal-open",

    // Card Variants
    {
      pattern: /card-(bordered|compact|side|image-full|glass)/,
    },

    // Drawer Variants
    {
      pattern: /drawer-(top|bottom|left|right)/,
    },
    "drawer-open",
  ],
};
