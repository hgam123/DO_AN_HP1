import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import TrangChu from "./pages/TrangChu.jsx";
import ChiTietSanPham from "./pages/Product/ChiTietSanPham.jsx";
import ChoCapNhat from "./pages/Product/ChoCapNhat.jsx";
import Dangnhap from "./pages/User/dangnhap.jsx";
import Dangky from "./pages/User/dangky.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TrangChu />} />
        {/* Không có :ma thì dùng mã mặc định BD01 như bản cũ */}
        <Route path="/san-pham" element={<ChiTietSanPham />} />
        <Route path="/san-pham/:ma" element={<ChiTietSanPham />} />
        <Route path="/dang-nhap" element={<Dangnhap/>} />
        <Route path="/dang-ky" element={<Dangky/>} />
        <Route path="*" element={<ChoCapNhat ten="Không tìm thấy trang" />} />
      </Route>
    </Routes>
  );
}
