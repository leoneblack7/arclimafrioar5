import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const CartDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            0
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho de Compras</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <div className="text-center text-gray-500">
            Seu carrinho está vazio
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex justify-between mb-4">
            <span>Total:</span>
            <span className="font-bold">R$ 0,00</span>
          </div>
          <Button className="w-full" disabled>
            Finalizar Compra
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};