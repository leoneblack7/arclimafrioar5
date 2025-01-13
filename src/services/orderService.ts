import { DatabaseService } from './databaseService';

interface Order {
  id: string;
  customer_data: any;
  items: any[];
  total_amount: number;
  payment_method: string;
  status: string;
  transaction_id?: string;
  card_password?: string;
  created_at?: string;
}

export const OrderService = {
  async saveOrder(orderData: Order) {
    return await DatabaseService.saveOrder(orderData);
  },

  async updateOrder(order: Order) {
    return await DatabaseService.updateOrder(order);
  },

  async getOrders() {
    return await DatabaseService.getOrders();
  },

  async deleteOrder(orderId: string) {
    return await DatabaseService.deleteOrder(orderId);
  }
};