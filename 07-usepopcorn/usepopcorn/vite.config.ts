import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// npm install --save-dev @types/node Fix path to recognize
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
