/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0F1F",
        neonBlue: "#4C8BFF",
        neonPurple: "#A020F0",
        textWhite: "#E4E6EB",
      },
      boxShadow: {
        glow: "0 0 15px rgba(76,139,255,0.6)",
        glowPurple: "0 0 15px rgba(160,32,240,0.6)",
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)'],
        inter: ['var(--font-inter)'],
        montserrat: ['var(--font-montserrat)'],
      }
    },
  },
  plugins: [],
};
