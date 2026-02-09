import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/t_check/", // ต้องตรงกับชื่อ repository บน GitHub ของคุณ
});
