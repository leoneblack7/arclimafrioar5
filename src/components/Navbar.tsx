import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

          {/* Navegação Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-primary transition-colors">
              Início
            </a>
            <a href="/products" className="text-gray-600 hover:text-primary transition-colors">
              Produtos
            </a>
            <a href="/about" className="text-gray-600 hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="/contact" className="text-gray-600 hover:text-primary transition-colors">
              Contato
            </a>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>

          {/* Botão Menu Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navegação Mobile */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-600 hover:text-primary transition-colors">
                Início
              </a>
              <a href="/products" className="text-gray-600 hover:text-primary transition-colors">
                Produtos
              </a>
              <a href="/about" className="text-gray-600 hover:text-primary transition-colors">
                Sobre
              </a>
              <a href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                Contato
              </a>
              <Button variant="ghost" size="sm" className="justify-start">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Carrinho
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};