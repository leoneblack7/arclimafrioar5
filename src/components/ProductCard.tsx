import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "./product/ProductImage";
import { ProductPrice } from "./product/ProductPrice";
import { ProductSpecs } from "./product/ProductSpecs";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  specifications?: string;
  isSpecificationsActive?: boolean;
}

export const ProductCard = ({ 
  id, 
  title, 
  price, 
  image,
  specifications,
  isSpecificationsActive 
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/produto/${id}`);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <ProductImage image={image} title={title} />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <ProductPrice price={price} />
        <ProductSpecs 
          specifications={specifications} 
          isActive={isSpecificationsActive}
        />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full group" onClick={handleViewProduct}>
          <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-bounce" />
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};