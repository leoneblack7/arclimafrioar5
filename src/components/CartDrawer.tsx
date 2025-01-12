import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CartItem } from "./cart/CartItem";
import { CartPayment } from "./cart/CartPayment";

export const CartDrawer = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("pix");
  const [showPixIframe, setShowPixIframe] = useState(false);
  const [pixLink, setPixLink] = useState("");

  const handleCheckout = () => {
    if (paymentMethod === "pix") {
      // For PIX payments, use the product's specific PIX link
      if (items.length === 1) {
        const productPixLink = items[0].pixLink;
        if (productPixLink) {
          setPixLink(productPixLink);
          setShowPixIframe(true);
          return;
        }
      }
      // If no specific PIX link or multiple items, use default link
      setPixLink("https://payment.ticto.app/O368AB06D");
      setShowPixIframe(true);
    } else {
      navigate("/checkout");
    }
  };

  const handlePixPaymentComplete = () => {
    setShowPixIframe(false);
    navigate("/track-order");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {items.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho de Compras</SheetTitle>
        </SheetHeader>
        {showPixIframe ? (
          <div className="mt-6 flex-1">
            <iframe
              src={pixLink}
              className="w-full h-[calc(100vh-200px)]"
              onLoad={(e) => {
                // Check if the iframe URL contains success indicator
                const iframe = e.target as HTMLIFrameElement;
                if (iframe.contentWindow?.location.href.includes("success")) {
                  handlePixPaymentComplete();
                }
              }}
            />
          </div>
        ) : (
          <>
            <div className="mt-6 flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center text-gray-500">
                  Seu carrinho está vazio
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      price={item.price}
                      image={item.image}
                      quantity={item.quantity || 1}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              )}
            </div>
            <CartPayment
              total={total}
              disabled={items.length === 0}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={(value: "pix" | "credit") =>
                setPaymentMethod(value)
              }
              onCheckout={handleCheckout}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};