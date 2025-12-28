// const {
//   default: keyframes,
// } = require("react-native-reanimated/lib/typescript/css/stylesheet/keyframes");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        SourGummy: ["SourGummy"],
      },
    },
  },
  plugins: [],
};
