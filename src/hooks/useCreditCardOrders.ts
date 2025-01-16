import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getOrders, deleteOrder } from "@/utils/databaseService";

export const useCreditCardOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchOrders = () => {
    const allOrders = getOrders();
    const creditOrders = allOrders
      .filter((order: any) => order.payment_method === 'credit')
      .sort((a: any, b: any) => b.timestamp - a.timestamp);
    setOrders(creditOrders);
  };

  const handleCopyData = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Dados copiados para a área de transferência"
    });
  };

  const handleDelete = (orderId: string) => {
    deleteOrder(orderId);
    toast({
      title: "Pedido deletado com sucesso!"
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    handleCopyData,
    handleDelete,
    fetchOrders
  };
};