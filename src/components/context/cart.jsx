import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useAuth } from "./cauth"; // Assuming this provides user authentication context

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // Cart state
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  
  

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
