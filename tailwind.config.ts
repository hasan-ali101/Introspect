import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config = withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "dark-primary": "#38396F",
        "dark-secondary": "#7e80e7",
        "dark-tertiary": "#696aca80",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        stars: {
          "0%": { opacity: "0.1" },
          "50%": { opacity: "0.9" },
          "100%": { opacity: "0.1" },
        },
        "shooting-star": {
          "0%": { transform: "translate(0, 100vh)" },
          "100%": { transform: "translate(100vw, -100vh)" },
        },
        "shooting-star-2": {
          "0%": { transform: "translate(100vw, 20vh)" },
          "10%": { transform: "translate(100vw, 20vh)" },
          "35%": { transform: "translate(0, 60vh)" },
          "100%": {
            transform: "translate(10vw, 80vh)",
          } /* Keep the last frame the same to create a pause effect */,
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        stars: "stars 2.5s infinite ease-in-out",
        "shooting-star": "shooting-star 6s infinite",
        "shooting-star-slow": "shooting-star 10s infinite",
        "shooting-star-2": "shooting-star-2 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/line-clamp")],
}) satisfies Config;

export default config;
