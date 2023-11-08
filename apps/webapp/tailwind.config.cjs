/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  corePlugins: {
    filter: false,
  },
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", // for sidebar layout. adds grid-cols-sidebar class
      },
      gridTemplateRows: {
        header: "64px auto", // for the navbar layout. adds grid-rows-header class
      },
      colors: {
        "ll-grey": "#F1F0EE",
        "ll-black": "#2D2D2D",
        "ll-orange": "#F2733C",
        "ll-green": "#D5E0C4",
        "ll-dark-green": "#61A875",
        "ll-blue": "#81B9C6",
        "ll-dark-blue": "#617EA8",
        "ll-yellow": "#ECD371",
        "ll-tan": "#EBE6D5",
        "ll-slate": "#B1AEAE",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
      fontWeight: {
        regular: "400",
        black: "900",
      },
      spacing: {
        22: "5.5rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

module.exports = config;
