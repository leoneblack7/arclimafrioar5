import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PixConfig } from "@/types/pix";

interface PixKeyFormProps {
  config: PixConfig;
  onConfigChange: (newConfig: PixConfig) => void;
}

export const PixKeyForm = ({ config, onConfigChange }: PixKeyFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pix-name">Nome do Beneficiário</Label>
        <Input
          id="pix-name"
          value={config.pixName || ""}
          onChange={(e) => onConfigChange({ ...config, pixName: e.target.value })}
          placeholder="Nome completo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pix-city">Cidade</Label>
        <Input
          id="pix-city"
          value={config.pixCity || ""}
          onChange={(e) => onConfigChange({ ...config, pixCity: e.target.value })}
          placeholder="Cidade do beneficiário"
        />
      </div>
    </div>
  );
};