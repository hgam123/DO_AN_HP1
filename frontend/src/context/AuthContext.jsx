import { createContext, useCallback, useContext, useEffect, useState } from "react";

const API = "http://localhost:8080/api/auth";
const KHOA_TOKEN = "token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [nguoiDung, setNguoiDung] = useState(null); // { hoTen, email } hoặc null
  const [dangKiemTra, setDangKiemTra] = useState(() => !!localStorage.getItem(KHOA_TOKEN));

  const dangXuat = useCallback(() => {
    localStorage.removeItem(KHOA_TOKEN);
    setNguoiDung(null);
  }, []);

  const dangNhapThanhCong = useCallback((data) => {
    localStorage.setItem(KHOA_TOKEN, data.token);
    setNguoiDung({ hoTen: data.hoTen, email: data.email });
  }, []);

  // Khi tải lại trang: dùng token đã lưu để lấy lại thông tin; token hỏng/hết hạn thì xoá.
  useEffect(() => {
    const token = localStorage.getItem(KHOA_TOKEN);
    if (!token) return;

    const huy = new AbortController();
    fetch(`${API}/toi`, { headers: { Authorization: `Bearer ${token}` }, signal: huy.signal })
      .then(async (res) => {
        if (res.ok) setNguoiDung(await res.json());
        else if (res.status === 401) dangXuat();
      })
      .catch(() => {}) // lỗi mạng: giữ token, không đăng xuất oan
      .finally(() => { if (!huy.signal.aborted) setDangKiemTra(false); });

    return () => huy.abort();
  }, [dangXuat]);

  return (
    <AuthContext.Provider value={{ nguoiDung, dangKiemTra, dangNhapThanhCong, dangXuat }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}