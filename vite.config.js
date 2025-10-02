// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        darkMode: "class", // 👈 controla via classe no <html>
        theme: {
          extend: {},
        },
      },
    }),
  ],
});
