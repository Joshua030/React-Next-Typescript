/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80, // or smaller for more wrapping
  tailwindFunctions: ["clsx", "cn", "cva", "twMerge"], // Recognize these helpers
}