/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f0',
          100: '#f5e6d0',
          200: '#e8cca0',
          300: '#d4a574',
          400: '#c49a6c',
          500: '#b08550',
          600: '#9a7040',
          700: '#7d5a33',
          800: '#604528',
          900: '#44301c',
        },
        accent: {
          50: '#f7f0e8',
          100: '#e8d9c6',
          200: '#d4c0a0',
          300: '#c49a6c',
          400: '#b08550',
          500: '#8b6f47',
          600: '#6d573a',
          700: '#54422d',
          800: '#3c3020',
          900: '#261e14',
        },
        dark: {
          50: '#d4c5a9',
          100: '#b8a88a',
          200: '#8a7e6b',
          300: '#6d6354',
          400: '#4a4238',
          500: '#3d3529',
          600: '#2c2720',
          700: '#242019',
          800: '#1e1a14',
          900: '#1a1814',
        },
      },
      fontFamily: {
        sans: ['Source Serif 4', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'warm-glow': 'warm-glow 8s ease-in-out infinite',
      },
      keyframes: {
        'warm-glow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
