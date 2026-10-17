/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FDFCF9',
          100: '#F9F6F0',
          200: '#F2ECE1',
          300: '#E7DFCF',
          400: '#D5C9B5',
          800: '#4A4237',
        },
        cinnabar: {
          50: '#FCF3F2',
          100: '#F8E4E2',
          200: '#F1CCC8',
          500: '#C24138',
          600: '#A93129',
          700: '#8A231C',
        },
        ink: {
          100: '#EBECEA',
          200: '#D2D5D0',
          400: '#7A8278',
          600: '#464E44',
          800: '#222821',
          900: '#141813',
        },
        jade: {
          50: '#F2F7F5',
          100: '#DFECE7',
          500: '#2E6F62',
          600: '#24594E',
          700: '#1B443B',
        },
        amberseal: {
          50: '#FDF8F0',
          100: '#F9EEDD',
          500: '#C88327',
          600: '#A76918',
          700: '#87510F',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        hanzi: ['"Noto Serif SC"', '"STSong"', '"Songti SC"', '"SimSun"', '"STKaiti"', '"KaiTi"', 'serif'],
      },
      boxShadow: {
        'paper': '0 2px 8px -2px rgba(34, 40, 33, 0.07), 0 1px 3px 0 rgba(34, 40, 33, 0.04)',
        'paper-hover': '0 10px 20px -4px rgba(34, 40, 33, 0.1), 0 3px 8px -1px rgba(34, 40, 33, 0.05)',
      }
    },
  },
  plugins: [],
}
