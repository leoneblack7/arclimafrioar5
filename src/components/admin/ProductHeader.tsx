import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductHeaderProps {
  onNewProduct: () => void;
}

export const ProductHeader = ({ onNewProduct }: ProductHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-foreground dark:text-foreground">
        Gerenciar Produtos
      </h2>
      <Button onClick={onNewProduct} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Novo Produto
      </Button>
    </div>
  );
};