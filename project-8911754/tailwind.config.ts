/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          dark: {
            900: '#0D0D0D',
            800: '#141414',
            700: '#1A1A1A',
            600: '#262626',
            500: '#404040',
          },
          accent: {
            green: '#22C55E',
            'green-light': '#4ADE80',
            'green-dark': '#16A34A',
            emerald: '#10B981',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#A3A3A3',
            muted: '#737373',
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['Fira Code', 'monospace'],
        },
      },
    },
    plugins: [],
  }
