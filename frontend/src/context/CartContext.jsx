import { createContext, useContext, useState } from "react";

// Tạm thời giỏ hàng chỉ đếm ở phía giao diện; API giỏ hàng sẽ làm sau.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [soLuongTrongGio, setSoLuongTrongGio] = useState(0);
  const themVaoGio = (soLuong) => setSoLuongTrongGio((n) => n + soLuong);
  return (
    <CartContext.Provider value={{ soLuongTrongGio, themVaoGio }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
