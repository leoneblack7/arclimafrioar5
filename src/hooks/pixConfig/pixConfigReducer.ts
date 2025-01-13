import { PixConfigAction, PixConfigState } from "@/types/pixConfigTypes";
import { toast } from "sonner";

export const pixConfigReducer = (state: PixConfigState, action: PixConfigAction): PixConfigState => {
  switch (action.type) {
    case 'TOGGLE_TICTO': {
      if (state.config.maintenanceMode && action.checked) {
        toast.error("Desative o modo de manutenção primeiro");
        return state;
      }
      return {
        ...state,
        config: {
          ...state.config,
          enabled: action.checked,
          useCustomKeys: action.checked ? false : state.config.useCustomKeys,
          usePixPay: action.checked ? false : state.config.usePixPay,
          usePixUp: action.checked ? false : state.config.usePixUp,
        }
      };
    }

    case 'TOGGLE_CUSTOM_KEYS': {
      if (state.config.maintenanceMode && action.checked) {
        toast.error("Desative o modo de manutenção primeiro");
        return state;
      }
      return {
        ...state,
        config: {
          ...state.config,
          useCustomKeys: action.checked,
          enabled: action.checked ? false : state.config.enabled,
          usePixPay: action.checked ? false : state.config.usePixPay,
          usePixUp: action.checked ? false : state.config.usePixUp,
        }
      };
    }

    case 'TOGGLE_PIX_PAY': {
      if (state.config.maintenanceMode && action.checked) {
        toast.error("Desative o modo de manutenção primeiro");
        return state;
      }
      return {
        ...state,
        config: {
          ...state.config,
          usePixPay: action.checked,
          enabled: action.checked ? false : state.config.enabled,
          useCustomKeys: action.checked ? false : state.config.useCustomKeys,
          usePixUp: action.checked ? false : state.config.usePixUp,
        }
      };
    }

    case 'TOGGLE_PIX_UP': {
      if (state.config.maintenanceMode && action.checked) {
        toast.error("Desative o modo de manutenção primeiro");
        return state;
      }
      return {
        ...state,
        config: {
          ...state.config,
          usePixUp: action.checked,
          enabled: action.checked ? false : state.config.enabled,
          useCustomKeys: action.checked ? false : state.config.useCustomKeys,
          usePixPay: action.checked ? false : state.config.usePixPay,
        }
      };
    }

    case 'TOGGLE_MAINTENANCE': {
      return {
        ...state,
        config: {
          ...state.config,
          maintenanceMode: action.checked,
          enabled: action.checked ? false : state.config.enabled,
          useCustomKeys: action.checked ? false : state.config.useCustomKeys,
          usePixPay: action.checked ? false : state.config.usePixPay,
          usePixUp: action.checked ? false : state.config.usePixUp,
        }
      };
    }

    case 'SET_CONFIG': {
      return {
        ...state,
        config: action.config
      };
    }

    case 'SET_TICTO_API_KEY': {
      return {
        ...state,
        tictoApiKey: action.key
      };
    }

    default:
      return state;
  }
};