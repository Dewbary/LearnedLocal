/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    filter: false,
  },
  daisyui: {
    themes: false,
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
        "ll-dark-grey": "#374957",
        "ll-black": "#2D2D2D",
        "ll-orange": "#F2733C",
        "ll-green": "#D5E0C4",
        "ll-dark-green": "#61A875",
        "ll-blue": "#81B9C6",
        "ll-dark-blue": "#617EA8",
        "ll-yellow": "#ECD371",
        "ll-tan": "#EBE6D5",
        "ll-slate": "#B1AEAE",

        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
        },
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
    borderRadius: {
      "tremor-small": "0.375rem",
      "tremor-default": "0.5rem",
      "tremor-full": "9999px",
    },
    fontSize: {
      "tremor-label": "0.75rem",
      "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
      "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
      "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

module.exports = config;
