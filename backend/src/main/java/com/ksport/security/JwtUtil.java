package com.ksport.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    
    // Đặt mật khẩu thô (Phải dài trên 32 ký tự để đảm bảo an toàn)
    private final String SECRET_STRING = "KSport_Bi_Mat_Khong_Duoc_Tiet_Lo_Cho_Ai_Do_An_Tot_Nghiep";
    
    // Chuyển mật khẩu thô thành một chiếc "Chìa khóa" mã hóa để JWT dùng
    private final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET_STRING.getBytes());
    
    // Chìa khóa có hiệu lực trong 24 giờ
    private final long EXPIRATION_TIME = 86400000;

    // Cấp chìa khóa khi đăng nhập thành công
    public String taoChiaKhoa(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // Đọc email từ chìa khóa khách gửi lên để xác thực
    public String layEmailTuChiaKhoa(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}