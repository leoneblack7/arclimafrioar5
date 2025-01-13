export interface PixConfig {
  enabled: boolean;
  useCustomKeys: boolean;
  usePixPay: boolean;
  usePixUp: boolean;
  pixKey: string;
  pixKeyType?: string;
  pixName: string;
  pixCity: string;
  pixPayApiKey?: string;
  pixPayClientId?: string;
  pixPayClientSecret?: string;
  pixUpApiKey?: string;
  maintenanceMode: boolean;
}

export interface PixUpTransaction {
  transactionId: string;
  qrcode: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'EXPIRED';
}

export interface PixWebhookPayload {
  requestBody: {
    transactionId: string;
    transactionType: string;
    status: string;
    amount: number;
    external_id: string;
  }
}