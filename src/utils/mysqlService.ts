import { toast } from "sonner";

const API_BASE_URL = 'http://localhost/api';

export const mysqlService = {
  // Store settings operations
  async getStoreSettings() {
    try {
      const response = await fetch(`${API_BASE_URL}/store-config/read.php`);
      if (!response.ok) throw new Error('Failed to fetch store settings');
      return await response.json();
    } catch (error) {
      console.error('Error fetching store settings:', error);
      toast.error("Erro ao carregar configurações da loja");
      return null;
    }
  },

  async saveStoreSettings(settings: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/store-config/update.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (!response.ok) throw new Error('Failed to save store settings');
      return await response.json();
    } catch (error) {
      console.error('Error saving store settings:', error);
      toast.error("Erro ao salvar configurações da loja");
      throw error;
    }
  }
};