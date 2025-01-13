export interface PixConfig {
  enabled: boolean;
  useCustomKeys: boolean;
  usePixPay: boolean;
  usePixUp: boolean;
  maintenance: boolean;
  pixName?: string;
  pixCity?: string;
  pixPayClientId?: string;
  pixPayClientSecret?: string;
  pixUpClientId?: string;
  pixUpClientSecret?: string;
}

export interface PixUpTransaction {
  transactionId: string;
  status: string;
  amount: number;
  external_id: string;
  created_at: string;
}

export interface PixWebhookPayload {
  requestBody: {
    transactionType: string;
    transactionId: string;
    status: string;
    amount: number;
    external_id: string;
    created_at: string;
  };
}