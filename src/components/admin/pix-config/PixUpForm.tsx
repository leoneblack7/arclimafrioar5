import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PixConfig } from "@/types/pix";
import { pixUpService } from "@/services/pixUpService";

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

  const handleClientIdChange = (value: string) => {
    onConfigChange({
      ...config,
      pixUpClientId: value,
    });
  };

  const handleClientSecretChange = (value: string) => {
    onConfigChange({
      ...config,
      pixUpClientSecret: value,
    });
  };

  const testConnection = async () => {
    if (!config.pixUpApiKey) {
      toast.error("Por favor, insira a chave API do PixUp");
      return;
    }

    try {
      // Test the connection with a minimal transaction
      await pixUpService.createQrCode(
        config.pixUpApiKey,
        1.00,
        "Test User",
        "12345678900",
        "test-transaction"
      );
      
      toast.success("Conexão com PixUp estabelecida com sucesso!");
    } catch (error) {
      toast.error("Erro ao conectar com PixUp. Verifique sua chave API.");
      console.error("PixUp connection error:", error);
    }
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
      <div className="space-y-2">
        <Label htmlFor="pixup-client-id">Client ID</Label>
        <Input
          id="pixup-client-id"
          value={config.pixUpClientId || ""}
          onChange={(e) => handleClientIdChange(e.target.value)}
          placeholder="Insira seu Client ID do PixUp"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pixup-client-secret">Client Secret</Label>
        <Input
          id="pixup-client-secret"
          type="password"
          value={config.pixUpClientSecret || ""}
          onChange={(e) => handleClientSecretChange(e.target.value)}
          placeholder="Insira seu Client Secret do PixUp"
        />
      </div>
      <Button 
        variant="outline" 
        onClick={testConnection}
        className="w-full"
      >
        Testar Conexão
      </Button>
    </div>
  );
};