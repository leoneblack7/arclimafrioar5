export interface PixConfig {
  enabled: boolean;
  useCustomKeys: boolean;
  usePixPay: boolean;
  usePixUp: boolean;
  pixKey?: string;
  pixName?: string;
  pixCity?: string;
  pixPayClientId?: string;
  pixPayClientSecret?: string;
  pixUpClientId?: string;
  pixUpClientSecret?: string;
  maintenanceMode: boolean;
}

export interface PixUpTransaction {
  transactionId: string;
  status: string;
  amount: number;
  external_id: string;
  payer: {
    name: string;
    document: string;
  };
}

export interface PixWebhookPayload {
  requestBody: {
    transactionId: string;
    transactionType: string;
    status: string;
    amount: number;
    payer?: {
      name: string;
      document: string;
    };
  };
}