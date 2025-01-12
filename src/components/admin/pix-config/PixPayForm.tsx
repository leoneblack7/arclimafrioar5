import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PixConfig } from "@/types/pix";

interface PixPayFormProps {
  config: PixConfig;
  onConfigChange: (newConfig: PixConfig) => void;
}

export const PixPayForm = ({ config, onConfigChange }: PixPayFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pixpay-client-id">Client ID</Label>
        <Input
          id="pixpay-client-id"
          value={config.pixPayClientId || ''}
          onChange={(e) => onConfigChange({ ...config, pixPayClientId: e.target.value })}
          placeholder="Seu Client ID do PixPay"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pixpay-client-secret">Client Secret</Label>
        <Input
          id="pixpay-client-secret"
          type="password"
          value={config.pixPayClientSecret || ''}
          onChange={(e) => onConfigChange({ ...config, pixPayClientSecret: e.target.value })}
          placeholder="Seu Client Secret do PixPay"
        />
      </div>
    </div>
  );
};