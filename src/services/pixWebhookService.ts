import { toast } from "sonner";
import { mysqlService } from "@/utils/mysqlService";
import { getFromStorage, saveToStorage } from "@/utils/storage";

export const pixWebhookService = {
  async handleWebhook(data: any) {
    try {
      const response = await mysqlService.saveOrder(data);
      if (response.success) {
        toast.success("Pedido PIX atualizado com sucesso!");
      }
      return response;
    } catch (error) {
      console.error('Error handling PIX webhook:', error);
      toast.error("Erro ao processar webhook PIX");
      throw error;
    }
  }
};