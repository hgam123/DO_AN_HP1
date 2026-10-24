import React, { useState } from "react";

export default function DangKy() {
  // Quản lý trạng thái form
  const [formData, setFormData] = useState({
    hoten: "",
    email: "",
    sdt: "",
    diachi: "",
    matkhau: "",
    xacnhan_matkhau: "",
  });

  // Quản lý trạng thái ẩn/hiện mật khẩu và thông báo lỗi
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    // Validate mật khẩu xác nhận
    if (formData.matkhau !== formData.xacnhan_matkhau) {
      setErrorMsg("Mật khẩu xác nhận không khớp!");
      return;
    }
    
    setErrorMsg("");

    // Map lại tên biến cho đúng với chuẩn camelCase của ThongTinDangKy.java trong Spring Boot
    const payload = {
        hoTen: formData.hoten,
        email: formData.email,
        soDienThoai: formData.sdt,
        diaChi: formData.diachi,
        matKhau: formData.matkhau
    };

    try {
        // Gọi API đến Backend Spring Boot (Nhớ đổi port nếu backend của bạn chạy port khác 8080)
        const response = await fetch("http://localhost:8080/api/dang-ky", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const textResult = await response.text();

        if (response.ok) {
            alert(textResult); // Hiện "Đăng ký thành công!"
            // Chuyển hướng sang trang đăng nhập 
            window.location.href = "/dang-nhap"; 
        } else {
            setErrorMsg(textResult); // Hiện lỗi từ backend ("Email đã sử dụng", v.v.)
        }
    } catch (error) {
        setErrorMsg("Lỗi kết nối đến server!");
    }
  };

  return (
    <div className="container my-5 py-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow" style={{ backgroundColor: "#191923", borderColor: "#818a91" }}>
            <div className="card-body p-4 p-sm-5">
              <h3 className="text-center text-success fw-bold mb-4">
                <i className="bi bi-person-plus-fill me-2"></i>Đăng ký tài khoản
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Hiện thông báo lỗi */}
                {errorMsg && (
                  <div className="alert alert-danger" role="alert">
                    {errorMsg}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="hoten" className="form-label text-white">Họ tên *</label>
                  <input type="text" className="form-control bg-dark text-light" id="hoten" name="hoten" placeholder="Nhập họ và tên" required
                    value={formData.hoten} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">Email *</label>
                  <input type="email" className="form-control bg-dark text-light" id="email" name="email" placeholder="abc@gmail.com" required
                    value={formData.email} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="sdt" className="form-label text-white">Số điện thoại *</label>
                  <input type="tel" className="form-control bg-dark text-light" id="sdt" name="sdt" placeholder="Nhập số điện thoại" required
                    value={formData.sdt} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="diachi" className="form-label text-white">Địa chỉ</label>
                  <input type="text" className="form-control bg-dark text-light" id="diachi" name="diachi" placeholder="Nhập địa chỉ"
                    value={formData.diachi} onChange={handleChange} />
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="matkhau" className="form-label text-white">Mật khẩu *</label>
                  <input type={showPassword ? "text" : "password"} className="form-control bg-dark text-light" id="matkhau" name="matkhau" placeholder="Nhập mật khẩu" required minLength="6"
                    value={formData.matkhau} onChange={handleChange} />
                  <i 
                    className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} position-absolute`} 
                    style={{ right: '10px', top: '38px', cursor: 'pointer', color: '#aaa' }}
                    onClick={togglePassword}
                  ></i>
                </div>

                <div className="mb-3">
                  <label htmlFor="xacnhan_matkhau" className="form-label text-white">Xác nhận mật khẩu *</label>
                  <input type="password" className="form-control bg-dark text-light" id="xacnhan_matkhau" name="xacnhan_matkhau" placeholder="Nhập lại mật khẩu" required
                    value={formData.xacnhan_matkhau} onChange={handleChange} />
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="dieukhoan" required />
                  <label className="form-check-label text-secondary small" htmlFor="dieukhoan">
                    Tôi đồng ý với <a href="#" className="text-success">Điều khoản sử dụng</a> và <a href="#" className="text-success">Chính sách bảo mật</a>
                  </label>
                </div>

                <button type="submit" className="btn btn-success w-100 mb-2">Đăng ký</button>
                
                <div className="text-center mt-2">
                  <a href="/" className="text-secondary small text-decoration-none"><i className="bi bi-house-door"></i> Quay lại trang chủ</a>
                </div>
                
                <p className="text-center text-secondary small mb-0 mt-3">
                  Đã có tài khoản? <a href="/dang-nhap" className="text-decoration-none text-success fw-bold">Đăng nhập ngay</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}