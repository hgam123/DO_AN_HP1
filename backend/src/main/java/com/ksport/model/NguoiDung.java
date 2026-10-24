package com.ksport.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "NguoiDung") // Đổi tên bảng cho khớp chính xác với SQL
public class NguoiDung {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNguoiDung") // Ép Spring Boot hiểu 'id' chính là cột 'MaNguoiDung'
    private Long id; 

    @Column(name = "HoTen")
    private String hoTen;

    @Column(name = "Email")
    private String email;

    @Column(name = "SoDienThoai")
    private String soDienThoai;

    @Column(name = "DiaChi")
    private String diaChi;

    @Column(name = "MatKhau")
    private String matKhau;

    // (Tùy chọn) Mình khai báo thêm 2 trường này để lấy giá trị mặc định từ CSDL lên nếu cần
    @Column(name = "VaiTro", insertable = false, updatable = false)
    private String vaiTro;

    @Column(name = "TrangThaiHoatDong", insertable = false, updatable = false)
    private String trangThaiHoatDong;


    // --- Các hàm Getter và Setter bên dưới giữ nguyên y như cũ ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getSoDienThoai() { return soDienThoai; }
    public void setSoDienThoai(String soDienThoai) { this.soDienThoai = soDienThoai; }
    
    public String getDiaChi() { return diaChi; }
    public void setDiaChi(String diaChi) { this.diaChi = diaChi; }
    
    public String getMatKhau() { return matKhau; }
    public void setMatKhau(String matKhau) { this.matKhau = matKhau; }
    
    public String getVaiTro() { return vaiTro; }
    public void setVaiTro(String vaiTro) { this.vaiTro = vaiTro; }

    public String getTrangThaiHoatDong() { return trangThaiHoatDong; }
    public void setTrangThaiHoatDong(String trangThaiHoatDong) { this.trangThaiHoatDong = trangThaiHoatDong; }
}