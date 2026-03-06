import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",   // 🔥 এটা খুব গুরুত্বপূর্ণ
  plugins: [react(), tailwindcss()],
});