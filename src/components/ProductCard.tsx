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
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-primary font-bold text-xl">
          ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full group">
          <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-float" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};