import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PixConfig } from "@/types/pix";
import { toast } from "sonner";

interface PixUpFormProps {
  config: PixConfig;
  onConfigChange: (config: PixConfig) => void;
}

export const PixUpForm = ({ config, onConfigChange }: PixUpFormProps) => {
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
    if (!config.pixUpClientId || !config.pixUpClientSecret) {
      toast.error("Por favor, preencha o Client ID e Client Secret");
      return;
    }

    try {
      toast.info("Testando conexão com PixUp...");
      
      const credentials = btoa(`${config.pixUpClientId}:${config.pixUpClientSecret}`);
      const response = await fetch('https://api.pixup.com.br/authentication', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials'
      });

      if (response.ok) {
        toast.success("Conexão com PixUp estabelecida com sucesso!");
      } else {
        const errorData = await response.json();
        toast.error(`Erro ao conectar com PixUp: ${errorData.message || 'Verifique suas credenciais'}`);
      }
    } catch (error) {
      console.error("PixUp connection error:", error);
      toast.error("Erro ao testar conexão com PixUp. Verifique se o serviço está disponível.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do PixUp</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
};