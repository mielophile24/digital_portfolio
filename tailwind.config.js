/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#070605',
        coal: '#12100e',
        walnut: '#5b3a29',
        oak: '#d9995a',
        sand: '#ecdfca',
        mute: '#a39886'
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Georgia', 'sans-serif'],
        body: ['Figtree', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
