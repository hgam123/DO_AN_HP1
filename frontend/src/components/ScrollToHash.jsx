import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Link dạng "/#danhmuc" không tự cuộn khi dùng React Router, nên xử lý ở đây.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // đợi trang render xong rồi mới cuộn
      setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
