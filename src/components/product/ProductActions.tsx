import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export const ProductActions = ({ onAddToCart, onBuyNow }: ProductActionsProps) => {
  return (
    <div className="flex gap-4">
      <Button className="flex-1 group" onClick={onAddToCart}>
        <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-bounce" />
        Adicionar ao Carrinho
      </Button>
      <Button variant="secondary" className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={onBuyNow}>
        Comprar Agora
      </Button>
    </div>
  );
};