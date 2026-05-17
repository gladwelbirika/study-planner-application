import tailwindcss from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lilac: "#7f07e2",
        softWhite: "#F8F8FF",
        deepBlack: "#0B0B0B",
      },
    },
  },
  plugins: [],
};