/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
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
        glow: '0 0 20px rgba(76, 139, 255, 0.5)'
      }
    },
  },
  plugins: [],
}
