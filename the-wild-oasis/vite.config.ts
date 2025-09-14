// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// vite.config.js

export default defineConfig(({ mode }) => {
  // Load env vars for the current mode into an object.
  // The third arg '' means: load ALL vars, not just VITE_*
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      // Example constant derived from an env var
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV ?? env.APP_ENV ?? "development"),
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
          exportType: "named",
          namedExport: "ReactComponent",
        },
      }),
    ],
    server: {
      // Docker-friendly + polling
      host: true,
      strictPort: true,
      watch: { usePolling: true },
      // Use VITE_PORT if provided, else APP_PORT, else default 5173
      port: env.VITE_PORT ? Number(env.VITE_PORT) : 5173,
    },
  };
});
