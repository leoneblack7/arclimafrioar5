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