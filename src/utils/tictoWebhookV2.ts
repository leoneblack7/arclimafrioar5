import { TictoConfig } from '@/types/storage';

const defaultConfig: TictoConfig = {
  apiKey: ''
};

export const tictoWebhookV2 = {
  config: defaultConfig,
  
  init(config: TictoConfig) {
    this.config = config;
  },

  async handleWebhook(req: any, res: any) {
    try {
      const apiKey = req.headers['x-api-key'];
      
      if (apiKey !== this.config.apiKey) {
        return res.status(401).json({ error: 'Invalid API key' });
      }

      const webhookData = req.body;
      
      // Process webhook data
      const { event_type, data } = webhookData;
      
      switch (event_type) {
        case 'payment.success':
          await this.handlePaymentSuccess(data);
          break;
        case 'payment.failed':
          await this.handlePaymentFailed(data);
          break;
        case 'order.status_update':
          await this.handleOrderStatusUpdate(data);
          break;
        default:
          console.warn(`Unhandled webhook event type: ${event_type}`);
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error processing webhook:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  async handlePaymentSuccess(data: any) {
    const { order_id, transaction_id, amount } = data;
    console.log(`Payment success for order ${order_id}:`, { transaction_id, amount });
    // Implement payment success logic here
  },

  async handlePaymentFailed(data: any) {
    const { order_id, error_code, error_message } = data;
    console.log(`Payment failed for order ${order_id}:`, { error_code, error_message });
    // Implement payment failure logic here
  },

  async handleOrderStatusUpdate(data: any) {
    const { order_id, new_status, old_status } = data;
    console.log(`Order ${order_id} status updated:`, { old_status, new_status });
    // Implement order status update logic here
  }
};