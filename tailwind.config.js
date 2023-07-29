/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700",
    },
    fontSize: {
      "2xlg": "3.75rem", // h1, 60px
      xlg: "2.375rem", // h2, 38px
      lg: "1.5rem", // h3 and used for large text, 24px
      h4: "1.375rem", // h4, 22px
      md: "1.125rem", // Medium text and h5, 18px
      base: "1rem", // Default text and h6, 16px
      sm: "0.875rem", // Small text, 14px
      xs: "0.625rem", // Extra small, 10px
    },
    extend: {
      colors: {
        primary: {
          100: "#171C1F", // bg
          200: "#1D2327", // header bg
          300: "#2b3238", // border
          400: "#353E43", // btn hover
          500: "#FFFAF0", // btn text on hover
        },
        orange: {
          100: "#FFC440",
        },
        green: {
          100: "#42c773", // main
          200: "#25C38A", // hover
        },
        neutral: {
          100: "#171717", // The darkest neutral color
          200: "#3E3E3E",
          300: "#4E4F54",
          400: "#75777E",
          500: "#90949F",
          600: "#D9D9D9",
          700: "#E9E9E9",
          800: "#F3F3F3",
          900: "#FCFCFC",
          1000: "#FFFFFF", // The brightest neutral color
        },
      },
    },
    screens: {
      "2xl": { max: "1535px" }, // => @media (max-width: 1535px)
      xl: { max: "1279px" }, // => @media (max-width: 1279px)
      lg: { max: "1023px" }, // => @media (max-width: 1023px)
      md: { max: "767px" }, // => @media (max-width: 767px)
      sm: { max: "639px" }, // => @media (max-width: 639px)
    },
  },
  plugins: [],
};
