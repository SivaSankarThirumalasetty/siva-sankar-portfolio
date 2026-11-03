/** @type {import('tailwindcss').Config} */
// Colour roles: `lime` = primary accent (teal), `pink` = secondary accent (indigo).
// Values come from CSS variables in src/index.css so dark/light modes stay in sync.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jet: '#0B0D10',
        pink: { DEFAULT: v('accent-2'), ink: v('accent-2') },
        lime: { DEFAULT: v('accent'), ink: v('accent') },
        onaccent: v('on-accent'),
        // fixed shades for always-dark mock UI previews
        brandteal: '#2DD4BF',
        brandindigo: '#818CF8',
        bg: v('bg'),
        surface: v('surface'),
        fg: v('fg'),
        muted: v('muted'),
        line: v('line'),
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { label: '0.18em' },
    },
  },
  plugins: [],
};
