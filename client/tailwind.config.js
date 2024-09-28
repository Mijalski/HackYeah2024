/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        background:
          "linear-gradient(180deg, rgba(81,203,255,1) 0%, rgba(95,176,247,1) 100%)",
      },
      colors: {
        bgPrimary: "#E3E9EA",
      },
    },
  },
  plugins: [],
};
