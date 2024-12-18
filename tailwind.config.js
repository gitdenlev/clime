/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "tomato",
          50: "#2C2C2C",
          100: "#3A3A3A",
          200: "#4A4A4A",
          text: "#E0E0E0",
          muted: "#A0A0A0",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};