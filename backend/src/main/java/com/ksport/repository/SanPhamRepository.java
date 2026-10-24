package com.ksport.repository;

import com.ksport.model.SanPham;
import com.ksport.model.TrangThaiKinhDoanh;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, String> {

    /**
     * Tìm sản phẩm theo mã và trạng thái kinh doanh (ẩn sản phẩm đã ngừng bán).
     * Nạp luôn danh mục bằng JOIN; ảnh và biến thể là 2 collection nên để lazy
     * (fetch join cả hai List cùng lúc gây MultipleBagFetchException).
     */
    @EntityGraph(attributePaths = "danhMuc")
    Optional<SanPham> findByMaSPAndTrangThaiKinhDoanh(String maSP, TrangThaiKinhDoanh trangThai);
}
