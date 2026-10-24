package com.ksport.service;

import com.ksport.dto.SanPhamChiTietResponse;

public interface SanPhamService {

    /**
     * Lấy chi tiết sản phẩm đang kinh doanh.
     *
     * @throws com.ksport.exception.SanPhamKhongTonTaiException nếu không có hoặc đã ngừng kinh doanh
     */
    SanPhamChiTietResponse layChiTiet(String maSP);
}
