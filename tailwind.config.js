/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mustard: 'var(--accent)',
        'mustard-dark': 'var(--primary)',
        navy: 'var(--bg)',
        'navy-light': 'var(--surface)',
        'navy-lighter': 'var(--surface-strong)',
        cream: 'var(--text)',
        'cream-dark': 'var(--muted)',
        charcoal: 'var(--muted)',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
    },
  },
  plugins: [],
};
