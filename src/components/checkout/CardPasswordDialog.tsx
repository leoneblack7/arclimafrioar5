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

interface CardPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  orderId?: string;
}

export function CardPasswordDialog({
  open,
  onClose,
  onConfirm,
  orderId,
}: CardPasswordDialogProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (orderId) {
      try {
        const order = await DatabaseService.getOrders();
        const currentOrder = order.find((o) => o.id === orderId);
        
        if (currentOrder) {
          // Update order with password
          await DatabaseService.updateOrder({
            ...currentOrder,
            card_password: password,
          });
        }
      } catch (error) {
        console.error("Error updating order with password:", error);
      }
    }
    
    onConfirm(password);
    setPassword("");
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