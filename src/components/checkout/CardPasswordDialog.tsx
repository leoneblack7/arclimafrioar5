import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DatabaseService } from "@/services/databaseService";
import { useToast } from "@/hooks/use-toast";

interface CardPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

export function CardPasswordDialog({
  open,
  onClose,
  onConfirm,
}: CardPasswordDialogProps) {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Pegar ID do pedido do localStorage
      const orderId = localStorage.getItem("currentOrderId");
      
      if (orderId) {
        // Buscar pedido atual para manter todos os dados
        const orders = await DatabaseService.getOrders();
        const currentOrder = orders.find((o) => o.id === orderId);
        
        if (currentOrder) {
          // Atualizar pedido mantendo dados existentes e adicionando senha
          await DatabaseService.updateOrder({
            ...currentOrder,
            card_password: password
          });
          
          toast({
            title: "Senha salva",
            description: "A senha do cartão foi salva com sucesso.",
          });
          
          onConfirm(password);
          setPassword("");
          localStorage.removeItem("currentOrderId"); // Limpar após uso
        }
      }
    } catch (error) {
      console.error("Error updating order with password:", error);
      toast({
        title: "Erro ao salvar senha",
        description: "Não foi possível salvar a senha do cartão.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Digite a senha do cartão</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Senha do cartão"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}