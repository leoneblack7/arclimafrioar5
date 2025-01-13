import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PixConfig } from "@/types/pix";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

const defaultConfig: PixConfig = {
  enabled: false,
  useCustomKeys: false,
  usePixPay: false,
  pixKey: "",
  pixName: "",
  pixCity: "",
  pixPayClientId: "",
  pixPayClientSecret: "",
  maintenanceMode: true,
};

export const usePixConfig = () => {
  const [config, setConfig] = useState<PixConfig>(defaultConfig);
  const [tictoApiKey, setTictoApiKey] = useState("");

  useEffect(() => {
    const savedConfig = getFromLocalStorage("PIX_CONFIG", defaultConfig);
    if (!localStorage.getItem("PIX_CONFIG")) {
      savedConfig.maintenanceMode = true;
    }
    setConfig(savedConfig);
    
    const savedKey = localStorage.getItem("TICTO_API_KEY");
    if (savedKey) {
      setTictoApiKey(savedKey);
    }
  }, []);

  const handleTictoToggle = (checked: boolean) => {
    if (config.maintenanceMode && checked) {
      toast.error("Desative o modo de manutenção primeiro");
      return;
    }
    setConfig({
      ...config,
      enabled: checked,
      useCustomKeys: checked ? false : config.useCustomKeys,
      usePixPay: checked ? false : config.usePixPay,
    });
  };

  const handleCustomKeysToggle = (checked: boolean) => {
    if (config.maintenanceMode && checked) {
      toast.error("Desative o modo de manutenção primeiro");
      return;
    }
    setConfig({
      ...config,
      useCustomKeys: checked,
      enabled: checked ? false : config.enabled,
      usePixPay: checked ? false : config.usePixPay,
    });
  };

  const handlePixPayToggle = (checked: boolean) => {
    if (config.maintenanceMode && checked) {
      toast.error("Desative o modo de manutenção primeiro");
      return;
    }
    setConfig({
      ...config,
      usePixPay: checked,
      enabled: checked ? false : config.enabled,
      useCustomKeys: checked ? false : config.useCustomKeys,
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

  return {
    config,
    setConfig,
    tictoApiKey,
    setTictoApiKey,
    handleTictoToggle,
    handleCustomKeysToggle,
    handlePixPayToggle,
    handleMaintenanceToggle,
    handleSave,
  };
};