package com.ksport.repository; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ksport.model.NguoiDung;

@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Long> {
    
    // Kiểm tra xem Email đã tồn tại trong database chưa (Dùng cho Đăng ký)
    boolean existsByEmail(String email);
    
    // Kiểm tra xem Số điện thoại đã tồn tại chưa (Dùng cho Đăng ký)
    boolean existsBySoDienThoai(String soDienThoai);

    // Lấy thông tin user theo Email (Dùng cho Đăng nhập & Xác thực)
    NguoiDung findByEmail(String email);
}