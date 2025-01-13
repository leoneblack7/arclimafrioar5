import { supabase } from "@/integrations/supabase/client";
import { PixWebhookPayload } from "@/types/pix";
import { toast } from "sonner";

export const pixWebhookService = {
  async handleWebhook(payload: PixWebhookPayload) {
    try {
      const { transactionId, transactionType } = payload.requestBody;

      // Only process RECEIVEPIX transactions
      if (transactionType !== "RECEIVEPIX") {
        console.log("Ignoring non-RECEIVEPIX transaction:", transactionType);
        return { success: false, message: "Invalid transaction type" };
      }

      // Update transaction status in database
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('transaction_id', transactionId);

      if (updateError) {
        console.error("Error updating transaction:", updateError);
        return { success: false, message: "Error updating transaction" };
      }

      // Get the order details
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('transaction_id', transactionId)
        .single();

      if (orderError || !order) {
        console.error("Error fetching order:", orderError);
        return { success: false, message: "Error fetching order" };
      }

      // Update customer balance if needed
      // This would be equivalent to the enviarSaldo function in PHP
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
    // Implement balance update logic here
    // This would connect to your balance API
    return { status: 1, msg: "SUCCESS" };
  },

  async processAffiliateCommission(order: any) {
    try {
      // Get affiliate info if exists
      const { data: customer } = await supabase
        .from('customers')
        .select('affiliate_id')
        .eq('id', order.customer_id)
        .single();

      if (customer?.affiliate_id) {
        // Process CPA commission
        const { error: commissionError } = await supabase
          .from('affiliate_commissions')
          .insert({
            affiliate_id: customer.affiliate_id,
            order_id: order.id,
            amount: 50, // Example fixed CPA amount
            type: 'cpa',
            status: 'pending'
          });

        if (commissionError) {
          console.error("Error processing affiliate commission:", commissionError);
        }
      }
    } catch (error) {
      console.error("Error in affiliate commission processing:", error);
    }
  }
};