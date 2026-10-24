# SportWearShop
Đồ án học phần 1 - Ứng dụng bán quần áo và dụng cụ thể thao

## Cấu trúc thư mục
```
SportWearShop/
├── frontend/                    # React (Vite) + Bootstrap
│   ├── index.html               # khung rỗng, chứa <div id="root">
│   ├── package.json, vite.config.js
│   ├── public/images/           # ảnh tĩnh (truy cập bằng /images/...)
│   ├── legacy/pages/            # dangnhap.html, dangky.html cũ (chưa chuyển sang React)
│   └── src/
│       ├── main.jsx, App.jsx    # điểm vào + khai báo route
│       ├── api/                 # sanPhamApi.js (gọi backend)
│       ├── components/          # Layout, Header, Footer, DanhMucCard, SanPhamCard, ScrollToHash
│       ├── context/             # CartContext (đếm giỏ hàng)
│       ├── data/                # duLieu.js (dữ liệu tĩnh trang chủ)
│       ├── pages/               # TrangChu, ChiTietSanPham, ChoCapNhat
│       └── styles/              # global.css, chitiet.css
├── backend/                     # Spring Boot + MySQL
└── database/ksport.sql          # schema + dữ liệu mẫu (MySQL 8, InnoDB)
```

## Chạy dự án
- Database: import `database/ksport.sql` (tạo database `ksport`; script DROP rồi tạo lại toàn bộ bảng).
- Backend: `cd backend && mvn spring-boot:run` (cổng 8080, cần MySQL database `ksport`).
- Frontend: `cd frontend && npm install && npm run dev` rồi mở http://localhost:5173
  (Vite tự chuyển tiếp `/api` sang backend 8080).
- Trang chủ: `/`  —  Trang chi tiết: `/san-pham/BD01`
- Build: `npm run build` (ra thư mục `dist/`). Nếu deploy riêng, đặt `VITE_API_BASE`.

## Database
Bảng chính: `DanhMuc`, `SanPham`, `BienTheSanPham` (tồn kho theo size/màu), `AnhSanPham`,
`GioHang`/`ChiTietGioHang`, `HoaDon`/`ChiTietHoaDon`, `NguoiDung`, `LichSuHoatDong`.
- `SanPham.SoLuongTonKho` = tổng tồn các biến thể, do trigger tự cập nhật. Khi bán hàng hãy trừ
  `BienTheSanPham.SoLuongTon`, không sửa cột tổng trực tiếp.
- Sản phẩm không chia size dùng một biến thể có `KichCo = 'FREE'`.
- `AnhSanPham.DuongDan` là tên file trong `frontend/public/images/`.

## API
- `GET /api/san-pham/{maSP}` - chi tiết sản phẩm: thông tin, `moTa`, `tenDanhMuc`,
  `anh` (danh sách tên file) và `bienThe` (size/màu + tồn kho). Không trả `GiaNhap`.
