import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/ui/**/*.{js,ts,tsx,jsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            "blue-primary": "#186BD9",
            "blue-secondary": "#1200AF",
            "blue-tertiary": "#CEE3FF",
            "gray-border": "#D4D4D8",
          },
        },
      },
    }),
  ],
};

module.exports = config;
