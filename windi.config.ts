import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  safelist: 'p-3 p-4 p-5',
  theme: {
    extend: {
      colors: {
        teal: {
          100: '#096',
        },
      },
      fontFamily: {
        body: ["Outfit", "sans-serif"]
      }
    },
  },
  plugins: [formsPlugin],
  extract: {
    include: [
        './app/frontend/**/*.{js,ts,jsx,tsx}',

    ]
  }
})