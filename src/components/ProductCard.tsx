import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductCard = ({ title, price, image, description }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative group">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <p className="text-primary font-bold text-xl">
            {price.toLocaleString('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            })}
          </p>
          <span className="text-sm text-green-600">Em estoque</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full group">
          <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-float" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};