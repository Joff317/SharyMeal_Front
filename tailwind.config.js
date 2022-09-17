/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#292929",
      black_opacity: "rgba(41, 41, 41, 0.17)",
      white_opacity: "rgba(255, 255, 255, 0.23)",
      grey: "#B8B8B8",
      "grey-border": "#ECECEC",
      /* PRIMARY */
      green: "#51DFAD",
      green_light: "#DCFFF3",
      pink: "#F4C0DB",
      red: "#FF6767",
      yellow: "#FCF087",
      success: "#00bf49"
    },
    fontFamily: {
      "bookmania-black-font": ["Bookmania_Black", "sans-serif"],
      "bookmania-bold-font": ["Bookmania_Bold", "sans-serif"],
      "bold-font": ["Circular_Bold", "sans-serif"],
      "medium-font": ["Circular_Medium", "sans-serif"],
      "light-font": ["Circular_Light", "sans-serif"],
      "book-font": ["Circular_Book", "sans-serif"],
    },
  },
  plugins: [],
};
