import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

interface PixConfig {
  enabled: boolean;
  useCustomKeys: boolean;
  pixKey: string;
  pixName: string;
  pixCity: string;
}

export const PixConfigManager = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<PixConfig>({
    enabled: false,
    useCustomKeys: false,
    pixKey: "",
    pixName: "",
    pixCity: "",
  });

  useEffect(() => {
    const savedConfig = getFromLocalStorage("PIX_CONFIG", null);
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, []);

  const handleSave = () => {
    saveToLocalStorage("PIX_CONFIG", config);
    toast({
      title: "Configurações salvas",
      description: "As configurações do PIX foram atualizadas com sucesso",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do PIX</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="pix-enabled"
            checked={config.enabled}
            onCheckedChange={(checked) => setConfig({ ...config, enabled: checked })}
          />
          <Label htmlFor="pix-enabled">Ativar integração Ticto PIX</Label>
        </div>

        {config.enabled && (
          <>
            <div className="flex items-center space-x-2">
              <Switch
                id="custom-keys"
                checked={config.useCustomKeys}
                onCheckedChange={(checked) => setConfig({ ...config, useCustomKeys: checked })}
              />
              <Label htmlFor="custom-keys">Usar chaves PIX personalizadas</Label>
            </div>

            {config.useCustomKeys && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pix-key">Chave PIX</Label>
                  <Input
                    id="pix-key"
                    value={config.pixKey}
                    onChange={(e) => setConfig({ ...config, pixKey: e.target.value })}
                    placeholder="CPF, CNPJ, Email ou Telefone"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pix-name">Nome do Beneficiário</Label>
                  <Input
                    id="pix-name"
                    value={config.pixName}
                    onChange={(e) => setConfig({ ...config, pixName: e.target.value })}
                    placeholder="Nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pix-city">Cidade</Label>
                  <Input
                    id="pix-city"
                    value={config.pixCity}
                    onChange={(e) => setConfig({ ...config, pixCity: e.target.value })}
                    placeholder="Cidade do beneficiário"
                  />
                </div>
              </div>
            )}

            <Button onClick={handleSave}>Salvar Configurações</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};