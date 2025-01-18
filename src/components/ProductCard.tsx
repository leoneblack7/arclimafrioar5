import { Button } from "@/components/ui/button";
import { Product } from "@/types/storage";
import { ShoppingCart, Heart } from "lucide-react";

export interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    specifications?: string;
    isSpecificationsActive?: boolean;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-white border rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full aspect-square object-cover rounded-lg mb-4" 
        />
        <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold line-clamp-2 min-h-[3.5rem]">{product.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
        <div className="pt-2">
          <p className="text-2xl font-bold text-primary">
            {product.price.toLocaleString('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            })}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Em até 12x sem juros
          </p>
        </div>
        <div className="pt-4 space-y-2">
          <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
            <ShoppingCart className="h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;