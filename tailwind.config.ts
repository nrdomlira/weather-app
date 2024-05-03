import type { Config } from "tailwindcss";
import {} from './public/assets/BackgroundBlur.svg'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
      backgroundImage:{
        ImgNoBlur:"url('../assets/Background.svg')",
        ImgBlur:"url('../assets/BackgroundBlur.svg')",
      }
    },
  },
  plugins: [],
};
export default config;
