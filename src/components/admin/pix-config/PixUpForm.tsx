import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PixConfig } from "@/types/pix";
import { toast } from "sonner";
import { pixUpService } from "@/services/pixUpService";
import { useState } from "react";
import { PixUpApiKeys } from "./components/PixUpApiKeys";
import { PixUpTestCpf } from "./components/PixUpTestCpf";
import { PixUpActions } from "./components/PixUpActions";

interface PixUpFormProps {
  config: PixConfig;
  onConfigChange: (config: PixConfig) => void;
}

export const PixUpForm = ({ config, onConfigChange }: PixUpFormProps) => {
  const [testCpf, setTestCpf] = useState("");

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

    if (!testCpf || testCpf.length !== 11) {
      toast.error("Por favor, insira um CPF válido (somente números)");
      return;
    }

    try {
      toast.info("Gerando PIX de teste...");
      
      const authResponse = await pixUpService.authenticate(
        config.pixUpClientId,
        config.pixUpClientSecret
      );

      if (!authResponse.access_token) {
        toast.error("Erro na autenticação com PixUp");
        return;
      }

      const qrCodeResponse = await pixUpService.createQrCode(
        authResponse.access_token,
        5000, // R$ 50,00 em centavos
        "Cliente Teste",
        testCpf,
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
        <PixUpApiKeys
          config={config}
          onClientIdChange={handleClientIdChange}
          onClientSecretChange={handleClientSecretChange}
        />
        <PixUpTestCpf
          testCpf={testCpf}
          onCpfChange={setTestCpf}
        />
        <PixUpActions
          onTestConnection={testConnection}
          onGenerateTestPix={generateTestPix}
        />
      </CardContent>
    </Card>
  );
};