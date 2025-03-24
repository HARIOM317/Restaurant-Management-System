import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    historyApiFallback: true,
    headers: {
      "Permissions-Policy": "accelerometer=()",
    },
  },
  build: {
    outDir: "dist",
  },
});
