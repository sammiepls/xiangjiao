module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['"Overpass Mono"'],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: "#ABABAB",
      lightGray: "#EBE6D9",
      lightYellow: "#FDF3E4",
      yellow: "#FDDE5E",
      darkYellow: "#E2D49B",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
