import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PixConfig } from "@/types/pix";

interface PixToggleSectionProps {
  config: PixConfig;
  onTictoToggle: (checked: boolean) => void;
  onCustomKeysToggle: (checked: boolean) => void;
  onPixPayToggle: (checked: boolean) => void;
  onPixUpToggle: (checked: boolean) => void;
  onMaintenanceToggle: (checked: boolean) => void;
}

export const PixToggleSection = ({
  config,
  onTictoToggle,
  onCustomKeysToggle,
  onPixPayToggle,
  onPixUpToggle,
  onMaintenanceToggle,
}: PixToggleSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="pix-enabled"
          checked={config.enabled}
          onCheckedChange={onTictoToggle}
        />
        <Label htmlFor="pix-enabled">Ativar integração Ticto PIX</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="custom-keys"
          checked={config.useCustomKeys}
          onCheckedChange={onCustomKeysToggle}
        />
        <Label htmlFor="custom-keys">Usar chaves PIX personalizadas</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="pixpay-enabled"
          checked={config.usePixPay}
          onCheckedChange={onPixPayToggle}
        />
        <Label htmlFor="pixpay-enabled">Ativar integração PixPay.pro</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="pixup-enabled"
          checked={config.usePixUp}
          onCheckedChange={onPixUpToggle}
        />
        <Label htmlFor="pixup-enabled">Ativar integração PixUp</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="maintenance-mode"
          checked={config.maintenanceMode}
          onCheckedChange={onMaintenanceToggle}
        />
        <Label htmlFor="maintenance-mode" className="flex flex-col">
          <span>PIX em Manutenção</span>
          <span className="text-sm text-muted-foreground">
            Quando ativado, os clientes serão informados que o PIX está temporariamente indisponível
          </span>
        </Label>
      </div>
    </div>
  );
};