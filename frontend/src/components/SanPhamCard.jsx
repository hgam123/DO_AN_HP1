import { Link } from "react-router-dom";
import { dinhDangTien } from "../data/duLieu.js";

export default function SanPhamCard({ ma, ten, gia, anh }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-4">
      <div className="card h-100">
        <img src={`/images/${anh}`} className="card-img-top product-img" alt={ten} />
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{ten}</h5>
          <p className="card-text text-success fw-bold">{dinhDangTien(gia)}</p>
          <Link to={`/san-pham/${ma}`} className="btn btn-outline-success">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
