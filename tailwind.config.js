/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.njk"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
