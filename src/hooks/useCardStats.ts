import { useState, useEffect } from 'react';
import { getFromStorage } from '@/utils/storage';
import { Order } from '@/types/storage';

export const useCardStats = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const orders = await getFromStorage<Order[]>('orders', []);
    const creditCardOrders = orders.filter(order => order.payment_method === 'credit_card');
    
    setTotalOrders(creditCardOrders.length);
    
    const total = creditCardOrders.reduce((sum, order) => sum + order.total_amount, 0);
    setTotalAmount(total);
    
    setAverageOrderValue(creditCardOrders.length > 0 ? total / creditCardOrders.length : 0);
  };

  return {
    totalOrders,
    totalAmount,
    averageOrderValue
  };
};