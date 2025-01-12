import { getFromLocalStorage } from "@/utils/localStorage";

export const useCardStats = () => {
  const calculateCardStats = () => {
    const allOrders = getFromLocalStorage('orders', []);
    const creditOrders = allOrders.filter((order: any) => order.payment_method === 'credit');
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: creditOrders.length,
      today: creditOrders.filter((order: any) => new Date(order.timestamp) >= today).length,
      week: creditOrders.filter((order: any) => new Date(order.timestamp) >= sevenDaysAgo).length,
      month: creditOrders.filter((order: any) => new Date(order.timestamp) >= monthStart).length,
    };
  };

  return calculateCardStats();
};