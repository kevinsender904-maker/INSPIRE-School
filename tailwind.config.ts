import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          light: '#3B82F6',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
        },
        teal: {
          DEFAULT: '#14B8A6',
          dark: '#0D9488',
        },
        bg: '#F8FAFC',
        surface: '#FFFFFF',
        text: '#0F172A',
        muted: '#64748B',
        danger: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Noto Naskh Arabic', 'serif'],
        'urdu-ui': ['Noto Naskh Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
