import { Button } from "@/components/ui/button";
import { Product } from "@/types/storage";

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

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-primary font-bold mt-2">
        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>
      <Button className="mt-4" onClick={() => console.log(`Add ${product.title} to cart`)}>
        Adicionar ao Carrinho
      </Button>
    </div>
  );
};

export default ProductCard;
