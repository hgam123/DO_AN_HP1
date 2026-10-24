package com.ksport.dto;

import com.ksport.model.AnhSanPham;
import com.ksport.model.SanPham;

import java.math.BigDecimal;
import java.util.List;

/**
 * Dữ liệu chi tiết sản phẩm trả về cho trang chi tiết.
 * Cố ý KHÔNG có GiaNhap (thông tin nội bộ của cửa hàng).
 * <p>
 * Các trường cũ giữ nguyên tên để frontend hiện tại không bị vỡ;
 * các trường mới (tenDanhMuc, moTa, anh, bienThe) chỉ là bổ sung.
 *
 * @param anh     tên file ảnh (ảnh chính đứng đầu); frontend ghép thành /images/{tên}
 * @param bienThe các size/màu kèm tồn kho (kể cả biến thể đã hết hàng để UI hiển thị mờ)
 */
public record SanPhamChiTietResponse(
        String maSP,
        String tenSP,
        String thuongHieu,
        String loaiDungCu,
        String tenDanhMuc,
        String kichThuoc,
        String mauSac,
        String moTa,
        BigDecimal giaBan,
        int soLuongTonKho,
        boolean conHang,
        String trangThaiKinhDoanh,
        List<String> anh,
        List<BienTheResponse> bienThe
) {
    /**
     * Chuyển entity thành DTO.
     * Phải gọi bên trong transaction vì đọc các collection lazy
     * (spring.jpa.open-in-view=false).
     */
    public static SanPhamChiTietResponse tuEntity(SanPham sp) {
        return new SanPhamChiTietResponse(
                sp.getMaSP(),
                sp.getTenSP(),
                sp.getThuongHieu(),
                sp.getLoaiDungCu(),
                sp.getDanhMuc().getTenDanhMuc(),
                sp.getKichThuoc(),
                sp.getMauSac(),
                sp.getMoTa(),
                sp.getGiaBan(),
                sp.getSoLuongTonKho(),
                sp.conHang(),
                sp.getTrangThaiKinhDoanh().name(),
                sp.getDanhSachAnh().stream().map(AnhSanPham::getDuongDan).toList(),
                sp.getDanhSachBienThe().stream().map(BienTheResponse::tuEntity).toList()
        );
    }
}
