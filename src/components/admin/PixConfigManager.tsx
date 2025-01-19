import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PixToggleSection } from "./pix-config/PixToggleSection";
import { PixKeyForm } from "./pix-config/PixKeyForm";
import { PixPayForm } from "./pix-config/PixPayForm";
import { PixUpForm } from "./pix-config/PixUpForm";
import { PixApiKeySection } from "./pix-config/PixApiKeySection";
import { usePixConfig } from "./pix-config/usePixConfig";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mysqlService } from "@/utils/mysqlService";
import { useState, useEffect } from "react";

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

  const [pixLinksEnabled, setPixLinksEnabled] = useState(false);

  useEffect(() => {
    const loadPixLinksStatus = async () => {
      try {
        const storeConfig = await mysqlService.getStoreSettings();
        setPixLinksEnabled(storeConfig.pix_links_enabled || false);
      } catch (error) {
        console.error("Error loading PIX links status:", error);
        toast.error("Erro ao carregar status dos Links PIX");
      }
    };

    loadPixLinksStatus();
  }, []);

  const handlePixLinksToggle = async (checked: boolean) => {
    try {
      await mysqlService.saveStoreSettings({ pix_links_enabled: checked });
      setPixLinksEnabled(checked);
      toast.success(checked ? "Links PIX ativados" : "Links PIX desativados");
    } catch (error) {
      console.error("Error toggling PIX links:", error);
      toast.error("Erro ao alterar status dos Links PIX");
    }
  };

  if (pixLinksEnabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Configurações do PIX</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Links PIX</Label>
              <p className="text-sm text-muted-foreground">
                Ative ou desative os Links PIX
              </p>
            </div>
            <Switch
              checked={pixLinksEnabled}
              onCheckedChange={handlePixLinksToggle}
            />
          </div>
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
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Links PIX</Label>
            <p className="text-sm text-muted-foreground">
              Ative ou desative os Links PIX
            </p>
          </div>
          <Switch
            checked={pixLinksEnabled}
            onCheckedChange={handlePixLinksToggle}
          />
        </div>

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