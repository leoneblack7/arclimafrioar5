import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface FeaturedHeaderProps {
  onNewProduct: () => void;
  productsCount: number;
}

export const FeaturedHeader = ({ onNewProduct, productsCount }: FeaturedHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-foreground dark:text-foreground">
        Produtos em Destaque
      </h2>
      <Button 
        onClick={onNewProduct} 
        className="flex items-center gap-2"
        disabled={productsCount >= 6}
      >
        <Plus className="h-4 w-4" />
        Novo Produto em Destaque
      </Button>
    </div>
  );
};