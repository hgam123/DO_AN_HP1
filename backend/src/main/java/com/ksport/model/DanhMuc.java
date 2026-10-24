package com.ksport.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/** Thực thể DanhMuc: Quần áo / Giày / Dụng cụ / Phụ kiện. */
@Entity
@Table(name = "DanhMuc")
public class DanhMuc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDanhMuc")
    private Integer maDanhMuc;

    @Column(name = "TenDanhMuc", nullable = false, length = 100)
    private String tenDanhMuc;

    @Column(name = "MoTa")
    private String moTa;

    /** Tên class Bootstrap Icons, ví dụ "bi-basket". */
    @Column(name = "Icon", length = 50)
    private String icon;

    @Column(name = "ThuTu", nullable = false)
    private int thuTu;

    /** JPA yêu cầu constructor mặc định. */
    protected DanhMuc() {
    }

    public Integer getMaDanhMuc() {
        return maDanhMuc;
    }

    public String getTenDanhMuc() {
        return tenDanhMuc;
    }

    public String getMoTa() {
        return moTa;
    }

    public String getIcon() {
        return icon;
    }

    public int getThuTu() {
        return thuTu;
    }
}
