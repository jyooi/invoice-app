import { type Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  purge: {
    enabled: true,
    content: ["./src/**/*.tsx"],
    options: {
      safelist: ["dark"], //specific classes
    },
  },

  theme: {
    extend: {
      colors: {
        "01": "#7c5dfa",
        "02": "#9277ff",
        "03": "#1e2139",
        "04": "#252945",
        "05": "#dfe3fa",
        "06": "#888eb0",
        "07": "#7e88c3",
        "08": "#0c0e16",
        "09": "#ec5757",
        "10": "#FF9797",
        "11": "#f8f8fb",
        "12": "#141625",
        "13": "#F9FAFE",
        "14": "#373B53",
        "15": "#494E6E",
        "status-green": "#33D69F",
        "status-orange": "#FF8F00",
        "status-gray": "#373B53",
      },
      fontSize: {
        base: "0.8125rem",
        lg: "0.9375rem",
        xl: "1.5rem",
        "2xl": "2.25rem",
      },
      fontFamily: {
        sans: ["League Spartan"],
      },
      borderRadius: {
        none: "0",
        xs: "0.09452187269926071rem",
        sm: "0.125rem",
        default: "0.12941250205039978rem",
        lg: "0.16113124787807465rem",
        xl: "0.25rem",
        "2xl": "0.375rem",
        "3xl": "0.5rem",
        "4xl": "1.25rem",
        "5xl": "1.5rem",
      },
    },
    screens: {
      mobile: "375px",
      tablet: "768px",
      desktop: "1440px",
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
