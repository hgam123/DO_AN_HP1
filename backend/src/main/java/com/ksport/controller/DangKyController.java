package com.ksport.controller; // Sửa lại package name

import com.ksport.dto.ThongTinDangKy;
import com.ksport.model.NguoiDung;
import com.ksport.repository.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Nhớ cấu hình CrossOrigin để React gọi được API
public class DangKyController {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @PostMapping("/dang-ky")
    public ResponseEntity<?> dangKyTaiKhoan(@RequestBody ThongTinDangKy request) {
        
        // 1. Kiểm tra dữ liệu đầu vào (Tránh lỗi NullPointerException)
        if (request.getHoTen() == null || request.getHoTen().trim().isEmpty() ||
            request.getEmail() == null || request.getEmail().trim().isEmpty() ||
            request.getSoDienThoai() == null || request.getSoDienThoai().trim().isEmpty() ||
            request.getMatKhau() == null || request.getMatKhau().trim().isEmpty()) {
            
            return ResponseEntity.badRequest().body("Vui lòng điền đầy đủ thông tin bắt buộc.");
        }

        // 2. Kiểm tra trùng lặp Email / Số điện thoại
        if (nguoiDungRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email này đã được sử dụng!");
        }

        if (nguoiDungRepository.existsBySoDienThoai(request.getSoDienThoai())) {
            return ResponseEntity.badRequest().body("Số điện thoại này đã được sử dụng!");
        }

        // 3. Tạo Entity NguoiDung và lưu vào Database
        NguoiDung newUser = new NguoiDung();
        newUser.setHoTen(request.getHoTen());
        newUser.setEmail(request.getEmail());
        newUser.setSoDienThoai(request.getSoDienThoai());
        newUser.setDiaChi(request.getDiaChi());
        newUser.setMatKhau(request.getMatKhau()); 
        // Lưu ý: Các trường VaiTro, TrangThaiHoatDong, NgayTao không cần set 
        // vì SQL của bạn đã tự động cấp giá trị mặc định (DEFAULT) rồi.

        nguoiDungRepository.save(newUser);

        return ResponseEntity.ok("Đăng ký thành công!");
    }
}