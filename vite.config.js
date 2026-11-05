import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" permite deployar tanto en Vercel como en GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "./",
});
