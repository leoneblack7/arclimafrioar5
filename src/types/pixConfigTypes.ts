import { PixConfig } from "./pix";

export type PixConfigAction = 
  | { type: 'TOGGLE_TICTO'; checked: boolean }
  | { type: 'TOGGLE_CUSTOM_KEYS'; checked: boolean }
  | { type: 'TOGGLE_PIX_PAY'; checked: boolean }
  | { type: 'TOGGLE_PIX_UP'; checked: boolean }
  | { type: 'TOGGLE_MAINTENANCE'; checked: boolean }
  | { type: 'SET_CONFIG'; config: PixConfig }
  | { type: 'SET_TICTO_API_KEY'; key: string };

export type PixConfigState = {
  config: PixConfig;
  tictoApiKey: string;
};