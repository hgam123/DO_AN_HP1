import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { layChiTietSanPham } from "../../api/sanPhamApi.js";
import { useCart } from "../../context/CartContext.jsx";
import "../../styles/chitiet.css";

const MA_MAC_DINH = "BD01";
const ANH_MINH_HOA = "⚽"; // hiện khi sản phẩm chưa có ảnh hoặc ảnh tải lỗi
const KICH_CO_FREE = "FREE"; // sản phẩm không chia size (xem bảng BienTheSanPham)

// anh trong API chỉ là tên file nằm ở public/images
const duongDanAnh = (ten) => `/images/${encodeURIComponent(ten)}`;

const dinhDangTien = (so) => new Intl.NumberFormat("vi-VN").format(so) + " ₫";
const hoacGach = (giaTri) => giaTri || "—";

export default function ChiTietSanPham() {
  const { ma = MA_MAC_DINH } = useParams();
  const { themVaoGio } = useCart();

  const [sanPham, setSanPham] = useState(null);
  const [loi, setLoi] = useState("");
  const [soLuong, setSoLuong] = useState(1);
  const [anhDangChon, setAnhDangChon] = useState(0);
  const [anhHong, setAnhHong] = useState({}); // {tênFile: true} nếu ảnh tải lỗi
  const [kichCoChon, setKichCoChon] = useState(null);
  const [mauChon, setMauChon] = useState(null);
  const [nhacChon, setNhacChon] = useState(false);
  const [hienToast, setHienToast] = useState(false);
  const toastTimer = useRef(null);

  // Tải sản phẩm mỗi khi mã trên URL thay đổi
  useEffect(() => {
    let huy = false;
    setSanPham(null);
    setLoi("");
    setSoLuong(1);
    setAnhDangChon(0);
    setAnhHong({});
    setKichCoChon(null);
    setMauChon(null);
    setNhacChon(false);

    layChiTietSanPham(ma)
      .then((data) => {
        if (huy) return;
        setSanPham(data);
        document.title = `KSport - ${data.tenSP}`;
      })
      .catch((e) => !huy && setLoi(e.message));

    return () => {
      huy = true;
    };
  }, [ma]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const sp = sanPham;
  const dangTai = !sp && !loi;

  // ----- Biến thể (size / màu) -----
  const bienThe = sp?.bienThe ?? [];
  const cacKichCo = [...new Set(bienThe.map((b) => b.kichCo))];
  const cacMau = [...new Set(bienThe.map((b) => b.mauSac).filter(Boolean))];
  const canChonSize = cacKichCo.some((k) => k !== KICH_CO_FREE);
  const canChonMau = cacMau.length > 1;

  // Chỉ có 1 lựa chọn thì tự chọn, không bắt khách bấm
  const kichCoHienTai = cacKichCo.length === 1 ? cacKichCo[0] : kichCoChon;
  const mauHienTai = cacMau.length <= 1 ? (cacMau[0] ?? "") : mauChon;
  const bienTheDaChon =
    bienThe.find((b) => b.kichCo === kichCoHienTai && b.mauSac === mauHienTai) ?? null;

  // Một size/màu còn bán được không, xét theo lựa chọn bên kia (nếu đã chọn)
  const sizeConHang = (k) =>
    bienThe.some((b) => b.kichCo === k && b.conHang && (!mauHienTai || b.mauSac === mauHienTai));
  const mauConHang = (m) =>
    bienThe.some((b) => b.mauSac === m && b.conHang && (!kichCoHienTai || b.kichCo === kichCoHienTai));

  const thieuLuaChon = [
    canChonSize && !kichCoHienTai && "size",
    canChonMau && !mauHienTai && "màu",
  ].filter(Boolean);

  const tonToiDa = bienTheDaChon ? bienTheDaChon.soLuongTon : sp?.soLuongTonKho ?? 0;
  const hetHangLuaChon = bienTheDaChon ? !bienTheDaChon.conHang : false;

  const chonKichCo = (k) => {
    setKichCoChon(k);
    setSoLuong(1);
    setNhacChon(false);
  };
  const chonMau = (m) => {
    setMauChon(m);
    setSoLuong(1);
    setNhacChon(false);
  };

  const doiSoLuong = (delta) => {
    if (!sp) return;
    const moi = soLuong + delta;
    if (moi < 1 || moi > tonToiDa) return;
    setSoLuong(moi);
  };

  const handleThemVaoGio = () => {
    if (!sp || !sp.conHang) return;
    if (!bienTheDaChon) {
      setNhacChon(true); // chưa chọn đủ size/màu
      return;
    }
    if (!bienTheDaChon.conHang) return;
    themVaoGio(soLuong);
    setHienToast(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setHienToast(false), 2000);
  };

  // ----- Ảnh -----
  const anh = sp?.anh ?? [];
  const tenAnhHienTai = anh[anhDangChon];
  const coAnh = !!tenAnhHienTai && !anhHong[tenAnhHienTai];
  const danhDauAnhHong = (ten) => setAnhHong((h) => ({ ...h, [ten]: true }));

  // Trong lúc tải hiển thị "..." như bản cũ
  const hienThi = (giaTri) => (dangTai ? "..." : hoacGach(giaTri));

  return (
    <div className="ct-page">
      <main className="ct-container">
        <div className="ct-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>›</span>
          <Link to="/san-pham">Sản phẩm</Link>
          <span>›</span>
          <span className="ct-current">{hienThi(sp?.loaiDungCu)}</span>
        </div>

        {loi && <p className="ct-error">{loi}</p>}

        {!loi && (
          <>
            <section className="ct-product-card">
              <div className="ct-gallery">
                <div className="ct-main-image">
                  {coAnh ? (
                    <img
                      className="ct-main-img"
                      src={duongDanAnh(tenAnhHienTai)}
                      alt={sp.tenSP}
                      onError={() => danhDauAnhHong(tenAnhHienTai)}
                    />
                  ) : (
                    <>
                      <div className="ct-sport-icon">{ANH_MINH_HOA}</div>
                      <div className="ct-image-label">
                        {dangTai ? "ĐANG TẢI ẢNH" : "CHƯA CÓ ẢNH"}
                      </div>
                    </>
                  )}
                </div>
                {anh.length > 1 && (
                  <div className="ct-thumbs">
                    {anh.map((ten, i) => (
                      <button
                        key={ten}
                        type="button"
                        className={`ct-thumb${i === anhDangChon ? " ct-active" : ""}`}
                        onClick={() => setAnhDangChon(i)}
                        aria-label={`Xem ảnh ${i + 1}`}
                      >
                        {anhHong[ten] ? (
                          ANH_MINH_HOA
                        ) : (
                          <img src={duongDanAnh(ten)} alt="" onError={() => danhDauAnhHong(ten)} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="ct-info">
                <div className="ct-brand">{hienThi(sp?.thuongHieu)}</div>
                <h1>{dangTai ? "Đang tải..." : sp.tenSP}</h1>

                <div className="ct-price-box">
                  <div className="ct-price">{dangTai ? "..." : dinhDangTien(sp.giaBan)}</div>
                </div>

                <div className="ct-shipping">
                  <span>🚚</span>
                  <div>
                    <b>Miễn phí vận chuyển</b>
                    <small>Cho đơn hàng từ 500.000 ₫</small>
                  </div>
                </div>

                <div className="ct-specs">
                  <div><label>Mã sản phẩm</label><strong>{hienThi(sp?.maSP)}</strong></div>
                  <div><label>Thương hiệu</label><strong>{hienThi(sp?.thuongHieu)}</strong></div>
                  <div><label>Loại dụng cụ</label><strong>{hienThi(sp?.loaiDungCu)}</strong></div>
                  <div><label>Kích thước</label><strong>{hienThi(sp?.kichThuoc)}</strong></div>
                  <div><label>Màu sắc</label><strong>{hienThi(sp?.mauSac)}</strong></div>
                </div>

                {canChonSize && (
                  <div className="ct-options">
                    <label>Kích cỡ</label>
                    <div className="ct-option-list">
                      {cacKichCo.map((k) => (
                        <button
                          key={k}
                          type="button"
                          className={`ct-option${k === kichCoHienTai ? " ct-selected" : ""}`}
                          disabled={!sizeConHang(k)}
                          title={sizeConHang(k) ? "" : "Hết hàng"}
                          onClick={() => chonKichCo(k)}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {canChonMau && (
                  <div className="ct-options">
                    <label>Màu sắc</label>
                    <div className="ct-option-list">
                      {cacMau.map((m) => (
                        <button
                          key={m}
                          type="button"
                          className={`ct-option${m === mauHienTai ? " ct-selected" : ""}`}
                          disabled={!mauConHang(m)}
                          title={mauConHang(m) ? "" : "Hết hàng"}
                          onClick={() => chonMau(m)}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {nhacChon && thieuLuaChon.length > 0 && (
                  <p className="ct-pick-warning">Vui lòng chọn {thieuLuaChon.join(" và ")} trước khi thêm vào giỏ.</p>
                )}

                <div className="ct-stock">
                  <span></span>{" "}
                  <b>
                    {dangTai
                      ? "Đang kiểm tra"
                      : !sp.conHang || hetHangLuaChon
                        ? "Hết hàng"
                        : "Còn hàng"}
                  </b>{" "}
                  <small>
                    {!sp?.conHang
                      ? ""
                      : bienTheDaChon
                        ? bienTheDaChon.conHang
                          ? `• Còn ${bienTheDaChon.soLuongTon} sản phẩm`
                          : "• Lựa chọn này đã hết, vui lòng chọn loại khác"
                        : `• Còn ${sp.soLuongTonKho} sản phẩm`}
                  </small>
                </div>

                <div className="ct-quantity">
                  <label>Số lượng</label>
                  <div className="ct-stepper">
                    <button onClick={() => doiSoLuong(-1)}>−</button>
                    <input value={soLuong} readOnly />
                    <button onClick={() => doiSoLuong(1)}>+</button>
                  </div>
                </div>

                <div className="ct-actions">
                  <button className="ct-btn ct-add" disabled={!sp?.conHang || hetHangLuaChon} onClick={handleThemVaoGio}>
                    🛒 Thêm vào giỏ hàng
                  </button>
                  <button className="ct-btn ct-buy">Mua ngay</button>
                </div>

                <div className="ct-benefits">
                  <div>✓ <span><b>Hàng chính hãng</b><small>Cam kết sản phẩm chất lượng</small></span></div>
                  <div>↻ <span><b>Đổi trả dễ dàng</b><small>Hỗ trợ đổi trả theo chính sách</small></span></div>
                  <div>🔒 <span><b>Thanh toán an toàn</b><small>Thông tin được bảo mật</small></span></div>
                </div>
              </div>
            </section>

            <section className="ct-below">
              <div className="ct-description">
                <h2>Thông tin sản phẩm</h2>
                <p>
                  {sp?.moTa ||
                    "Sản phẩm thể thao được cung cấp bởi KSport. Các thông tin dưới đây tương ứng với dữ liệu sản phẩm trong hệ thống."}
                </p>
                <table>
                  <tbody>
                    <tr><td>Mã sản phẩm</td><td>{hienThi(sp?.maSP)}</td></tr>
                    <tr><td>Tên sản phẩm</td><td>{hienThi(sp?.tenSP)}</td></tr>
                    <tr><td>Thương hiệu</td><td>{hienThi(sp?.thuongHieu)}</td></tr>
                    <tr><td>Loại dụng cụ</td><td>{hienThi(sp?.loaiDungCu)}</td></tr>
                    <tr><td>Kích thước</td><td>{hienThi(sp?.kichThuoc)}</td></tr>
                    <tr><td>Màu sắc</td><td>{hienThi(sp?.mauSac)}</td></tr>
                    <tr><td>Giá bán</td><td>{dangTai ? "..." : dinhDangTien(sp.giaBan)}</td></tr>
                    <tr><td>Số lượng tồn kho</td><td>{dangTai ? "..." : sp.soLuongTonKho}</td></tr>
                  </tbody>
                </table>
              </div>

              <aside>
                <h3>KSport</h3>
                <p>Đồ thể thao cho mọi nhu cầu luyện tập và thi đấu.</p>
                <div className="ct-mini">🚚 Giao hàng toàn quốc</div>
                <div className="ct-mini">✓ Sản phẩm chất lượng</div>
                <div className="ct-mini">💬 Hỗ trợ khách hàng</div>
              </aside>
            </section>
          </>
        )}
      </main>

      <div className={`ct-toast${hienToast ? " ct-show" : ""}`}>Đã thêm sản phẩm vào giỏ hàng ✓</div>
    </div>
  );
}
