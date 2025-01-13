export interface PixConfig {
  enabled: boolean;
  useCustomKeys: boolean;
  usePixPay: boolean;
  usePixUp: boolean;
  pixKey: string;
  pixName: string;
  pixCity: string;
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