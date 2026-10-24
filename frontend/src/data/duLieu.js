// Dữ liệu tĩnh của trang chủ.
// LƯU Ý: trường `ma` của sản phẩm là mã giữ chỗ để nút "Xem chi tiết" dẫn tới /san-pham/:ma.
// Hãy đổi cho khớp MaSP trong bảng SanPham của database (mặc định trang chi tiết dùng BD01).

export const danhMuc = [
  { icon: "bi-person-standing", ten: "Quần áo thể thao", moTa: "Trang phục thoải mái, phù hợp cho các hoạt động thể thao." },
  { icon: "bi-basket", ten: "Giày thể thao", moTa: "Những mẫu giày dành cho tập luyện và vận động." },
  { icon: "bi-dribbble", ten: "Dụng cụ thể thao", moTa: "Dụng cụ hỗ trợ tập luyện và chơi thể thao." },
  { icon: "bi-backpack", ten: "Phụ kiện", moTa: "Các phụ kiện tiện ích đồng hành cùng bạn khi vận động." },
];

export const sanPhamNoiBat = [
  { ma: "GIAY01", ten: "Giày thể thao PEAK", gia: 899000, anh: "giay-peak-xanh-trang.jpg" },
  { ma: "DB37", ten: "Bộ đồ đá banh màu đen", gia: 299000, anh: "bo-do-da-banh-den.jpg" },
  { ma: "GIAY02", ten: "Giày thể thao xanh dương phối xanh lá", gia: 799000, anh: "giay-the-thao-xanh-duong-xanh-la.png" },
  { ma: "PK01", ten: "Vớ thể thao nhiều màu", gia: 79000, anh: "vo-the-thao-nhieu-mau.jpg" },
  { ma: "BC01", ten: "Bóng chuyền Mikasa V200W", gia: 650000, anh: "bong-chuyen-mikasa-v200w.webp" },
  { ma: "VT01", ten: "Vợt cầu lông Flypower Black Pearl", gia: 450000, anh: "vot-cau-long-flypower-black-pear.webp" },
];

export const uuDiem = [
  { icon: "bi-patch-check-fill", ten: "Chất lượng đảm bảo", moTa: "Sản phẩm đáp ứng nhu cầu tập luyện và vận động thể thao." },
  { icon: "bi-grid-fill", ten: "Đa dạng sản phẩm", moTa: "Nhiều lựa chọn về quần áo, giày dép và dụng cụ thể thao." },
  { icon: "bi-headset", ten: "Hỗ trợ khách hàng", moTa: "Hỗ trợ khách hàng trong quá trình lựa chọn sản phẩm." },
];

export const dinhDangTien = (so) => new Intl.NumberFormat("vi-VN").format(so) + "đ";
