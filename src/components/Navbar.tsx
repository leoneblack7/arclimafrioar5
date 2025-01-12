import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary">
              ArclimaFrio
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <SearchBar />
            <a href="/" className="text-gray-600 hover:text-primary transition-colors">
              Início
            </a>
            <a href="/produtos" className="text-gray-600 hover:text-primary transition-colors">
              Produtos
            </a>
            <a href="/sobre" className="text-gray-600 hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="/contato" className="text-gray-600 hover:text-primary transition-colors">
              Contato
            </a>
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="py-4">
              <SearchBar />
            </div>
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-600 hover:text-primary transition-colors">
                Início
              </a>
              <a href="/produtos" className="text-gray-600 hover:text-primary transition-colors">
                Produtos
              </a>
              <a href="/sobre" className="text-gray-600 hover:text-primary transition-colors">
                Sobre
              </a>
              <a href="/contato" className="text-gray-600 hover:text-primary transition-colors">
                Contato
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};