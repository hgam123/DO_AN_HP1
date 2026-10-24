package com.ksport.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Thực thể SanPham (mục 3.1 tài liệu Đồ án 1).
 * Chứa cả dữ liệu lẫn các hành vi nghiệp vụ liên quan đến sản phẩm
 * (kiểm tra còn hàng, kiểm tra có thể bán, kiểm tra số lượng mua...).
 */
@Entity
@Table(name = "SanPham")
public class SanPham {

    @Id
    @Column(name = "MaSP", length = 50)
    private String maSP;

    @Column(name = "TenSP", nullable = false)
    private String tenSP;

    @Column(name = "ThuongHieu", length = 100)
    private String thuongHieu;

    @Column(name = "LoaiDungCu", nullable = false, length = 100)
    private String loaiDungCu;

    @Column(name = "KichThuoc", length = 100)
    private String kichThuoc;

    @Column(name = "MauSac", length = 100)
    private String mauSac;

    @Column(name = "GiaNhap", nullable = false, precision = 15, scale = 2)
    private BigDecimal giaNhap = BigDecimal.ZERO;

    @Column(name = "GiaBan", nullable = false, precision = 15, scale = 2)
    private BigDecimal giaBan = BigDecimal.ZERO;

    @Column(name = "SoLuongTonKho", nullable = false)
    private int soLuongTonKho;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThaiKinhDoanh", nullable = false, length = 30)
    private TrangThaiKinhDoanh trangThaiKinhDoanh = TrangThaiKinhDoanh.DangKinhDoanh;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaDanhMuc", nullable = false)
    private DanhMuc danhMuc;

    @Column(name = "MoTa", columnDefinition = "TEXT")
    private String moTa;

    /** true = hiện ở mục "Sản phẩm nổi bật" trên trang chủ. */
    @Column(name = "NoiBat", nullable = false)
    private boolean noiBat;

    /** Do database tự điền (DEFAULT CURRENT_TIMESTAMP) nên entity chỉ đọc. */
    @Column(name = "NgayTao", insertable = false, updatable = false)
    private LocalDateTime ngayTao;

    /** Ảnh chính đứng trước, sau đó theo ThuTu. Lazy: chỉ đọc trong transaction. */
    @OneToMany(mappedBy = "sanPham")
    @OrderBy("laAnhChinh DESC, thuTu ASC")
    private List<AnhSanPham> danhSachAnh = new ArrayList<>();

    /** Các size/màu kèm tồn kho. Lazy: chỉ đọc trong transaction. */
    @OneToMany(mappedBy = "sanPham")
    @OrderBy("maBienThe ASC")
    private List<BienTheSanPham> danhSachBienThe = new ArrayList<>();

    /** JPA yêu cầu constructor mặc định. */
    protected SanPham() {
    }

    // ------------------------- Hành vi nghiệp vụ -------------------------

    /** Sản phẩm còn đang được bán hay không. */
    public boolean dangKinhDoanh() {
        return trangThaiKinhDoanh == TrangThaiKinhDoanh.DangKinhDoanh;
    }

    /** Còn hàng khi tồn kho > 0. */
    public boolean conHang() {
        return soLuongTonKho > 0;
    }

    /** Có thể bán khi đang kinh doanh và còn hàng. */
    public boolean coTheBan() {
        return dangKinhDoanh() && conHang();
    }

    /** Kiểm tra số lượng khách muốn mua có đáp ứng được không. */
    public boolean duSoLuong(int soLuongMua) {
        return soLuongMua > 0 && soLuongMua <= soLuongTonKho;
    }

    /** Các biến thể (size/màu) còn hàng, giữ nguyên thứ tự. */
    public List<BienTheSanPham> cacBienTheConHang() {
        return danhSachBienThe.stream().filter(BienTheSanPham::conHang).toList();
    }

    // ------------------------- Getter -------------------------

    public String getMaSP() {
        return maSP;
    }

    public String getTenSP() {
        return tenSP;
    }

    public String getThuongHieu() {
        return thuongHieu;
    }

    public String getLoaiDungCu() {
        return loaiDungCu;
    }

    public String getKichThuoc() {
        return kichThuoc;
    }

    public String getMauSac() {
        return mauSac;
    }

    /** Giá nhập là thông tin nội bộ, không được đưa ra DTO cho khách hàng. */
    public BigDecimal getGiaNhap() {
        return giaNhap;
    }

    public BigDecimal getGiaBan() {
        return giaBan;
    }

    public int getSoLuongTonKho() {
        return soLuongTonKho;
    }

    public TrangThaiKinhDoanh getTrangThaiKinhDoanh() {
        return trangThaiKinhDoanh;
    }

    public DanhMuc getDanhMuc() {
        return danhMuc;
    }

    public String getMoTa() {
        return moTa;
    }

    public boolean isNoiBat() {
        return noiBat;
    }

    public LocalDateTime getNgayTao() {
        return ngayTao;
    }

    public List<AnhSanPham> getDanhSachAnh() {
        return Collections.unmodifiableList(danhSachAnh);
    }

    public List<BienTheSanPham> getDanhSachBienThe() {
        return Collections.unmodifiableList(danhSachBienThe);
    }
}
