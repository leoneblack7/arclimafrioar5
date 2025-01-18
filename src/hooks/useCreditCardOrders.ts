import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { mysqlService } from '@/utils/mysqlService';
import { formatOrderData } from '@/utils/orderFormatter';

export const useCreditCardOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const fetchedOrders = await mysqlService.getOrders();
      const creditCardOrders = fetchedOrders.filter(order => 
        order.payment_method === 'credit_card'
      );
      setOrders(creditCardOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Erro ao carregar pedidos');
    }
  };

  const handleCopyData = (order: any) => {
    const formattedData = formatOrderData(order);
    navigator.clipboard.writeText(formattedData);
    toast.success('Dados copiados para a área de transferência');
  };

  const handleDelete = async (orderId: string) => {
    try {
      await mysqlService.deleteOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      toast.success('Pedido removido com sucesso');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Erro ao remover pedido');
    }
  };

  return {
    orders,
    handleCopyData,
    handleDelete
  };
};