import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";

export default defineConfig({
  shortcuts: {
    "primary-btn":
      "border border-carribean text-white rounded-3xl py-2 px-6 cursor-pointer self-center bg-carribean",
    "secondary-btn":
      "border border-gray-200 text-black rounded-3xl py-2 px-6 cursor-pointer self-center bg-gray-200",
    "modal-custom":
      "bg-white top-1/4 lg:left-1/4 left-1/8 right-auto bottom-auto fixed lg:w-1/2 w-3/4 border border-gray-700 outline-none rounded-2xl  shadow-dark-500 ",
    "error": "text-red-700 text-sm"
  },
  darkMode: "class",
  safelist: "p-3 p-4 p-5",
  theme: {
    extend: {
      colors: {
        carribean: "#00B6EF",
      },
      fontFamily: {
        body: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
  extract: {
    include: ["./app/frontend/**/*.{js,ts,jsx,tsx}"],
  },
});
