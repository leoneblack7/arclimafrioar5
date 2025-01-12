import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Admin from "@/pages/Admin";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import TrackOrder from "@/pages/TrackOrder";
import About from "@/pages/About";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("Authenticated, rendering admin content");
  return <>{children}</>;
};

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  console.log("AppRoutes - isAuthenticated:", isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route 
        path="/adminblack7" 
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
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