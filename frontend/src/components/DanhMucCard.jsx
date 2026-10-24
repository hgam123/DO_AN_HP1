import { Link } from "react-router-dom";

export default function DanhMucCard({ icon, ten, moTa }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">
      <div className="card h-100 text-center">
        <div className="card-body">
          <i className={`bi ${icon} category-icon`}></i>
          <h5 className="card-title fw-bold mt-3">{ten}</h5>
          <p className="text-secondary">{moTa}</p>
          <Link to="/#sanpham" className="btn btn-outline-success w-100">
            Xem danh mục
          </Link>
        </div>
      </div>
    </div>
  );
}
