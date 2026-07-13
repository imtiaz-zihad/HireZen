import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080B10",
        foreground: "#E4E7EC",
        brand: {
          indigo: "#6366f1",
          purple: "#8b5cf6",
        },
        border: "#1C2129",
        muted: "#0F1319",
        card: "#0D1117",
      },
      fontFamily: {
        heading: ["var(--font-syne)"],
        body: ["var(--font-dm-sans)"],
      },
      borderRadius: {
        xl: "0.875rem",
      },
    },
  },
  plugins: [],
};

export default config;