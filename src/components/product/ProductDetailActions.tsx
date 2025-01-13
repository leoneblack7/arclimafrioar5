import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductDetailActionsProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
}

export const ProductDetailActions = ({ onBuyNow, onAddToCart }: ProductDetailActionsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Button 
        className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 font-semibold" 
        onClick={onBuyNow}
      >
        COMPRAR AGORA
      </Button>
      <Button 
        variant="outline"
        className="w-full text-lg py-6 flex items-center justify-center gap-2" 
        onClick={onAddToCart}
      >
        <ShoppingCart className="h-5 w-5" />
        Adicionar ao Carrinho
      </Button>
    </div>
  );
};