import { PixWebhookPayload } from "@/types/pix";
import { toast } from "sonner";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

export const pixWebhookService = {
  async handleWebhook(payload: PixWebhookPayload) {
    try {
      const { transactionId, transactionType } = payload.requestBody;

      // Only process RECEIVEPIX transactions
      if (transactionType !== "RECEIVEPIX") {
        console.log("Ignoring non-RECEIVEPIX transaction:", transactionType);
        return { success: false, message: "Invalid transaction type" };
      }

      // Update order status in localStorage
      const orders = getFromLocalStorage('orders', []);
      const orderIndex = orders.findIndex((order: any) => order.transaction_id === transactionId);
      
      if (orderIndex === -1) {
        console.error("Order not found:", transactionId);
        return { success: false, message: "Order not found" };
      }

      // Update order status to paid
      orders[orderIndex].status = 'paid';
      saveToLocalStorage('orders', orders);

      const order = orders[orderIndex];

      // Update customer balance if needed
      try {
        await this.updateCustomerBalance(order);
        console.log("Customer balance updated for order:", transactionId);
      } catch (error) {
        console.error("Error updating customer balance:", error);
        return { success: false, message: "Error updating customer balance" };
      }

      // Process affiliate commissions if applicable
      if (order.total_amount >= 50) { // Minimum deposit for CPA
        await this.processAffiliateCommission(order);
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