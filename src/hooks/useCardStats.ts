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
    try {
      const orders = await getFromStorage<Order[]>('orders', []);
      
      // Ensure orders is an array before using filter
      const ordersArray = Array.isArray(orders) ? orders : [];
      const creditCardOrders = ordersArray.filter(order => order?.payment_method === 'credit_card');
      
      setTotalOrders(creditCardOrders.length);
      
      const total = creditCardOrders.reduce((sum, order) => sum + (order?.total_amount || 0), 0);
      setTotalAmount(total);
      
      setAverageOrderValue(creditCardOrders.length > 0 ? total / creditCardOrders.length : 0);
    } catch (error) {
      console.error('Error loading card stats:', error);
      // Set default values in case of error
      setTotalOrders(0);
      setTotalAmount(0);
      setAverageOrderValue(0);
    }
  };

  return {
    totalOrders,
    totalAmount,
    averageOrderValue
  };
};