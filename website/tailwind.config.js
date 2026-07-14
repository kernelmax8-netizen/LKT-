/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2D6A2D',
          'green-dark': '#1F4D1F',
          'green-light': '#3A8A3A',
          orange: '#E07B39',
          'orange-dark': '#C4622A',
          'orange-light': '#F09050',
          cream: '#FAF7F2',
          'cream-dark': '#F0EBE0',
          brown: '#5C3D1E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
