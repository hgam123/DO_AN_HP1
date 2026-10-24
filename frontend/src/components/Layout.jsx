import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ScrollToHash from "./ScrollToHash.jsx";

// Khung chung: Header + nội dung trang + Footer
export default function Layout() {
  return (
    <>
      <ScrollToHash />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
