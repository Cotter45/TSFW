import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-theme="tsfwdark"]'],
  theme: {},
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        tsfwlight: {
          primary: "#257A57",
          "primary-content": "#ffffff", // Light theme uses white for primary content

          secondary: "#B7E3CB",
          "secondary-content": "#1f2937", // Darkened for improved contrast

          accent: "#6d28d9",
          "accent-content": "#ffffff", // Light content for vibrant accent color

          neutral: "#f4f4f5", // Light neutral base
          "neutral-content": "#1f1f1f", // Darkened for strong contrast

          "base-100": "#e4e4e7", // Further darker for layers
          "base-200": "#f4f4f5", // Main background is pure white
          "base-300": "#ffffff", // Slightly darker for subtle contrast
          "base-content": "#27272a", // Dark text for readability

          info: "#3b82f6", // Vibrant blue for light theme
          "info-content": "#ffffff", // White text for contrast

          success: "#10b981", // A bright green for success
          "success-content": "#ffffff", // White text for contrast

          warning: "#f59e0b", // A vibrant yellow-orange for warnings
          "warning-content": "#ffffff", // White text for legibility

          error: "#dc2626", // Bright red for errors
          "error-content": "#ffffff", // White text for visibility
        },
      },
      {
        tsfwdark: {
          primary: "#257A57",
          "primary-content": "#f4f4f5",

          secondary: "#9EDBC3",
          "secondary-content": "#27272a",

          accent: "#6d28d9",
          "accent-content": "#f4f4f5",

          neutral: "#18181b",
          "neutral-content": "#e1e1e6",

          "base-100": "#09090b",
          "base-200": "#18181b",
          "base-300": "#1f1f23",
          "base-content": "#ccd0d6",

          info: "#7dd3fc",
          "info-content": "#27272a",

          success: "#86e5ba",
          "success-content": "#27272a",

          warning: "#fef08a",
          "warning-content": "#27272a",

          error: "#dc2626",
          "error-content": "#f4f4f5",
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
  ],
};
