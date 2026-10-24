import { danhMuc, sanPhamNoiBat, uuDiem } from "../data/duLieu.js";
import DanhMucCard from "../components/DanhMucCard.jsx";
import SanPhamCard from "../components/SanPhamCard.jsx";

export default function TrangChu() {
  return (
    <>
      {/* ===== BANNER ===== */}
      <section className="container-fluid p-0">
        <img src="/images/banner-ksport.png" className="img-fluid w-100"
             alt="KSport - Thoải mái vận động, sẵn sàng bứt phá" />
      </section>

      {/* ===== GIỚI THIỆU ===== */}
      <section className="container my-5 text-center" id="gioithieu">
        <h2 className="section-title">
          Chào mừng đến với <span className="text-success">KSport</span>
        </h2>
        <p className="text-secondary">
          KSport chuyên cung cấp quần áo, giày dép và dụng cụ thể thao chất lượng,
          giúp bạn tự tin vận động và theo đuổi đam mê thể thao.
        </p>
      </section>

      {/* ===== DANH MỤC SẢN PHẨM ===== */}
      <section className="container my-5" id="danhmuc">
        <h2 className="text-center section-title">
          Danh mục <span className="text-success">sản phẩm</span>
        </h2>
        <div className="row">
          {danhMuc.map((dm) => (
            <DanhMucCard key={dm.ten} {...dm} />
          ))}
        </div>
      </section>

      {/* ===== SẢN PHẨM NỔI BẬT ===== */}
      <section className="container my-5" id="sanpham">
        <h2 className="text-center section-title">
          Sản phẩm <span className="text-success">nổi bật</span>
        </h2>
        <div className="row">
          {sanPhamNoiBat.map((sp) => (
            <SanPhamCard key={sp.ma} {...sp} />
          ))}
        </div>
      </section>

      {/* ===== VÌ SAO CHỌN KSPORT ===== */}
      <section className="container my-5">
        <h2 className="text-center section-title">
          Vì sao chọn <span className="text-success">KSport?</span>
        </h2>
        <div className="row">
          {uuDiem.map((ud) => (
            <div className="col-12 col-md-4 mb-4" key={ud.ten}>
              <div className="card h-100 text-center">
                <div className="card-body">
                  <i className={`bi ${ud.icon} benefit-icon`}></i>
                  <h5 className="fw-bold mt-3">{ud.ten}</h5>
                  <p className="text-secondary">{ud.moTa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
