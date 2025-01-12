import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";
import { PixToggleSection } from "./pix-config/PixToggleSection";
import { PixKeyForm } from "./pix-config/PixKeyForm";
import { PixConfig } from "@/types/pix";

const defaultConfig: PixConfig = {
  enabled: false,
  useCustomKeys: false,
  pixKey: "",
  pixName: "",
  pixCity: "",
};

export const PixConfigManager = () => {
  const [config, setConfig] = useState<PixConfig>(defaultConfig);

  useEffect(() => {
    const savedConfig = getFromLocalStorage("PIX_CONFIG", defaultConfig);
    setConfig(savedConfig);
  }, []);

  const handleTictoToggle = (checked: boolean) => {
    setConfig({
      ...config,
      enabled: checked,
      useCustomKeys: checked ? false : config.useCustomKeys
    });
  };

  const handleCustomKeysToggle = (checked: boolean) => {
    setConfig({
      ...config,
      useCustomKeys: checked,
      enabled: checked ? false : config.enabled
    });
  };

  const handleSave = () => {
    saveToLocalStorage("PIX_CONFIG", config);
    let message = "";
    
    if (config.enabled) {
      message = "Integração Ticto PIX está ativada";
    } else if (config.useCustomKeys) {
      message = "Chaves PIX personalizadas estão ativadas";
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
        />

        {config.useCustomKeys && (
          <PixKeyForm
            config={config}
            onConfigChange={setConfig}
          />
        )}

        <Button onClick={handleSave}>Salvar Configurações</Button>
      </CardContent>
    </Card>
  );
};