import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand core — locked per identity guide
        espresso: "#1A120A", // primary dark background
        amber: {
          DEFAULT: "#EF9311", // primary accent (CTAs, links, highlights)
          light: "#FFB86C", // gradient endpoint / hover glow
        },
        // Supporting warm neutrals derived from the two brand anchors,
        // so light mode and dark mode share the same temperature.
        surface: {
          dark: "#241811", // card/panel background on dark
          darkRaised: "#2E2013", // slightly raised panel (header, terminal)
          light: "#FFFFFF",
          cream: "#FBF5EE", // page background on light mode
        },
        ink: {
          DEFAULT: "#1A120A", // body text on light mode (mirrors bg-dark)
          muted: "#8A7864", // secondary text on light mode
        },
        parchment: {
          DEFAULT: "#FBF3E8", // body text on dark mode
          muted: "#B7A493", // secondary text on dark mode
        },
        border: {
          dark: "#3A2A18",
          light: "#EDE1D3",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "amber-gradient": "linear-gradient(135deg, #EF9311 0%, #FFB86C 100%)",
        "ember-radial":
          "radial-gradient(60% 50% at 50% 0%, rgba(239,147,17,0.16) 0%, rgba(239,147,17,0) 70%)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(239,147,17,0.35)" },
          "50%": { boxShadow: "0 0 0 8px rgba(239,147,17,0)" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        rise: "rise 0.5s ease-out both",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
