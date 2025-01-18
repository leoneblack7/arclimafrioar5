import { mysqlService } from './mysqlService';

export const getFromStorage = async (key: string, defaultValue: any = null) => {
  try {
    console.log(`Getting data from storage for key: ${key}`);
    const response = await mysqlService.getStoreSettings();
    return response[key] || defaultValue;
  } catch (error) {
    console.error('Error getting data from storage:', error);
    return defaultValue;
  }
};

export const saveToStorage = async (key: string, value: any) => {
  try {
    console.log(`Saving data to storage for key: ${key}`);
    await mysqlService.saveStoreSettings({ [key]: value });
    return true;
  } catch (error) {
    console.error('Error saving data to storage:', error);
    return false;
  }
};

// Temporary function to maintain compatibility during migration
export const getFromLocalStorage = (key: string, defaultValue: any = null) => {
  console.warn('getFromLocalStorage is deprecated. Please use getFromStorage instead.');
  return defaultValue;
};

// Temporary function to maintain compatibility during migration
export const saveToLocalStorage = (key: string, value: any) => {
  console.warn('saveToLocalStorage is deprecated. Please use saveToStorage instead.');
  return;
};