package com.ksport.controller;

import com.ksport.dto.SanPhamChiTietResponse;
import com.ksport.service.SanPhamService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/san-pham")
public class SanPhamController {

    private final SanPhamService sanPhamService;

    public SanPhamController(SanPhamService sanPhamService) {
        this.sanPhamService = sanPhamService;
    }

    /** GET /api/san-pham/{maSP} - chi tiết một sản phẩm. */
    @GetMapping("/{maSP}")
    public SanPhamChiTietResponse layChiTiet(@PathVariable String maSP) {
        return sanPhamService.layChiTiet(maSP);
    }
}
