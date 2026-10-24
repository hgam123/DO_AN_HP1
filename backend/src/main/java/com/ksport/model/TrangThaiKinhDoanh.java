package com.ksport.model;

/**
 * Trạng thái kinh doanh của sản phẩm.
 * Tên hằng số trùng với giá trị lưu trong cột SanPham.TrangThaiKinhDoanh.
 */
public enum TrangThaiKinhDoanh {
    DangKinhDoanh("Đang kinh doanh"),
    NgungKinhDoanh("Ngừng kinh doanh");

    private final String moTa;

    TrangThaiKinhDoanh(String moTa) {
        this.moTa = moTa;
    }

    public String getMoTa() {
        return moTa;
    }
}
