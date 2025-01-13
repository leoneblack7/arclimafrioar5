import { PixWebhookPayload } from "@/types/pix";
import { toast } from "sonner";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { orderService } from "./orderService";

export const pixWebhookService = {
  async handleWebhook(payload: PixWebhookPayload) {
    try {
      const { transactionId, transactionType } = payload.requestBody;

      if (transactionType !== "RECEIVEPIX") {
        console.log("Ignoring non-RECEIVEPIX transaction:", transactionType);
        return { success: false, message: "Invalid transaction type" };
      }

      // Update order status in both localStorage and MySQL
      const orders = getFromLocalStorage('orders', []);
      const orderIndex = orders.findIndex((order: any) => order.transaction_id === transactionId);
      
      if (orderIndex === -1) {
        console.error("Order not found:", transactionId);
        return { success: false, message: "Order not found" };
      }

      // Update order status to paid
      orders[orderIndex].status = 'paid';
      orders[orderIndex].tracking_updates = [{
        status: "Pedido Confirmado",
        date: new Date().toISOString(),
        location: "Sistema ArclimaFrio",
        description: "Pagamento PIX confirmado"
      }];
      
      // Save to MySQL using orderService
      const updatedOrder = orders[orderIndex];
      await orderService.updateOrder(updatedOrder);

      // Save customer data for tracking
      const customerOrders = getFromLocalStorage('customer-orders', {});
      if (updatedOrder.customer_data?.cpf) {
        if (!customerOrders[updatedOrder.customer_data.cpf]) {
          customerOrders[updatedOrder.customer_data.cpf] = [];
        }
        customerOrders[updatedOrder.customer_data.cpf].push({
          orderId: updatedOrder.id,
          timestamp: Date.now(),
          status: 'paid',
          tracking: updatedOrder.tracking_updates
        });
        saveToLocalStorage('customer-orders', customerOrders);
      }

      // Update customer balance if needed
      try {
        await this.updateCustomerBalance(updatedOrder);
        console.log("Customer balance updated for order:", transactionId);
      } catch (error) {
        console.error("Error updating customer balance:", error);
      }

      // Process affiliate commissions if applicable
      if (updatedOrder.total_amount >= 50) {
        await this.processAffiliateCommission(updatedOrder);
      }

      toast.success("PIX payment processed successfully");
      return { success: true, message: "Payment processed successfully" };
    } catch (error) {
      console.error("Error processing PIX webhook:", error);
      toast.error("Error processing PIX payment");
      return { success: false, message: "Error processing webhook" };
    }
  },

  async updateCustomerBalance(order: any) {
    // Get current balances from localStorage
    const balances = getFromLocalStorage('customer-balances', {});
    
    // Update customer balance
    balances[order.customer.id] = (balances[order.customer.id] || 0) + order.total_amount;
    
    // Save updated balances
    saveToLocalStorage('customer-balances', balances);
    
    return { status: 1, msg: "SUCCESS" };
  },

  async processAffiliateCommission(order: any) {
    try {
      // Get affiliates from localStorage
      const affiliates = getFromLocalStorage('affiliates', {});
      const customer = order.customer;

      if (customer?.affiliate_id && affiliates[customer.affiliate_id]) {
        // Get current commissions from localStorage
        const commissions = getFromLocalStorage('affiliate-commissions', []);
        
        // Add new commission
        commissions.push({
          id: Date.now().toString(),
          affiliate_id: customer.affiliate_id,
          order_id: order.id,
          amount: 50, // Example fixed CPA amount
          type: 'cpa',
          status: 'pending',
          created_at: new Date().toISOString()
        });

        // Save updated commissions
        saveToLocalStorage('affiliate-commissions', commissions);
      }
    } catch (error) {
      console.error("Error in affiliate commission processing:", error);
    }
  }
};