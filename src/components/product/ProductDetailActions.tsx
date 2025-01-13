import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

interface ProductDetailActionsProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
}

export const ProductDetailActions = ({ onBuyNow, onAddToCart }: ProductDetailActionsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <Button 
        className="w-full bg-green-500 hover:bg-green-600 text-lg py-6" 
        onClick={onBuyNow}
      >
        COMPRAR AGORA
      </Button>
      <Button 
        variant="outline"
        className="w-full text-lg py-6" 
        onClick={onAddToCart}
      >
        Adicionar ao Carrinho
      </Button>
    </div>
  );
};