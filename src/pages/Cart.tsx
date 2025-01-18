import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartPayment } from "@/components/cart/CartPayment";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { getFromStorage, saveToStorage } from "@/utils/storage";
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
      
      try {
        const existingOrders = await getFromStorage('orders', []);
        await saveToStorage('orders', [...existingOrders, order]);
        
        // Redirect to tracking page
        navigate('/rastreio');
      } catch (error) {
        console.error('Error saving order:', error);
      }
    } else {
      // Handle credit card payment logic here
    }
  };

  return (
    <div>
      <h1>Carrinho</h1>
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