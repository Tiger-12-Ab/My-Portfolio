/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightgray: "#F5F5F5",
        mediumgray: "#D4D4D4",
        sloughtgray: "#F0F0F0",
        richblack: "#111111",
        darkgray: "#333333",
        mutedgray: "#666666",
        verydarkgray: "#1C1C1C",
        subtlegray: "#E0E0E0",
      },
    }
  },
  plugins: [],
}
