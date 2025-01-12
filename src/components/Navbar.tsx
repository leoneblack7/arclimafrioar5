import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [logoUrl, setLogoUrl] = useState("");
  const [storeName, setStoreName] = useState("ArclimaFrio");

  useEffect(() => {
    const storedLogoUrl = localStorage.getItem("storeLogoUrl");
    const storedName = localStorage.getItem("storeName");
    if (storedLogoUrl) setLogoUrl(storedLogoUrl);
    if (storedName) setStoreName(storedName);
  }, []);

  const scrollToProducts = () => {
    if (location.pathname === '/') {
      const productsSection = document.getElementById('products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#products-section';
    }
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              {logoUrl ? (
                <img src={logoUrl} alt={storeName} className="h-12 w-auto" />
              ) : (
                <span>{storeName}</span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <SearchBar />
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              Início
            </Link>
            <button 
              onClick={scrollToProducts}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Produtos
            </button>
            <Link to="/sobre" className="text-gray-600 hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link to="/rastreio" className="text-gray-600 hover:text-primary transition-colors">
              Rastrear Pedido
            </Link>
            <CartDrawer />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <CartDrawer />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="py-4">
              <SearchBar />
            </div>
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                Início
              </Link>
              <button 
                onClick={scrollToProducts}
                className="text-left text-gray-600 hover:text-primary transition-colors"
              >
                Produtos
              </button>
              <Link to="/sobre" className="text-gray-600 hover:text-primary transition-colors">
                Sobre
              </Link>
              <Link to="/rastreio" className="text-gray-600 hover:text-primary transition-colors">
                Rastrear Pedido
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
