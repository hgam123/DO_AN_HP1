package com.ksport.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Biến thể (size + màu) của sản phẩm và tồn kho của nó.
 * Sản phẩm không chia size có đúng một biến thể với kichCo = "FREE".
 */
@Entity
@Table(name = "BienTheSanPham")
public class BienTheSanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaBienThe")
    private Long maBienThe;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaSP", nullable = false)
    private SanPham sanPham;

    @Column(name = "KichCo", nullable = false, length = 30)
    private String kichCo;

    @Column(name = "MauSac", nullable = false, length = 50)
    private String mauSac;

    @Column(name = "SoLuongTon", nullable = false)
    private int soLuongTon;

    protected BienTheSanPham() {
    }

    /** Biến thể còn hàng khi tồn > 0. */
    public boolean conHang() {
        return soLuongTon > 0;
    }

    /** Kiểm tra số lượng khách muốn mua có đáp ứng được không. */
    public boolean duSoLuong(int soLuongMua) {
        return soLuongMua > 0 && soLuongMua <= soLuongTon;
    }

    public Long getMaBienThe() {
        return maBienThe;
    }

    public SanPham getSanPham() {
        return sanPham;
    }

    public String getKichCo() {
        return kichCo;
    }

    public String getMauSac() {
        return mauSac;
    }

    public int getSoLuongTon() {
        return soLuongTon;
    }
}
