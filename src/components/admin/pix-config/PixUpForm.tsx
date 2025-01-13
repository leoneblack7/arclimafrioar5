import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PixConfig } from "@/types/pix";
import { toast } from "sonner";
import { pixUpService } from "@/services/pixUpService";

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

  const generateTestPix = async () => {
    if (!config.pixUpClientId || !config.pixUpClientSecret) {
      toast.error("Por favor, preencha o Client ID e Client Secret");
      return;
    }

    try {
      toast.info("Gerando PIX de teste...");
      
      // Primeiro autenticar
      const authResponse = await pixUpService.authenticate(
        config.pixUpClientId,
        config.pixUpClientSecret
      );

      if (!authResponse.access_token) {
        toast.error("Erro na autenticação com PixUp");
        return;
      }

      // Gerar QR Code PIX
      const qrCodeResponse = await pixUpService.createQrCode(
        authResponse.access_token,
        5000, // R$ 50,00 em centavos
        "Cliente Teste",
        "12345678900", // CPF de teste
        `TEST-${Date.now()}` // ID único para o teste
      );

      if (qrCodeResponse.emvqrcps) {
        toast.success("PIX de teste gerado com sucesso!", {
          description: `ID da transação: ${qrCodeResponse.transactionId}`
        });
      } else {
        toast.error("Erro ao gerar PIX de teste: Resposta inválida");
      }
    } catch (error) {
      console.error("Erro ao gerar PIX de teste:", error);
      toast.error("Erro ao gerar PIX de teste. Verifique suas credenciais.");
    }
  };

  const testConnection = async () => {
    if (!config.pixUpClientId || !config.pixUpClientSecret) {
      toast.error("Por favor, preencha o Client ID e Client Secret");
      return;
    }

    try {
      toast.info("Testando conexão com PixUp...");
      
      const response = await pixUpService.authenticate(
        config.pixUpClientId,
        config.pixUpClientSecret
      );

      if (response.access_token) {
        toast.success("Conexão com PixUp estabelecida com sucesso!");
      } else {
        toast.error("Erro ao conectar com PixUp: Resposta inválida");
      }
    } catch (error) {
      console.error("PixUp connection error:", error);
      toast.error("Erro ao testar conexão com PixUp. Verifique suas credenciais.");
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
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            onClick={testConnection}
            className="w-full"
          >
            Testar Conexão
          </Button>
          <Button 
            variant="default" 
            onClick={generateTestPix}
            className="w-full"
          >
            Gerar PIX de Teste (R$ 50,00)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};