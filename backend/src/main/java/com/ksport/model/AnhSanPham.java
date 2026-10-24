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

/** Ảnh của sản phẩm. DuongDan chỉ là tên file trong frontend/public/images. */
@Entity
@Table(name = "AnhSanPham")
public class AnhSanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaAnh")
    private Long maAnh;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MaSP", nullable = false)
    private SanPham sanPham;

    @Column(name = "DuongDan", nullable = false)
    private String duongDan;

    @Column(name = "LaAnhChinh", nullable = false)
    private boolean laAnhChinh;

    @Column(name = "ThuTu", nullable = false)
    private int thuTu;

    protected AnhSanPham() {
    }

    public Long getMaAnh() {
        return maAnh;
    }

    public SanPham getSanPham() {
        return sanPham;
    }

    public String getDuongDan() {
        return duongDan;
    }

    public boolean isLaAnhChinh() {
        return laAnhChinh;
    }

    public int getThuTu() {
        return thuTu;
    }
}
