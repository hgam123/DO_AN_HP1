-- =====================================================================
-- KSport v2 - Schema cho website bán quần áo & dụng cụ thể thao
-- MySQL 8.x | InnoDB | utf8mb4
--
-- CẢNH BÁO: script này DROP toàn bộ bảng cũ rồi tạo lại.
-- Hãy backup nếu database hiện tại có dữ liệu thật.
--
-- Tương thích ngược: bảng SanPham GIỮ NGUYÊN các cột mà entity
-- com.ksport.model.SanPham đang map => backend chạy không cần sửa code.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `ksport`
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ksport`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `ChiTietGioHang`;
DROP TABLE IF EXISTS `GioHang`;
DROP TABLE IF EXISTS `ChiTietHoaDon`;
DROP TABLE IF EXISTS `HoaDon`;
DROP TABLE IF EXISTS `LichSuHoatDong`;
DROP TABLE IF EXISTS `AnhSanPham`;
DROP TABLE IF EXISTS `BienTheSanPham`;
DROP TABLE IF EXISTS `SanPham`;
DROP TABLE IF EXISTS `DanhMuc`;
DROP TABLE IF EXISTS `NguoiDung`;
-- Các bảng viết thường do dump cũ tạo trên Windows (MySQL tự hạ chữ thường)
DROP TABLE IF EXISTS `chitiethoadon`, `hoadon`, `lichsuhoatdong`, `nguoidung`, `sanpham`;

SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------
-- 1. NguoiDung
-- ---------------------------------------------------------------------
CREATE TABLE `NguoiDung` (
  `MaNguoiDung`       BIGINT       NOT NULL AUTO_INCREMENT,
  `HoTen`             VARCHAR(150) NOT NULL,
  `Email`             VARCHAR(150) NOT NULL,
  `SoDienThoai`       VARCHAR(20)  NOT NULL,
  `MatKhau`           VARCHAR(255) NOT NULL COMMENT 'Chỉ lưu hash (BCrypt), không lưu mật khẩu thô',
  `DiaChi`            VARCHAR(500) DEFAULT NULL,
  `VaiTro`            VARCHAR(30)  NOT NULL DEFAULT 'KhachHang',
  `TrangThaiHoatDong` VARCHAR(30)  NOT NULL DEFAULT 'HoatDong',
  `NgayTao`           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaNguoiDung`),
  UNIQUE KEY `UQ_NguoiDung_Email` (`Email`),
  UNIQUE KEY `UQ_NguoiDung_SoDienThoai` (`SoDienThoai`),
  CONSTRAINT `CK_NguoiDung_VaiTro` CHECK (`VaiTro` IN ('KhachHang','QuanLy')),
  CONSTRAINT `CK_NguoiDung_TrangThai` CHECK (`TrangThaiHoatDong` IN ('HoatDong','Khoa'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 2. DanhMuc  (4 danh mục đang hardcode trong frontend/src/data/duLieu.js)
-- ---------------------------------------------------------------------
CREATE TABLE `DanhMuc` (
  `MaDanhMuc`  INT          NOT NULL AUTO_INCREMENT,
  `TenDanhMuc` VARCHAR(100) NOT NULL,
  `MoTa`       VARCHAR(255) DEFAULT NULL,
  `Icon`       VARCHAR(50)  DEFAULT NULL COMMENT 'Tên class Bootstrap Icons, vd: bi-basket',
  `ThuTu`      INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`MaDanhMuc`),
  UNIQUE KEY `UQ_DanhMuc_Ten` (`TenDanhMuc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 3. SanPham
--    - Giữ nguyên: MaSP, TenSP, ThuongHieu, LoaiDungCu, KichThuoc, MauSac,
--      GiaNhap, GiaBan, SoLuongTonKho, TrangThaiKinhDoanh (entity đang dùng)
--    - SoLuongTonKho = tổng tồn của các biến thể (trigger tự cập nhật)
--    - Bỏ cột `images` (thay bằng bảng AnhSanPham) và `SizeTonKho`
--      (chuỗi "M:20,L:20" khó truy vấn, thay bằng bảng BienTheSanPham)
-- ---------------------------------------------------------------------
CREATE TABLE `SanPham` (
  `MaSP`               VARCHAR(50)   NOT NULL,
  `MaDanhMuc`          INT           NOT NULL,
  `TenSP`              VARCHAR(255)  NOT NULL,
  `ThuongHieu`         VARCHAR(100)  DEFAULT NULL,
  `LoaiDungCu`         VARCHAR(100)  NOT NULL,
  `KichThuoc`          VARCHAR(100)  DEFAULT NULL COMMENT 'Thông số hiển thị (vd: 183x61cm, Số 5)',
  `MauSac`             VARCHAR(100)  DEFAULT NULL COMMENT 'Màu hiển thị',
  `MoTa`               TEXT          DEFAULT NULL,
  `GiaNhap`            DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `GiaBan`             DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `SoLuongTonKho`      INT           NOT NULL DEFAULT 0 COMMENT 'Tổng tồn các biến thể - do trigger cập nhật',
  `TrangThaiKinhDoanh` VARCHAR(30)   NOT NULL DEFAULT 'DangKinhDoanh',
  `NoiBat`             TINYINT(1)    NOT NULL DEFAULT 0 COMMENT '1 = hiện ở mục Sản phẩm nổi bật trang chủ',
  `NgayTao`            DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaSP`),
  KEY `IX_SanPham_DanhMuc`   (`MaDanhMuc`),
  KEY `IX_SanPham_TenSP`     (`TenSP`(100)),
  KEY `IX_SanPham_ThuongHieu` (`ThuongHieu`),
  KEY `IX_SanPham_GiaBan`    (`GiaBan`),
  KEY `IX_SanPham_TrangThai` (`TrangThaiKinhDoanh`),
  KEY `IX_SanPham_NoiBat`    (`NoiBat`),
  CONSTRAINT `FK_SanPham_DanhMuc` FOREIGN KEY (`MaDanhMuc`) REFERENCES `DanhMuc` (`MaDanhMuc`),
  CONSTRAINT `CK_SanPham_Gia` CHECK (`GiaNhap` >= 0 AND `GiaBan` >= 0),
  CONSTRAINT `CK_SanPham_Ton` CHECK (`SoLuongTonKho` >= 0),
  -- Trùng với enum TrangThaiKinhDoanh trong backend
  CONSTRAINT `CK_SanPham_TrangThai` CHECK (`TrangThaiKinhDoanh` IN ('DangKinhDoanh','NgungKinhDoanh'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 4. AnhSanPham  (trang chi tiết có thư viện nhiều ảnh)
--    DuongDan chỉ lưu tên file; frontend ghép thành /images/<DuongDan>
-- ---------------------------------------------------------------------
CREATE TABLE `AnhSanPham` (
  `MaAnh`      BIGINT       NOT NULL AUTO_INCREMENT,
  `MaSP`       VARCHAR(50)  NOT NULL,
  `DuongDan`   VARCHAR(255) NOT NULL,
  `LaAnhChinh` TINYINT(1)   NOT NULL DEFAULT 0,
  `ThuTu`      INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`MaAnh`),
  KEY `IX_AnhSanPham_MaSP` (`MaSP`),
  CONSTRAINT `FK_AnhSanPham_SanPham` FOREIGN KEY (`MaSP`) REFERENCES `SanPham` (`MaSP`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 5. BienTheSanPham  (tồn kho theo size + màu)
--    Sản phẩm không chia size dùng 1 biến thể với KichCo = 'FREE'
--    (không dùng NULL vì UNIQUE KEY coi các NULL là khác nhau)
-- ---------------------------------------------------------------------
CREATE TABLE `BienTheSanPham` (
  `MaBienThe`  BIGINT       NOT NULL AUTO_INCREMENT,
  `MaSP`       VARCHAR(50)  NOT NULL,
  `KichCo`     VARCHAR(30)  NOT NULL DEFAULT 'FREE',
  `MauSac`     VARCHAR(50)  NOT NULL DEFAULT '',
  `SoLuongTon` INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (`MaBienThe`),
  UNIQUE KEY `UQ_BienThe_SP_Size_Mau` (`MaSP`,`KichCo`,`MauSac`),
  CONSTRAINT `FK_BienThe_SanPham` FOREIGN KEY (`MaSP`) REFERENCES `SanPham` (`MaSP`)
    ON DELETE CASCADE,
  CONSTRAINT `CK_BienThe_Ton` CHECK (`SoLuongTon` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 6. GioHang / ChiTietGioHang  (hiện giỏ hàng mới chỉ đếm ở React state)
-- ---------------------------------------------------------------------
CREATE TABLE `GioHang` (
  `MaGioHang`   BIGINT   NOT NULL AUTO_INCREMENT,
  `MaNguoiDung` BIGINT   NOT NULL,
  `NgayCapNhat` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`MaGioHang`),
  UNIQUE KEY `UQ_GioHang_NguoiDung` (`MaNguoiDung`),
  CONSTRAINT `FK_GioHang_NguoiDung` FOREIGN KEY (`MaNguoiDung`) REFERENCES `NguoiDung` (`MaNguoiDung`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ChiTietGioHang` (
  `MaGioHang` BIGINT NOT NULL,
  `MaBienThe` BIGINT NOT NULL,
  `SoLuong`   INT    NOT NULL,
  PRIMARY KEY (`MaGioHang`,`MaBienThe`),
  KEY `IX_CTGH_BienThe` (`MaBienThe`),
  CONSTRAINT `FK_CTGH_GioHang` FOREIGN KEY (`MaGioHang`) REFERENCES `GioHang` (`MaGioHang`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_CTGH_BienThe` FOREIGN KEY (`MaBienThe`) REFERENCES `BienTheSanPham` (`MaBienThe`),
  CONSTRAINT `CK_CTGH_SoLuong` CHECK (`SoLuong` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 7. HoaDon / ChiTietHoaDon
--    Lưu "ảnh chụp" tên/size/màu/đơn giá tại thời điểm mua để sau này
--    đổi giá hay xóa sản phẩm thì hóa đơn cũ không bị sai.
-- ---------------------------------------------------------------------
CREATE TABLE `HoaDon` (
  `MaHoaDon`            BIGINT        NOT NULL AUTO_INCREMENT,
  `NgayLap`             DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MaKhachHang`         BIGINT        NOT NULL,
  `TenNguoiNhan`        VARCHAR(150)  NOT NULL,
  `SoDienThoaiNhan`     VARCHAR(20)   NOT NULL,
  `DiaChiGiaoHang`      VARCHAR(500)  NOT NULL,
  `GhiChu`              VARCHAR(500)  DEFAULT NULL,
  `PhuongThucThanhToan` VARCHAR(30)   NOT NULL DEFAULT 'COD',
  `TrangThaiHoaDon`     VARCHAR(30)   NOT NULL DEFAULT 'ChoThanhToan',
  `TienHang`            DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `PhiVanChuyen`        DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'Miễn phí cho đơn từ 500.000đ (theo trang chi tiết)',
  `TongTien`            DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`MaHoaDon`),
  KEY `IX_HoaDon_MaKhachHang` (`MaKhachHang`),
  KEY `IX_HoaDon_NgayLap`     (`NgayLap`),
  KEY `IX_HoaDon_TrangThai`   (`TrangThaiHoaDon`),
  CONSTRAINT `FK_HoaDon_NguoiDung` FOREIGN KEY (`MaKhachHang`) REFERENCES `NguoiDung` (`MaNguoiDung`),
  CONSTRAINT `CK_HoaDon_PhuongThuc` CHECK (`PhuongThucThanhToan` IN ('COD','ChuyenKhoan')),
  CONSTRAINT `CK_HoaDon_TrangThai`  CHECK (`TrangThaiHoaDon` IN
      ('ChoThanhToan','DaThanhToan','DangGiao','HoanThanh','DaHuy')),
  CONSTRAINT `CK_HoaDon_Tien` CHECK (`TienHang` >= 0 AND `PhiVanChuyen` >= 0 AND `TongTien` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ChiTietHoaDon` (
  `MaHoaDon` BIGINT        NOT NULL,
  `MaBienThe` BIGINT       NOT NULL,
  `MaSP`     VARCHAR(50)   NOT NULL,
  `TenSP`    VARCHAR(255)  NOT NULL,
  `KichCo`   VARCHAR(30)   NOT NULL,
  `MauSac`   VARCHAR(50)   NOT NULL DEFAULT '',
  `SoLuong`  INT           NOT NULL,
  `DonGia`   DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`MaHoaDon`,`MaBienThe`),
  KEY `IX_CTHD_BienThe` (`MaBienThe`),
  KEY `IX_CTHD_SanPham` (`MaSP`),
  CONSTRAINT `FK_CTHD_HoaDon`  FOREIGN KEY (`MaHoaDon`)  REFERENCES `HoaDon` (`MaHoaDon`) ON DELETE CASCADE,
  CONSTRAINT `FK_CTHD_BienThe` FOREIGN KEY (`MaBienThe`) REFERENCES `BienTheSanPham` (`MaBienThe`),
  CONSTRAINT `FK_CTHD_SanPham` FOREIGN KEY (`MaSP`)      REFERENCES `SanPham` (`MaSP`),
  CONSTRAINT `CK_CTHD_SoLuong` CHECK (`SoLuong` > 0),
  CONSTRAINT `CK_CTHD_DonGia`  CHECK (`DonGia` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 8. LichSuHoatDong (audit log)
--    MaNguoiDung cho phép NULL (hành động hệ thống / chưa đăng nhập).
-- ---------------------------------------------------------------------
CREATE TABLE `LichSuHoatDong` (
  `MaLog`        BIGINT       NOT NULL AUTO_INCREMENT,
  `ThoiGian`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `MaNguoiDung`  BIGINT       DEFAULT NULL,
  `HanhDong`     VARCHAR(100) NOT NULL,
  `LoaiDoiTuong` VARCHAR(100) NOT NULL,
  `MaDoiTuong`   VARCHAR(100) NOT NULL,
  `GiaTriCu`     TEXT         DEFAULT NULL,
  `GiaTriMoi`    TEXT         DEFAULT NULL,
  PRIMARY KEY (`MaLog`),
  KEY `IX_LichSu_NguoiDung` (`MaNguoiDung`),
  KEY `IX_LichSu_ThoiGian`  (`ThoiGian`),
  CONSTRAINT `FK_LichSu_NguoiDung` FOREIGN KEY (`MaNguoiDung`) REFERENCES `NguoiDung` (`MaNguoiDung`)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 9. Trigger: SanPham.SoLuongTonKho = SUM(BienTheSanPham.SoLuongTon)
-- ---------------------------------------------------------------------
DELIMITER $$

CREATE TRIGGER `trg_BienThe_AI` AFTER INSERT ON `BienTheSanPham`
FOR EACH ROW
BEGIN
  UPDATE `SanPham`
     SET `SoLuongTonKho` = (SELECT COALESCE(SUM(`SoLuongTon`),0) FROM `BienTheSanPham` WHERE `MaSP` = NEW.`MaSP`)
   WHERE `MaSP` = NEW.`MaSP`;
END$$

CREATE TRIGGER `trg_BienThe_AU` AFTER UPDATE ON `BienTheSanPham`
FOR EACH ROW
BEGIN
  UPDATE `SanPham`
     SET `SoLuongTonKho` = (SELECT COALESCE(SUM(`SoLuongTon`),0) FROM `BienTheSanPham` WHERE `MaSP` = NEW.`MaSP`)
   WHERE `MaSP` = NEW.`MaSP`;
  IF OLD.`MaSP` <> NEW.`MaSP` THEN
    UPDATE `SanPham`
       SET `SoLuongTonKho` = (SELECT COALESCE(SUM(`SoLuongTon`),0) FROM `BienTheSanPham` WHERE `MaSP` = OLD.`MaSP`)
     WHERE `MaSP` = OLD.`MaSP`;
  END IF;
END$$

CREATE TRIGGER `trg_BienThe_AD` AFTER DELETE ON `BienTheSanPham`
FOR EACH ROW
BEGIN
  UPDATE `SanPham`
     SET `SoLuongTonKho` = (SELECT COALESCE(SUM(`SoLuongTon`),0) FROM `BienTheSanPham` WHERE `MaSP` = OLD.`MaSP`)
   WHERE `MaSP` = OLD.`MaSP`;
END$$

DELIMITER ;

-- =====================================================================
-- DỮ LIỆU MẪU (khớp frontend/src/data/duLieu.js)
-- =====================================================================

INSERT INTO `NguoiDung` (`MaNguoiDung`,`HoTen`,`Email`,`SoDienThoai`,`MatKhau`,`DiaChi`,`VaiTro`,`TrangThaiHoatDong`) VALUES
(1,'Quản lý KSport','quanly@ksport.vn','0900000001','MAT_KHAU_HASH_SPRING_SECURITY','Cần Thơ','QuanLy','HoatDong'),
(2,'Nguyễn Văn A','khachhang@example.com','0900000002','MAT_KHAU_HASH_SPRING_SECURITY','Cần Thơ','KhachHang','HoatDong');

INSERT INTO `DanhMuc` (`MaDanhMuc`,`TenDanhMuc`,`MoTa`,`Icon`,`ThuTu`) VALUES
(1,'Quần áo thể thao','Trang phục thoải mái, phù hợp cho các hoạt động thể thao.','bi-person-standing',1),
(2,'Giày thể thao','Những mẫu giày dành cho tập luyện và vận động.','bi-basket',2),
(3,'Dụng cụ thể thao','Dụng cụ hỗ trợ tập luyện và chơi thể thao.','bi-dribbble',3),
(4,'Phụ kiện','Các phụ kiện tiện ích đồng hành cùng bạn khi vận động.','bi-backpack',4);

-- SoLuongTonKho để 0, trigger sẽ tự cộng từ biến thể bên dưới.
-- GiaNhap là số GIẢ ĐỊNH (ước ~65-70% giá bán) - hãy sửa theo giá nhập thật.
INSERT INTO `SanPham`
(`MaSP`,`MaDanhMuc`,`TenSP`,`ThuongHieu`,`LoaiDungCu`,`KichThuoc`,`MauSac`,`MoTa`,`GiaNhap`,`GiaBan`,`SoLuongTonKho`,`TrangThaiKinhDoanh`,`NoiBat`) VALUES
('GIAY01',2,'Giày thể thao PEAK','PEAK','Giày thể thao','39 - 43','Xanh/Trắng','Giày thể thao PEAK êm chân, phù hợp chạy bộ và tập luyện hằng ngày.',600000,899000,0,'DangKinhDoanh',1),
('DB37',1,'Bộ đồ đá banh màu đen','Không thương hiệu','Quần áo thể thao','M/L/XL','Đen','Bộ quần áo đá banh thấm hút mồ hôi, co giãn thoải mái.',200000,299000,0,'DangKinhDoanh',1),
('GIAY02',2,'Giày thể thao xanh dương phối xanh lá','Không thương hiệu','Giày thể thao','39 - 43','Xanh dương/Xanh lá','Giày thể thao phối màu nổi bật, đế êm, nhẹ.',520000,799000,0,'DangKinhDoanh',1),
('PK01',4,'Vớ thể thao nhiều màu','Không thương hiệu','Phụ kiện','Free size','Nhiều màu','Vớ thể thao cotton thoáng khí, nhiều màu.',40000,79000,0,'DangKinhDoanh',1),
('BC01',3,'Bóng chuyền Mikasa V200W','Mikasa','Dụng cụ bóng chuyền','Số 5','Trắng/Xanh/Vàng','Bóng chuyền thi đấu Mikasa V200W.',450000,650000,0,'DangKinhDoanh',1),
('VT01',3,'Vợt cầu lông Flypower Black Pearl','Flypower','Dụng cụ cầu lông','4U','Đen','Vợt cầu lông Flypower Black Pearl nhẹ, cân bằng.',300000,450000,0,'DangKinhDoanh',1),
('BD01',3,'Bóng đá','Adidas','Dụng cụ bóng đá','Số 5','Trắng/Đen','Bóng đá size 5 dùng cho sân cỏ nhân tạo.',300000,500000,0,'DangKinhDoanh',0),
('TG01',3,'Thảm tập yoga','Không thương hiệu','Dụng cụ tập luyện','183x61cm','Tím','Thảm yoga chống trượt, dày 6mm.',180000,300000,0,'DangKinhDoanh',0);

-- Ảnh: tên file nằm trong frontend/public/images/
-- BD01, TG01 chưa có ảnh trong thư mục => bổ sung sau (frontend sẽ dùng ảnh minh họa).
INSERT INTO `AnhSanPham` (`MaSP`,`DuongDan`,`LaAnhChinh`,`ThuTu`) VALUES
('GIAY01','giay-peak-xanh-trang.jpg',1,1),
('DB37','bo-do-da-banh-den.jpg',1,1),
('GIAY02','giay-the-thao-xanh-duong-xanh-la.png',1,1),
('PK01','vo-the-thao-nhieu-mau.jpg',1,1),
('BC01','bong-chuyen-mikasa-v200w.webp',1,1),
('VT01','vot-cau-long-flypower-black-pear.webp',1,1);

-- Biến thể / tồn kho (tổng mỗi SP = tổng các dòng)
INSERT INTO `BienTheSanPham` (`MaSP`,`KichCo`,`MauSac`,`SoLuongTon`) VALUES
('GIAY01','39','Xanh/Trắng',8),
('GIAY01','40','Xanh/Trắng',10),
('GIAY01','41','Xanh/Trắng',10),
('GIAY01','42','Xanh/Trắng',8),
('GIAY01','43','Xanh/Trắng',4),
('GIAY02','39','Xanh dương/Xanh lá',6),
('GIAY02','40','Xanh dương/Xanh lá',8),
('GIAY02','41','Xanh dương/Xanh lá',8),
('GIAY02','42','Xanh dương/Xanh lá',6),
('GIAY02','43','Xanh dương/Xanh lá',2),
('DB37','M','Đen',20),
('DB37','L','Đen',20),
('DB37','XL','Đen',10),
('PK01','FREE','Nhiều màu',100),
('BC01','FREE','Trắng/Xanh/Vàng',15),
('VT01','FREE','Đen',20),
('BD01','FREE','Trắng/Đen',30),
('TG01','FREE','Tím',25);
