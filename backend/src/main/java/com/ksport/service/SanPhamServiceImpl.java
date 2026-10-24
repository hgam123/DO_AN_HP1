package com.ksport.service;

import com.ksport.dto.SanPhamChiTietResponse;
import com.ksport.exception.SanPhamKhongTonTaiException;
import com.ksport.model.SanPham;
import com.ksport.model.TrangThaiKinhDoanh;
import com.ksport.repository.SanPhamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SanPhamServiceImpl implements SanPhamService {

    private final SanPhamRepository sanPhamRepository;

    public SanPhamServiceImpl(SanPhamRepository sanPhamRepository) {
        this.sanPhamRepository = sanPhamRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public SanPhamChiTietResponse layChiTiet(String maSP) {
        SanPham sanPham = sanPhamRepository
                .findByMaSPAndTrangThaiKinhDoanh(maSP, TrangThaiKinhDoanh.DangKinhDoanh)
                .orElseThrow(() -> new SanPhamKhongTonTaiException(maSP));
        return SanPhamChiTietResponse.tuEntity(sanPham);
    }
}
