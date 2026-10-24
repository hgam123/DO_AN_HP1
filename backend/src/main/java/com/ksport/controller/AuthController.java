package com.ksport.controller;

import com.ksport.model.NguoiDung;
import com.ksport.repository.NguoiDungRepository;
import com.ksport.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // ----- CHỨC NĂNG ĐĂNG NHẬP -----
    @PostMapping("/dang-nhap")
    public ResponseEntity<?> dangNhap(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String matKhau = request.get("matKhau");

        NguoiDung user = nguoiDungRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tài khoản không tồn tại!");
        }

        if (!user.getMatKhau().equals(matKhau)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai mật khẩu!");
        }

        String chiaKhoaToken = jwtUtil.taoChiaKhoa(user.getEmail());

        return ResponseEntity.ok(Map.of(
            "thongBao", "Đăng nhập thành công!",
            "token", chiaKhoaToken ,
             "hoTen", user.getHoTen() != null ? user.getHoTen() : user.getEmail(),
            "email", user.getEmail()
        ));
    }
    @GetMapping("/toi")
    public ResponseEntity<?> thongTinCuaToi(
            @RequestHeader(value = "Authorization", required = false) String tokenHeader) {

        if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bạn chưa đăng nhập!");
        }

        try {
            String email = jwtUtil.layEmailTuChiaKhoa(tokenHeader.substring(7));
            NguoiDung user = nguoiDungRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tài khoản không tồn tại!");
            }
            return ResponseEntity.ok(Map.of(
                "hoTen", user.getHoTen() != null ? user.getHoTen() : user.getEmail(),
                "email", user.getEmail()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Chìa khóa không hợp lệ hoặc đã hết hạn!");
        }
    }

    // ----- CHỨC NĂNG BẢO VỆ: ĐỔI MẬT KHẨU -----
    @PostMapping("/doi-mat-khau")
    public ResponseEntity<?> doiMatKhau(
            @RequestHeader(value = "Authorization", required = false) String tokenHeader,
            @RequestBody Map<String, String> request) {
        
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bạn chưa đăng nhập!");
        }

        try {
            String token = tokenHeader.substring(7); 
            String emailNguoiGoi = jwtUtil.layEmailTuChiaKhoa(token); 
            String emailMuonDoi = request.get("emailCuaTaiKhoanCanDoi");
            
            if (!emailNguoiGoi.equals(emailMuonDoi)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền đổi mật khẩu của người khác!");
            }

            NguoiDung user = nguoiDungRepository.findByEmail(emailMuonDoi);
            user.setMatKhau(request.get("matKhauMoi"));
            nguoiDungRepository.save(user);

            return ResponseEntity.ok("Đổi mật khẩu thành công!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Chìa khóa không hợp lệ hoặc đã hết hạn!");
        }
    }
}