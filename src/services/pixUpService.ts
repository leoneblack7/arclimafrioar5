import { pixWebhookService } from "./pixWebhookService";
import { PixUpTransaction, PixWebhookPayload } from "@/types/pix";

interface PixUpPaymentRequest {
  amount: number;
  external_id: string;
  payer: {
    name: string;
    document: string;
  };
}

interface PixUpResponse {
  transactionId: string;
  emvqrcps: string; // QR code data
  status: string;
}

export const pixUpService = {
  async createQrCode(
    apiKey: string,
    amount: number,
    payerName: string,
    document: string,
    orderId: string
  ): Promise<PixUpResponse> {
    const payload: PixUpPaymentRequest = {
      amount,
      external_id: orderId,
      payer: {
        name: payerName,
        document: document.replace(/\D/g, '') // Remove non-numeric characters
      }
    };

    const response = await fetch('https://api.pixup.com.br/v1/payment/pix/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to generate PIX QR Code');
    }

    return response.json();
  },

  async checkTransactionStatus(
    apiKey: string,
    transactionId: string
  ): Promise<{ status: string }> {
    const response = await fetch(`https://api.pixup.com.br/v1/payment/pix/status/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to check transaction status');
    }

    return response.json();
  },

  async processWebhook(payload: PixWebhookPayload) {
    if (payload?.requestBody?.transactionType === "RECEIVEPIX" && payload?.requestBody?.transactionId) {
      return await pixWebhookService.handleWebhook(payload);
    }
    
    return { success: false, message: "Invalid webhook payload" };
  }
};
