import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem = ({
  id,
  title,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex items-center space-x-4 border-b pb-4">
      <img src={image} alt={title} className="h-16 w-16 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-sm text-gray-500">R$ {price.toFixed(2)}</p>
        <div className="flex items-center space-x-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 ml-2"
            onClick={() => onRemove(id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};