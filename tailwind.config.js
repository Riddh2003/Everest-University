/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ['winter', 'night']
  },
  theme: {
    extend: {},
    // colors: {
    //   'quick': '#e3f4f2',
    //   'quick-bor':'#0d9488',
    //   'quick-bg' : '#f5f5f5',
    //   'card' : '#e7f8f6'
    // },
  },
  plugins: [daisyui,require('tailwind-scrollbar-hide')],
}
