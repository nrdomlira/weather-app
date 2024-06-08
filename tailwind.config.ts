import type { Config } from "tailwindcss";
import {} from './src/assets/Background.svg'
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
      backgroundImage: {
        'backgroundImg': "url('../assets/Background.png')",
        'backgroundImgBlur': "url('../assets/BackgroundBlur.png')",
      },
    },
  },
  plugins: [],
};
export default config;
