import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PixToggleSection } from "./pix-config/PixToggleSection";
import { PixKeyForm } from "./pix-config/PixKeyForm";
import { PixPayForm } from "./pix-config/PixPayForm";
import { PixUpForm } from "./pix-config/PixUpForm";
import { PixApiKeySection } from "./pix-config/PixApiKeySection";
import { usePixConfig } from "./pix-config/usePixConfig";

export const PixConfigManager = () => {
  const {
    config,
    setConfig,
    tictoApiKey,
    setTictoApiKey,
    handleTictoToggle,
    handleCustomKeysToggle,
    handlePixPayToggle,
    handlePixUpToggle,
    handleMaintenanceToggle,
    handleSave,
  } = usePixConfig();

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
          onPixUpToggle={handlePixUpToggle}
          onMaintenanceToggle={handleMaintenanceToggle}
        />

        {config.enabled && (
          <PixApiKeySection
            tictoApiKey={tictoApiKey}
            onTictoApiKeyChange={setTictoApiKey}
          />
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

        {config.usePixUp && (
          <PixUpForm
            config={config}
            onConfigChange={setConfig}
          />
        )}

        <Button onClick={handleSave}>Salvar Configurações</Button>
      </CardContent>
    </Card>
  );
};