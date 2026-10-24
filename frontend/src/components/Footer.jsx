import { Link } from "react-router-dom";

const lienKet = [
  { to: "/", ten: "Trang chủ" },
  { to: "/#danhmuc", ten: "Danh mục sản phẩm" },
  { to: "/#sanpham", ten: "Sản phẩm nổi bật" },
  { to: "/#gioithieu", ten: "Giới thiệu" },
];

export default function Footer() {
  return (
    <footer className="footer mt-5 pt-5 pb-3" id="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-4">
            <h5 className="fw-bold text-success">
              <i className="bi bi-lightning-charge-fill"></i> KSport
            </h5>
            <p className="text-secondary">
              KSport - Đồng hành cùng bạn trên hành trình vận động và chinh phục những thử thách mới.
            </p>
            <p className="text-secondary">
              <i className="bi bi-geo-alt-fill text-success"></i> Cần Thơ, Việt Nam
            </p>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Liên kết nhanh</h5>
            <ul className="list-unstyled">
              {lienKet.map((lk) => (
                <li className="mb-2" key={lk.ten}>
                  <Link to={lk.to} className="text-secondary text-decoration-none">
                    <i className="bi bi-chevron-right"></i> {lk.ten}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Thông tin liên hệ</h5>
            <p className="text-secondary">
              <i className="bi bi-telephone-fill text-success"></i> Hotline: 0123 456 789
            </p>
            <p className="text-secondary">
              <i className="bi bi-envelope-fill text-success"></i> Email: ksport@gmail.com
            </p>
            <h6 className="fw-bold">Theo dõi chúng tôi</h6>
            <div className="d-flex gap-3">
              {["bi-facebook", "bi-instagram", "bi-tiktok"].map((icon) => (
                <a href="#" className="btn btn-outline-success" key={icon} onClick={(e) => e.preventDefault()}>
                  <i className={`bi ${icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-secondary" />
        <div className="text-center text-secondary">
          <p className="mb-1">© 2026 KSport. All rights reserved.</p>
          <p className="mb-0">Thoải mái vận động, sẵn sàng bứt phá.</p>
        </div>
      </div>
    </footer>
  );
}
