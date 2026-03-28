import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      '@features': path.resolve(__dirname, "./src/features"),
      '@pages': path.resolve(__dirname, "./src/pages"),
      '@router': path.resolve(__dirname, "./src/router"),
      '@shared': path.resolve(__dirname, "./src/shared"),
      '@store': path.resolve(__dirname, "./src/store"),
    }
  }
});
