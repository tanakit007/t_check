import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/t_check/", // ตรวจสอบว่ามีเครื่องหมาย / ปิดท้ายชื่อ repository
});
