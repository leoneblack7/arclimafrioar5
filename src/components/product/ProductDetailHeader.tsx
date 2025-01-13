import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface ProductDetailHeaderProps {
  title: string;
  id: number;
}

export const ProductDetailHeader = ({ title, id }: ProductDetailHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">Código: {id}</p>
      </div>
      <Button variant="ghost" size="icon">
        <Heart className="h-6 w-6" />
      </Button>
    </div>
  );
};