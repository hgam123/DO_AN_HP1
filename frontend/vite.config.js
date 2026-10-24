import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev: frontend chạy ở http://localhost:5173, mọi request /api được chuyển tiếp
// sang backend Spring Boot (http://localhost:8080) nên không bị lỗi CORS.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
