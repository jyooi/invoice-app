import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "10": "#ff9797",
        "11": "#f8f8fb",
        "12": "#141625",
        "01": "#7c5dfa",
        "02": "#9277ff",
        "03": "#1e2139",
        "04": "#252945",
        "05": "#dfe3fa",
        "06": "#888eb0",
        "07": "#7e88c3",
        "08": "#ec5757"
      },
      "fontSize": {
        "base": "0.8125rem",
        "lg": "0.9375rem",
        "xl": "1.5rem",
        "2xl": "2.25rem"
      },
      fontFamily: {
        "league-spartan": "League Spartan"
      },
      "borderRadius": {
        "none": "0",
        "xs": "0.09452187269926071rem",
        "sm": "0.125rem",
        "default": "0.12941250205039978rem",
        "lg": "0.16113124787807465rem",
        "xl": "0.25rem",
        "2xl": "0.375rem",
        "3xl": "0.5rem",
        "4xl": "1.25rem",
        "5xl": "1.5rem"
      }
    },
  },
  plugins: [],
} satisfies Config;
