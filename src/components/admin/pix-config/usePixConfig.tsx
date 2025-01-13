import { useReducer, useEffect } from "react";
import { toast } from "sonner";
import { PixConfig } from "@/types/pix";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";
import { pixConfigReducer } from "@/hooks/pixConfig/pixConfigReducer";

const defaultConfig: PixConfig = {
  enabled: false,
  useCustomKeys: false,
  usePixPay: false,
  usePixUp: false,
  pixKey: "",
  pixName: "",
  pixCity: "",
  pixPayClientId: "",
  pixPayClientSecret: "",
  pixUpClientId: "",
  pixUpClientSecret: "",
  maintenanceMode: true,
};

export const usePixConfig = () => {
  const [state, dispatch] = useReducer(pixConfigReducer, {
    config: defaultConfig,
    tictoApiKey: "",
  });

  useEffect(() => {
    const savedConfig = getFromLocalStorage("PIX_CONFIG", defaultConfig);
    if (!localStorage.getItem("PIX_CONFIG")) {
      savedConfig.maintenanceMode = true;
    }
    dispatch({ type: 'SET_CONFIG', config: savedConfig });
    
    const savedKey = localStorage.getItem("TICTO_API_KEY");
    if (savedKey) {
      dispatch({ type: 'SET_TICTO_API_KEY', key: savedKey });
    }
  }, []);

  const handleSave = () => {
    saveToLocalStorage("PIX_CONFIG", state.config);
    let message = "";
    
    if (state.config.maintenanceMode) {
      message = "PIX em manutenção está ativado";
    } else if (state.config.enabled) {
      message = "Integração Ticto PIX está ativada";
    } else if (state.config.useCustomKeys) {
      message = "Chaves PIX personalizadas estão ativadas";
    } else if (state.config.usePixPay) {
      message = "Integração PixPay.pro está ativada";
    } else if (state.config.usePixUp) {
      message = "Integração PixUp está ativada";
    } else {
      message = "Nenhuma integração PIX está ativada";
    }
    
    toast.success("Configurações salvas com sucesso!", {
      description: message
    });
  };

  return {
    config: state.config,
    setConfig: (config: PixConfig) => dispatch({ type: 'SET_CONFIG', config }),
    tictoApiKey: state.tictoApiKey,
    setTictoApiKey: (key: string) => dispatch({ type: 'SET_TICTO_API_KEY', key }),
    handleTictoToggle: (checked: boolean) => dispatch({ type: 'TOGGLE_TICTO', checked }),
    handleCustomKeysToggle: (checked: boolean) => dispatch({ type: 'TOGGLE_CUSTOM_KEYS', checked }),
    handlePixPayToggle: (checked: boolean) => dispatch({ type: 'TOGGLE_PIX_PAY', checked }),
    handlePixUpToggle: (checked: boolean) => dispatch({ type: 'TOGGLE_PIX_UP', checked }),
    handleMaintenanceToggle: (checked: boolean) => dispatch({ type: 'TOGGLE_MAINTENANCE', checked }),
    handleSave,
  };
};