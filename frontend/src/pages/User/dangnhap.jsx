import React, { useState } from "react";

export default function DangNhap() {
  const [formData, setFormData] = useState({
    email: "",
    matkhau: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Chuẩn bị dữ liệu gửi đi (Map đúng tên biến mà Backend đang chờ)
    const payload = {
        email: formData.email,
        matKhau: formData.matkhau // Chữ 'K' viết hoa cho khớp với map request bên backend
    };

    try {
        // Gọi API đến Backend Spring Boot
        const response = await fetch("http://localhost:8080/api/auth/dang-nhap", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // Nếu API trả về thành công (Mã 200 OK)
        if (response.ok) {
            const data = await response.json(); // Lấy cục JSON trả về (gồm thongBao và token)
            
            // 1. Lưu "Chìa khóa" vào trình duyệt để xài sau này
            localStorage.setItem("token", data.token);
            
            // 2. Thông báo thành công
            alert(data.thongBao); 
            
            // 3. Chuyển hướng về trang chủ (hoặc trang dashboard)
            window.location.href = "/"; 
        } else {
            // Nếu sai mật khẩu hoặc không có tài khoản (Backend trả về chữ)
            const textError = await response.text();
            setErrorMsg(textError); 
        }
    } catch (error) {
        setErrorMsg("Lỗi kết nối đến server! Vui lòng kiểm tra lại Backend.");
    }
  };

  return (
    <div className="container my-5 py-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow" style={{ backgroundColor: "#191923", borderColor: "#343a40" }}>
            <div className="card-body p-4 p-sm-5">
              <h3 className="text-center text-success fw-bold mb-4">
                <i className="bi bi-box-arrow-in-right me-2"></i>Đăng nhập
              </h3>
              
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div className="alert alert-danger" role="alert">
                    {errorMsg}
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="email" className="form-label text-white">Email hoặc Số điện thoại</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark text-light" 
                    id="email" 
                    name="email"
                    placeholder="Nhập email hoặc số điện thoại" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-4 position-relative">
                  <label htmlFor="matkhau" className="form-label text-white">Mật khẩu</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="form-control bg-dark text-light" 
                    id="matkhau" 
                    name="matkhau"
                    placeholder="Nhập mật khẩu" 
                    required 
                    value={formData.matkhau}
                    onChange={handleChange}
                  />
                  <i 
                    className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} position-absolute`} 
                    style={{ right: '10px', top: '38px', cursor: 'pointer', color: '#aaa' }}
                    onClick={togglePassword}
                  ></i>
                </div>
                
                <div className="d-flex justify-content-end mb-3">
                  <a href="#" className="text-success text-decoration-none small ms-auto">Quên mật khẩu?</a>
                </div>
                
                <button type="submit" className="btn btn-success w-100 fw-bold mb-3">Đăng nhập</button>

                <div className="text-center mt-2">
                  <a href="/" className="text-secondary small text-decoration-none"><i className="bi bi-house-door"></i> Quay lại trang chủ</a>
                </div>

                <p className="text-center text-secondary small mb-0 mt-3">
                  Chưa có tài khoản? <a href="/dang-ky" className="text-success fw-bold text-decoration-none">Đăng ký ngay</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}