import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ProductImage } from "./product/ProductImage";
import { ProductPrice } from "./product/ProductPrice";
import { ProductSpecifications } from "./product/ProductSpecifications";
import { ProductActions } from "./product/ProductActions";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductCard = ({ id, title, price, image, description }: ProductCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem({ id, title, price, image });
    setIsOpen(false);
  };

  const handleBuyNow = () => {
    addItem({ id, title, price, image });
    navigate("/checkout");
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <ProductImage image={image} title={title} />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <ProductPrice price={price} className="mb-4" />
        <ProductSpecifications />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full group">
              <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Comprar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="pt-4">
                <ProductImage image={image} title={title} className="h-64" />
                <p className="text-gray-600 mb-4">{description}</p>
                <ProductPrice price={price} className="mb-4" />
                <ProductSpecifications className="h-8" />
                <ProductActions onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};