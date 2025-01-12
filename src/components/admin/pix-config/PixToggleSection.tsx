import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PixConfig } from "@/types/pix";

interface PixToggleSectionProps {
  config: PixConfig;
  onTictoToggle: (checked: boolean) => void;
  onCustomKeysToggle: (checked: boolean) => void;
}

export const PixToggleSection = ({
  config,
  onTictoToggle,
  onCustomKeysToggle,
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
    </div>
  );
};