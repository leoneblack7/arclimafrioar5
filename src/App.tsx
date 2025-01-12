import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import About from "./pages/About";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  const [queryClient] = React.useState(() => new QueryClient());
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Only apply security measures in production
    if (process.env.NODE_ENV === 'production') {
      // Add security headers via meta tags
      const metaCSP = document.createElement('meta');
      metaCSP.httpEquiv = 'Content-Security-Policy';
      metaCSP.content = "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval';";
      document.head.appendChild(metaCSP);

      const metaXFrame = document.createElement('meta');
      metaXFrame.httpEquiv = 'X-Frame-Options';
      metaXFrame.content = 'SAMEORIGIN';
      document.head.appendChild(metaXFrame);

      const metaXContent = document.createElement('meta');
      metaXContent.httpEquiv = 'X-Content-Type-Options';
      metaXContent.content = 'nosniff';
      document.head.appendChild(metaXContent);

      // Check for HTTPS
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        console.warn('This site should be accessed over HTTPS for better security');
      }

      return () => {
        // Cleanup meta tags on unmount
        document.head.removeChild(metaCSP);
        document.head.removeChild(metaXFrame);
        document.head.removeChild(metaXContent);
      };
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {isAuthenticated && (
                  <Route 
                    path="/adminblack7" 
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    } 
                  />
                )}
                <Route path="/produtos" element={<Products />} />
                <Route path="/produto/:id" element={<ProductDetail />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/rastreio" element={<TrackOrder />} />
                <Route path="/sobre" element={<About />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;