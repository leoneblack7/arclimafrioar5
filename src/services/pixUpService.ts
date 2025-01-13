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

const PROXY_BASE_URL = 'https://api.allorigins.win/raw?url=';
const API_BASE_URL = 'https://api.pixupbr.com/v2';

export const pixUpService = {
  async authenticate(clientId: string, clientSecret: string): Promise<PixUpAuthResponse> {
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const url = `${PROXY_BASE_URL}${encodeURIComponent(`${API_BASE_URL}/authentication`)}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to authenticate with PixUp: ${error}`);
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

    const url = `${PROXY_BASE_URL}${encodeURIComponent(`${API_BASE_URL}/payment/pix/create`)}`;
    
    const response = await fetch(url, {
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
    const url = `${PROXY_BASE_URL}${encodeURIComponent(`${API_BASE_URL}/payment/pix/status/${transactionId}`)}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to check transaction status');
    }

    return response.json();
  },

  async processWebhook(payload: PixWebhookPayload) {
    try {
      const { transactionId, status, amount } = payload.requestBody;
      
      // Processa o webhook com base no tipo de evento
      switch (payload.requestBody.transactionType) {
        case "RECEIVEPIX":
          return await pixWebhookService.handleWebhook(payload);
        case "CASHOUT":
          console.log("Processando evento de transferência:", {
            transactionId,
            status,
            amount
          });
          return { success: true, message: "Evento de transferência processado" };
        default:
          return { success: false, message: "Tipo de evento não suportado" };
      }
    } catch (error) {
      console.error("Erro ao processar webhook PIX:", error);
      return { success: false, message: "Erro ao processar webhook" };
    }
  }
};