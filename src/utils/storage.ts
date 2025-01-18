import { mysqlService } from './mysqlService';

export const getFromStorage = async (key: string, defaultValue: any = null) => {
  try {
    const response = await mysqlService.getStoreSettings();
    return response[key] || defaultValue;
  } catch (error) {
    console.error('Error getting data from storage:', error);
    return defaultValue;
  }
};

export const saveToStorage = async (key: string, value: any) => {
  try {
    await mysqlService.saveStoreSettings({ [key]: value });
    return true;
  } catch (error) {
    console.error('Error saving data to storage:', error);
    return false;
  }
};