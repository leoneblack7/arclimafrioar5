import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export const ProductActions = ({ onAddToCart, onBuyNow }: ProductActionsProps) => {
  const [showBuyNow, setShowBuyNow] = useState(false);

  const handleBuyNow = () => {
    setShowBuyNow(true);
  };

  if (showBuyNow) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Finalizar Compra</h2>
              <div className="space-y-2">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white" 
                  onClick={onBuyNow}
                >
                  Pagar com PIX
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setShowBuyNow(false)}
                >
                  Voltar
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/b628c938-51f7-44ca-9c86-ff0be454ec82.png" 
                alt="QR Code" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <Button className="flex-1 group" onClick={onAddToCart}>
        <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-bounce" />
        Adicionar ao Carrinho
      </Button>
      <Button 
        variant="secondary" 
        className="flex-1 bg-green-600 hover:bg-green-700 text-white" 
        onClick={handleBuyNow}
      >
        Comprar Agora
      </Button>
    </div>
  );
};