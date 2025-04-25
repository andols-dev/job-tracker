// use daisyui
/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const tailwindConfig = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindcss, autoprefixer, daisyui],
  darkMode: "class",
};