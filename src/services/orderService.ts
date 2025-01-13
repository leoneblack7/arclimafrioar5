import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';

interface Order {
  id: string;
  customer_data: any;
  items: any[];
  total_amount: number;
  payment_method: string;
  status: string;
  transaction_id?: string;
  tracking_updates?: any[];
}

const API_URL = 'http://localhost/arclimafrio/api';

class OrderService {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${API_URL}/orders/read.php`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return getFromLocalStorage('orders', []);
    }
  }

  async saveOrder(order: Order) {
    try {
      const response = await fetch(`${API_URL}/orders/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      
      if (!response.ok) throw new Error('Failed to save order');
      const savedOrder = await response.json();
      
      const orders = getFromLocalStorage('orders', []);
      const index = orders.findIndex((o: Order) => o.id === order.id);
      if (index !== -1) {
        orders[index] = savedOrder;
      } else {
        orders.push(savedOrder);
      }
      saveToLocalStorage('orders', orders);
      
      return savedOrder;
    } catch (error) {
      console.error('Error saving order:', error);
      return this._saveOrderToLocalStorage(order);
    }
  }

  async updateOrder(order: Order) {
    try {
      const response = await fetch(`${API_URL}/orders/update.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error('Failed to update order');
      return response.json();
    } catch (error) {
      console.error('Error updating order:', error);
      const orders = getFromLocalStorage('orders', []);
      const index = orders.findIndex((o: Order) => o.id === order.id);
      if (index !== -1) orders[index] = order;
      saveToLocalStorage('orders', orders);
      return order;
    }
  }

  async deleteOrder(orderId: string) {
    try {
      const response = await fetch(`${API_URL}/orders/delete.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId }),
      });
      if (!response.ok) throw new Error('Failed to delete order');
      return response.json();
    } catch (error) {
      console.error('Error deleting order:', error);
      const orders = getFromLocalStorage('orders', []);
      const filteredOrders = orders.filter((o: Order) => o.id !== orderId);
      saveToLocalStorage('orders', filteredOrders);
      return { message: 'Order deleted successfully' };
    }
  }

  // Internal helper method (using underscore prefix instead of private)
  _saveOrderToLocalStorage(order: Order) {
    const orders = getFromLocalStorage('orders', []);
    const index = orders.findIndex((o: Order) => o.id === order.id);
    if (index !== -1) {
      orders[index] = order;
    } else {
      orders.push(order);
    }
    saveToLocalStorage('orders', orders);
    return order;
  }
}

export const orderService = new OrderService();