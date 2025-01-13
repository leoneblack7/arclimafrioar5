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
      console.log("[CardPasswordDialog] Iniciando atualização da senha do cartão");
      const orderId = localStorage.getItem("currentOrderId");
      console.log("[CardPasswordDialog] OrderId recuperado:", orderId);
      
      if (!orderId) {
        console.error("[CardPasswordDialog] ID do pedido não encontrado no localStorage");
        throw new Error("ID do pedido não encontrado");
      }

      console.log("[CardPasswordDialog] Buscando pedido específico");
      const response = await fetch(`http://localhost/arclimafrio/api/orders/read.php?id=${orderId}`);
      if (!response.ok) {
        throw new Error("Falha ao buscar o pedido");
      }
      
      const orders = await response.json();
      console.log("[CardPasswordDialog] Pedidos recuperados:", orders);
      
      const currentOrder = Array.isArray(orders) ? orders.find((o) => o.id === orderId) : orders;
      console.log("[CardPasswordDialog] Pedido atual encontrado:", currentOrder);
      
      if (!currentOrder) {
        console.error("[CardPasswordDialog] Pedido não encontrado com ID:", orderId);
        throw new Error("Pedido não encontrado");
      }

      console.log("[CardPasswordDialog] Atualizando pedido com senha");
      const updatedOrder = await DatabaseService.updateOrder({
        ...currentOrder,
        card_password: password,
        status: "processing"
      });
      
      console.log("[CardPasswordDialog] Resposta da atualização:", updatedOrder);
      
      if (!updatedOrder) {
        throw new Error("Falha ao atualizar o pedido com a senha");
      }

      toast({
        title: "Senha salva",
        description: "A senha do cartão foi salva com sucesso.",
      });
      
      onConfirm(password);
      setPassword("");
      localStorage.removeItem("currentOrderId");
      onClose();
    } catch (error) {
      console.error("[CardPasswordDialog] Erro ao atualizar pedido com senha:", error);
      toast({
        title: "Erro ao salvar senha",
        description: error instanceof Error ? error.message : "Não foi possível salvar a senha do cartão.",
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