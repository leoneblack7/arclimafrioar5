import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";
import { PixToggleSection } from "./pix-config/PixToggleSection";
import { PixKeyForm } from "./pix-config/PixKeyForm";
import { PixPayForm } from "./pix-config/PixPayForm";
import { PixConfig } from "@/types/pix";

const defaultConfig: PixConfig = {
  enabled: false,
  useCustomKeys: false,
  usePixPay: false,
  pixKey: "",
  pixName: "",
  pixCity: "",
  pixPayClientId: "",
  pixPayClientSecret: "",
  maintenanceMode: false,
};

export const PixConfigManager = () => {
  const [config, setConfig] = useState<PixConfig>(defaultConfig);
  const [tictoApiKey, setTictoApiKey] = useState("");

  useEffect(() => {
    const savedConfig = getFromLocalStorage("PIX_CONFIG", defaultConfig);
    setConfig(savedConfig);
    const savedKey = localStorage.getItem("TICTO_API_KEY");
    if (savedKey) {
      setTictoApiKey(savedKey);
    }
  }, []);

  const handleTictoToggle = (checked: boolean) => {
    setConfig({
      ...config,
      enabled: checked,
      useCustomKeys: checked ? false : config.useCustomKeys,
      usePixPay: checked ? false : config.usePixPay,
      maintenanceMode: false
    });
  };

  const handleCustomKeysToggle = (checked: boolean) => {
    setConfig({
      ...config,
      useCustomKeys: checked,
      enabled: checked ? false : config.enabled,
      usePixPay: checked ? false : config.usePixPay,
      maintenanceMode: false
    });
  };

  const handlePixPayToggle = (checked: boolean) => {
    setConfig({
      ...config,
      usePixPay: checked,
      enabled: checked ? false : config.enabled,
      useCustomKeys: checked ? false : config.useCustomKeys,
      maintenanceMode: false
    });
  };

  const handleMaintenanceToggle = (checked: boolean) => {
    setConfig({
      ...config,
      maintenanceMode: checked,
      enabled: checked ? false : config.enabled,
      useCustomKeys: checked ? false : config.useCustomKeys,
      usePixPay: checked ? false : config.usePixPay
    });
  };

  const handleSaveTictoKey = () => {
    if (!tictoApiKey.trim()) {
      toast.error("Por favor, insira uma chave API válida");
      return;
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(tictoApiKey.trim())) {
      toast.error("Por favor, insira uma chave API válida no formato correto");
      return;
    }

    localStorage.setItem("TICTO_API_KEY", tictoApiKey.trim());
    toast.success("Chave API Ticto salva com sucesso!");
  };

  const handleSave = () => {
    saveToLocalStorage("PIX_CONFIG", config);
    let message = "";
    
    if (config.maintenanceMode) {
      message = "PIX em manutenção está ativado";
    } else if (config.enabled) {
      message = "Integração Ticto PIX está ativada";
    } else if (config.useCustomKeys) {
      message = "Chaves PIX personalizadas estão ativadas";
    } else if (config.usePixPay) {
      message = "Integração PixPay.pro está ativada";
    } else {
      message = "Nenhuma integração PIX está ativada";
    }
    
    toast.success("Configurações salvas com sucesso!", {
      description: message
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do PIX</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <PixToggleSection
          config={config}
          onTictoToggle={handleTictoToggle}
          onCustomKeysToggle={handleCustomKeysToggle}
          onPixPayToggle={handlePixPayToggle}
          onMaintenanceToggle={handleMaintenanceToggle}
        />

        {config.enabled && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Chave API Ticto</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Insira sua chave API Ticto no formato UUID (exemplo: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
              </p>
              <Input
                placeholder="9dd5fb2f-f1c7-432e-ba5c-32b53725cc44"
                value={tictoApiKey}
                onChange={(e) => setTictoApiKey(e.target.value)}
                type="text"
              />
              <Button onClick={handleSaveTictoKey} variant="outline" className="mt-2">
                Salvar Chave API
              </Button>
            </div>
          </div>
        )}

        {config.useCustomKeys && (
          <PixKeyForm
            config={config}
            onConfigChange={setConfig}
          />
        )}

        {config.usePixPay && (
          <PixPayForm
            config={config}
            onConfigChange={setConfig}
          />
        )}

        <Button onClick={handleSave}>Salvar Configurações</Button>
      </CardContent>
    </Card>
  );
};