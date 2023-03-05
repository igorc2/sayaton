/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 0 30px 22px rgba(0, 0, 0, 0.3)',
      }
    },
    glow: {
      colors: { // Defaults to all theme colors
        // ...
      },
      styles: { // Defaults to these values
        default: baseColor =>
          `0 1px 3px 0 rgba(${baseColor}, 0.4), 0 1px 2px 0 rgba(${baseColor}, 0.24)`,
        md: baseColor =>
          `0 4px 6px -1px rgba(${baseColor}, 0.4), 0 2px 4px -1px rgba(${baseColor}, 0.24)`,
        lg: baseColor =>
          `0 10px 15px -3px rgba(${baseColor}, 0.4), 0 4px 6px -2px rgba(${baseColor}, 0.20)`,
        xl: baseColor =>
          `0 20px 25px -5px rgba(${baseColor}, 0.4), 0 10px 10px -5px rgba(${baseColor}, 0.16)`,
        "2xl": baseColor => `0 25px 50px -12px rgba(${baseColor}, 1)`,
        outline: baseColor => `0 0 0 3px rgba(${baseColor}, 0.5)`,
        none: "none"
      }
    }
  },
  plugins: [
    require("tailwindcss-glow")(),
  ],
}
