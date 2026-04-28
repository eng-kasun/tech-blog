/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#faf6ee',
          100: '#f5edd9',
          200: '#ebe0c4',
          300: '#ddd0a8',
          400: '#c9b88a',
          500: '#b5a070',
          600: '#9a8558',
          700: '#7d6b45',
          800: '#5e5035',
          900: '#3f3625',
        },
        ink: {
          50: '#f5f5f0',
          100: '#d5d0c5',
          200: '#a8a090',
          300: '#7a7060',
          400: '#5c5245',
          500: '#3d352a',
          600: '#2e2820',
          700: '#1f1b16',
          800: '#15120e',
          900: '#0a0907',
        },
        accent: {
          DEFAULT: '#8b1a1a',
          light: '#b22222',
          dark: '#5c0e0e',
        },
      },
      fontFamily: {
        headline: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Lora', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
