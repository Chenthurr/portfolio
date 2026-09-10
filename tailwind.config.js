/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accent (10%) — Sky Cyan: vibrant glow for highlights & interactive elements
        mustard: '#38BDF8',
        'mustard-dark': '#0EA5E9',
        // Dominant (60%) — Midnight Blue: deep background, reduces eye strain
        navy: '#0B0F19',
        'navy-light': '#141B2E',
        'navy-lighter': '#1E293B',
        // Secondary (30%) — Cool Gray: soft text that pops on the dark background
        cream: '#E2E8F0',
        'cream-dark': '#94A3B8',
        charcoal: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
