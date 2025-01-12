import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartPayment } from "@/components/cart/CartPayment";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { generateOrderId } from "@/utils/orderUtils";

const Cart = () => {
  const { items, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("pix");
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (paymentMethod === 'pix') {
      // Save order and redirect to tracking
      const order = {
        id: generateOrderId(),
        timestamp: Date.now(),
        product: items,
        customer: { document: "01387246607" }, // Test CPF
        total,
        payment_method: 'pix',
        status: 'paid'
      };
      
      const existingOrders = getFromLocalStorage('orders', []);
      saveToLocalStorage('orders', [...existingOrders, order]);
      
      // Redirect to tracking page
      navigate('/rastreio');
    } else {
      // Handle credit card payment logic here
    }
  };

  return (
    <div>
      <h1>Carrinho</h1>
      {/* Render cart items and total */}
      <CartPayment
        total={total}
        disabled={items.length === 0}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;