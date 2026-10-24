import { Link } from "react-router-dom";

// Trang giữ chỗ cho các trang chưa chuyển sang React (đăng nhập, đăng ký...).
export default function ChoCapNhat({ ten }) {
  return (
    <section className="container my-5 text-center" style={{ minHeight: "40vh" }}>
      <h2 className="section-title">{ten}</h2>
      <p className="text-secondary">Trang này đang được chuyển sang React.</p>
      <Link to="/" className="btn btn-outline-success">Về trang chủ</Link>
    </section>
  );
}
