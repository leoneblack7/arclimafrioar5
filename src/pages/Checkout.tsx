import { useEffect, useState } from "react";
import { mysqlService } from "@/utils/mysqlService";
import { getFromStorage } from "@/utils/storage";
import { toast } from "sonner";

export const Checkout = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const loadCartData = async () => {
      const data = await getFromStorage('cart_data', []);
      setCartData(data);
    };
    loadCartData();
  }, []);

  const handleSaveOrder = async () => {
    try {
      const orderData = {
        items: cartData,
        total_amount: cartData.reduce((total, item) => total + item.price, 0),
        status: "pending",
      };
      await mysqlService.saveOrder(orderData);
      toast.success("Pedido salvo com sucesso!");
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('Erro ao salvar o pedido');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleSaveOrder}>Finalizar Pedido</button>
    </div>
  );
};
