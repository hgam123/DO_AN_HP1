import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const mucDanhMuc = ["Quần áo thể thao", "Giày thể thao", "Dụng cụ thể thao", "Phụ kiện"];

export default function Header() {
  const { soLuongTrongGio } = useCart();

  return (
    <header id="header">
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success" to="/">
            <i className="bi bi-lightning-charge-fill"></i> KSport
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                  Trang chủ <i className="bi bi-house-door-fill"></i>
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                   onClick={(e) => e.preventDefault()}>
                  Danh mục <i className="bi bi-list"></i>
                </a>
                <ul className="dropdown-menu">
                  {mucDanhMuc.map((ten) => (
                    <li key={ten}>
                      <Link className="dropdown-item" to="/#danhmuc">{ten}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/#gioithieu">
                  Giới thiệu <i className="bi bi-info-circle"></i>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/#footer">
                  Liên hệ <i className="bi bi-telephone-fill"></i>
                </Link>
              </li>
            </ul>

            <form className="d-flex me-lg-3 mb-2 mb-lg-0" role="search" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control form-control-dark me-2" type="search"
                     placeholder="Tìm kiếm sản phẩm" aria-label="Tìm kiếm sản phẩm" />
              <button className="btn btn-outline-success" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>

            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-outline-light position-relative" type="button">
                Giỏ hàng <i className="bi bi-cart4"></i>
                {soLuongTrongGio > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success cart-badge">
                    {soLuongTrongGio}
                  </span>
                )}
              </button>
              <Link className="btn btn-outline-success" to="/dang-nhap">Đăng nhập</Link>
              <Link className="btn btn-success" to="/dang-ky">Đăng ký</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
