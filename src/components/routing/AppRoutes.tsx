import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Admin from "@/pages/Admin";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import TrackOrder from "@/pages/TrackOrder";
import About from "@/pages/About";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route 
        path="/admblackside" 
        element={
          <AuthProvider>
            <Admin />
          </AuthProvider>
        } 
      />
      <Route path="/produtos" element={<Products />} />
      <Route path="/produto/:id" element={<ProductDetail />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/rastreio" element={<TrackOrder />} />
      <Route path="/sobre" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};