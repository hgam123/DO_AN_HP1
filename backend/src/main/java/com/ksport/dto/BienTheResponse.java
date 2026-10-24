package com.ksport.dto;

import com.ksport.model.BienTheSanPham;

/** Một size/màu của sản phẩm. maBienThe dùng khi thêm vào giỏ hàng. */
public record BienTheResponse(
        Long maBienThe,
        String kichCo,
        String mauSac,
        int soLuongTon,
        boolean conHang
) {
    public static BienTheResponse tuEntity(BienTheSanPham bt) {
        return new BienTheResponse(
                bt.getMaBienThe(),
                bt.getKichCo(),
                bt.getMauSac(),
                bt.getSoLuongTon(),
                bt.conHang()
        );
    }
}
