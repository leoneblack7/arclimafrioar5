import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PixToggleSection } from "./pix-config/PixToggleSection";
import { PixKeyForm } from "./pix-config/PixKeyForm";
import { PixPayForm } from "./pix-config/PixPayForm";
import { PixUpForm } from "./pix-config/PixUpForm";
import { PixApiKeySection } from "./pix-config/PixApiKeySection";
import { usePixConfig } from "./pix-config/usePixConfig";
import { getFromStorage } from "@/utils/storage";

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

  const pixLinksEnabled = getFromStorage('pix-links-enabled', false);

  if (pixLinksEnabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Configurações do PIX</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            As configurações do PIX estão desativadas porque os Links PIX estão ativos.
            Desative os Links PIX para acessar estas configurações.
          </p>
        </CardContent>
      </Card>
    );
  }

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
