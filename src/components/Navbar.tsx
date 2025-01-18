import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { mysqlService } from "@/utils/mysqlService";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [storeName, setStoreName] = useState("ArclimaFrio");
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    const loadStoreConfig = async () => {
      const config = await mysqlService.getStoreSettings();
      if (config) {
        if (config.store_name) setStoreName(config.store_name);
        if (config.logo_url) setLogoUrl(config.logo_url);
      }
    };
    loadStoreConfig();
  }, []);

  return (
    <>
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-primary flex items-center">
                {logoUrl ? (
                  <img src={logoUrl} alt={storeName} className="h-8 mr-2" />
                ) : (
                  storeName
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <SearchBar />
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                Início
              </Link>
              <Link to="/produtos" className="text-gray-600 hover:text-primary transition-colors">
                Produtos
              </Link>
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

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="px-2 pt-2 pb-3 space-y-3">
                <SearchBar />
                <div className="flex flex-col space-y-2 mt-3">
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-primary transition-colors block px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Início
                  </Link>
                  <Link 
                    to="/produtos" 
                    className="text-gray-600 hover:text-primary transition-colors block px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Produtos
                  </Link>
                  <Link 
                    to="/sobre" 
                    className="text-gray-600 hover:text-primary transition-colors block px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sobre
                  </Link>
                  <Link 
                    to="/rastreio" 
                    className="text-gray-600 hover:text-primary transition-colors block px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Rastrear Pedido
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Spacer div to prevent content from being hidden under navbar */}
      <div className="h-16"></div>
    </>
  );
};