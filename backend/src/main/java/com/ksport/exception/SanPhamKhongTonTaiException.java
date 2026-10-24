package com.ksport.exception;

public class SanPhamKhongTonTaiException extends RuntimeException {

    private final String maSP;

    public SanPhamKhongTonTaiException(String maSP) {
        super("Không tìm thấy sản phẩm có mã: " + maSP);
        this.maSP = maSP;
    }

    public String getMaSP() {
        return maSP;
    }
}
