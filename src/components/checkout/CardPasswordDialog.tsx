import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
      console.log("[CardPasswordDialog] Iniciando confirmação de senha");
      onConfirm(password);
      setPassword("");
    } catch (error) {
      console.error("[CardPasswordDialog] Erro ao confirmar senha:", error);
      toast({
        title: "Erro ao confirmar senha",
        description: "Não foi possível confirmar a senha do cartão",
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