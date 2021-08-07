module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateColumns: {
        wordList: "repeat(4, minmax(min-content, 200px))",
      },
      animation: {
        "move-up": "move-up 0.3s ease-in-out",
        "move-down": "move-down 0.3s ease-in-out",
        "slow-spin": "spin 2.5s ease infinite",
      },
      keyframes: {
        "move-up": {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "80%": { transform: "translateY(-2px)", opacity: 0.9 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "move-down": {
          "0%": { transform: "translateY(0)", opacity: 1 },
          "80%": { transform: "translateY(2px)", opacity: 0.2 },
          "100%": { transform: "translateY(10px)", opacity: 0 },
        },
      },
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
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
