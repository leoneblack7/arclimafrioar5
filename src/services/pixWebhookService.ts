import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WebhookPayload {
  requestBody: {
    transactionId: string;
    transactionType: string;
    status: string;
    amount: number;
    external_id: string;
  }
}

export const pixWebhookService = {
  async handleWebhook(payload: WebhookPayload) {
    const { transactionId, transactionType, status } = payload.requestBody;

    if (transactionType !== "RECEIVEPIX") {
      console.log("Ignoring non-PIX transaction:", transactionType);
      return;
    }

    try {
      // Update order status in Supabase
      const { error: orderError } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', transactionId);

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
        .eq('transaction_id', transactionId);

      if (transactionError) {
        console.error("Error updating transaction:", transactionError);
        throw transactionError;
      }

      // Notify user about successful payment
      toast.success("Pagamento PIX recebido com sucesso!");

      return { success: true, message: "Payment processed successfully" };
    } catch (error) {
      console.error("Error processing webhook:", error);
      toast.error("Erro ao processar pagamento PIX");
      return { success: false, message: "Error processing payment" };
    }
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