/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
