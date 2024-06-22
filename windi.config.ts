import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'


export default defineConfig({
  darkMode: 'class',
  safelist: 'p-3 p-4 p-5',
  theme: {
    extend: {
      colors: {
        carribean: "#00B6EF",
      },
      fontFamily: {
        body: ["Outfit", "sans-serif"]
      }
    },
  },
  plugins: [
  ],
  extract: {
    include: [
        './app/frontend/**/*.{js,ts,jsx,tsx}',

    ]
  }
})