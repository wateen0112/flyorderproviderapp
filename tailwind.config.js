/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: '#f8ad24',
          100: '#feefd3',
          200: '#fcdea7',
          300: '#fbce7c',
          400: '#f9bd50',
          500: '#f8ad24',
          600: '#c68a1d',
          700: '#956816',
          800: '#63450e',
          900: '#322307',
        },
      },
    },
  },
}
