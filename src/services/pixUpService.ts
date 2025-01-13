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

const API_BASE_URL = 'https://api.pixupbr.com/v2';

// Helper function to handle API requests
const makeRequest = async (endpoint: string, options: RequestInit) => {
  const proxyUrl = 'https://corsproxy.io/';
  const url = `${proxyUrl}?${encodeURIComponent(API_BASE_URL + endpoint)}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Accept': 'application/json',
        'Content-Type': options.method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
      },
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${responseText}`);
    }

    return responseData;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export const pixUpService = {
  async authenticate(clientId: string, clientSecret: string): Promise<PixUpAuthResponse> {
    const credentials = btoa(`${clientId}:${clientSecret}`);
    
    return makeRequest('/authentication', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials'
    });
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

    return makeRequest('/payment/pix/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
  },

  async checkTransactionStatus(
    accessToken: string,
    transactionId: string
  ): Promise<{ status: string }> {
    return makeRequest(`/payment/pix/status/${transactionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
  },

  async processWebhook(payload: PixWebhookPayload) {
    try {
      const { transactionId, status, amount } = payload.requestBody;
      
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