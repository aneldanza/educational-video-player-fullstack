import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'


export default defineConfig({
  shortcuts: {
    'primary-btn': 'border border-carribean text-white rounded-3xl py-2 px-6 cursor-pointer self-center bg-carribean'
  },
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