import type { Config } from "tailwindcss";

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
        backgroundImg: "url('../assets/Background.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
