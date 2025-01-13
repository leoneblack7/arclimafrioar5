import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PixWebhookPayload } from "@/types/pix";

export const pixWebhookService = {
  async handleWebhook(payload: PixWebhookPayload) {
    const { requestBody } = payload;
    
    if (requestBody?.transactionType === "RECEIVEPIX" && requestBody?.transactionId) {
      try {
        // Update order status
        const { error: orderError } = await supabase
          .from('orders')
          .update({ 
            status: 'paid',
            updated_at: new Date().toISOString()
          })
          .eq('payment_id', requestBody.transactionId);

        if (orderError) {
          console.error("Error updating order:", orderError);
          throw orderError;
        }

        // Update transaction status
        const { error: transactionError } = await supabase
          .from('transactions')
          .update({ 
            status: 'completed',
            updated_at: new Date().toISOString()
          })
          .eq('transaction_id', requestBody.transactionId);

        if (transactionError) {
          console.error("Error updating transaction:", transactionError);
          throw transactionError;
        }

        toast.success("Pagamento PIX recebido com sucesso!");
        return { success: true, message: "Payment processed successfully" };
      } catch (error) {
        console.error("Error processing webhook:", error);
        toast.error("Erro ao processar pagamento PIX");
        return { success: false, message: "Error processing payment" };
      }
    }
    
    return { success: false, message: "Invalid webhook payload" };
  },

  async verifyPaymentStatus(transactionId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('status')
        .eq('payment_id', transactionId)
        .single();

      if (error) throw error;
      return data?.status === 'paid';
    } catch (error) {
      console.error("Error verifying payment status:", error);
      return false;
    }
  }
};