import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f4f0e8",
        ink: "#111111",
        muted: "#665f57",
        stone: "#d9d0c4",
        accent: "#9f2a1d",
        olive: "#677058",
        sand: "#e5ddcf"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      letterSpacing: {
        snugger: "-0.04em"
      },
      boxShadow: {
        soft: "0 24px 60px rgba(17, 17, 17, 0.08)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at top left, rgba(255,255,255,0.95), rgba(244,240,232,0.85) 40%, rgba(222,214,203,0.9) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
