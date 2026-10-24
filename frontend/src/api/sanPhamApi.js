// Gọi API Spring Boot. Khi chạy dev, Vite chuyển tiếp /api -> http://localhost:8080 (xem vite.config.js).
// Khi deploy, đặt biến môi trường VITE_API_BASE (ví dụ https://api.ksport.vn/api).
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

/** GET /api/san-pham/{maSP} - chi tiết một sản phẩm. */
export async function layChiTietSanPham(maSP) {
  const res = await fetch(`${API_BASE}/san-pham/${encodeURIComponent(maSP)}`);
  if (!res.ok) {
    const loi = await res.json().catch(() => ({}));
    throw new Error(loi.message || "Không tải được sản phẩm");
  }
  return res.json();
}
