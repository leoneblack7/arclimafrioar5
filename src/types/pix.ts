export interface PixConfig {
  enabled: boolean;
  useCustomKeys: boolean;
  usePixPay: boolean;
  pixKey: string;
  pixName: string;
  pixCity: string;
  pixPayClientId?: string;
  pixPayClientSecret?: string;
  maintenanceMode: boolean;
}