/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(134, 103, 255, 0.25), 0 20px 80px rgba(56, 107, 255, 0.24)",
      },
      colors: {
        slateNight: "#080D19",
        panel: "#101827",
        panelSoft: "#121D2F",
        accent: "#386BFF",
        accentSoft: "#8667FF",
      },
    },
  },
  plugins: [],
};