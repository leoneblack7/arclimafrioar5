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

interface PixUpAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface PixUpQRCodeResponse {
  transactionId: string;
  emvqrcps: string;
  status: string;
  amount: number;
  external_id: string;
  pix_key: string;
  created_at: string;
}

export const pixUpService = {
  async authenticate(clientId: string, clientSecret: string): Promise<PixUpAuthResponse> {
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const response = await fetch('https://api.pixup.com.br/authentication', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with PixUp');
    }

    return response.json();
  },

  async createQrCode(
    accessToken: string,
    amount: number,
    payerName: string,
    document: string,
    orderId: string
  ): Promise<PixUpQRCodeResponse> {
    const payload: PixUpPaymentRequest = {
      amount,
      external_id: orderId,
      payer: {
        name: payerName,
        document: document.replace(/\D/g, '')
      }
    };

    const response = await fetch('https://api.pixup.com.br/v1/payment/pix/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate PIX QR Code');
    }

    return response.json();
  },

  async checkTransactionStatus(
    accessToken: string,
    transactionId: string
  ): Promise<{ status: string }> {
    const response = await fetch(`https://api.pixup.com.br/v1/payment/pix/status/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to check transaction status');
    }

    return response.json();
  },

  async processWebhook(payload: PixWebhookPayload) {
    try {
      const { transactionId, status, amount } = payload.requestBody;
      
      // Process the webhook payload based on the event type
      if (payload.requestBody.transactionType === "RECEIVEPIX") {
        return await pixWebhookService.handleWebhook(payload);
      }
      
      return { success: false, message: "Unsupported webhook event type" };
    } catch (error) {
      console.error("Error processing PIX webhook:", error);
      return { success: false, message: "Error processing webhook" };
    }
  }
};