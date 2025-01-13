import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PixConfig } from "@/types/pix";

interface PixUpFormProps {
  config: PixConfig;
  onConfigChange: (config: PixConfig) => void;
}

export const PixUpForm = ({ config, onConfigChange }: PixUpFormProps) => {
  const handleApiKeyChange = (value: string) => {
    onConfigChange({
      ...config,
      pixUpApiKey: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pixup-api-key">Chave API PixUp</Label>
        <Input
          id="pixup-api-key"
          type="password"
          value={config.pixUpApiKey || ""}
          onChange={(e) => handleApiKeyChange(e.target.value)}
          placeholder="Insira sua chave API do PixUp"
        />
      </div>
    </div>
  );
};