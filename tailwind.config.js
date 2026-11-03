/** @type {import('tailwindcss').Config} */
// Colour roles: `lime` = primary accent (champagne gold), `pink` = secondary accent (violet).
// Values come from CSS variables in src/index.css so dark/light modes stay in sync.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jet: '#0A0E1A',
        pink: { DEFAULT: v('accent-2'), ink: v('accent-2') },
        lime: { DEFAULT: v('accent'), ink: v('accent') },
        onaccent: v('on-accent'),
        // fixed shades for always-dark mock UI previews
        brandteal: '#E8C872',   // gold on dark previews
        brandindigo: '#A78BFA', // violet on dark previews
        bg: v('bg'),
        surface: v('surface'),
        fg: v('fg'),
        muted: v('muted'),
        line: v('line'),
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { label: '0.18em' },
    },
  },
  plugins: [],
};
