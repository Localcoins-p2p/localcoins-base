/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'border-gradient': 'linear-gradient(180deg, #C98B00 0%, #F3AA05 36.5%)',
      },
      fontFamily: {
        sans: ['var(--font-heading)'],
      },
      colors: {
        primary: '#0DCE71',
        secondary: '#002B14',
        'green-cyan': '#496757',
        'milk-white': '#F5FFFA',
        'cool-grey': '#9D9D9D',
      },
    },
  },
  plugins: [],
};
