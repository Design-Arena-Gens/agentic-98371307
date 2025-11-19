import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0f172a',
        accent: '#38bdf8',
        ember: '#f97316'
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
