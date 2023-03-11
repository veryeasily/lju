/**
 * @type {import('prettier').Options}
 */
const options = {
  plugins: [require("prettier-plugin-tailwindcss")],
  semi: false,
  tabWidth: 2,
  trailingComma: "all",
}

module.exports = options
