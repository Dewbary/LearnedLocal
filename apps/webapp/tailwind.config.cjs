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
        "ll-tan": "#EECF9f",
        "ll-orange": "#FB982D",
        "ll-orange-dark": "#FF7119",
        "ll-blue": "#02747A",
        "ll-gray": "#EEEAE6",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        regular: "400",
        black: "900",
      },
      spacing: {
        '22': '5.5rem'
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

module.exports = config;
