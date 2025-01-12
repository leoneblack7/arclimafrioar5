import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";

interface OrderManagerHeaderProps {
  onDownloadAll: () => void;
}

export function OrderManagerHeader({ onDownloadAll }: OrderManagerHeaderProps) {
  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <div>
          <CardTitle>Pedidos com Cartão</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os pedidos com cartão de crédito
          </CardDescription>
        </div>
        <Button
          variant="outline"
          onClick={onDownloadAll}
          className="ml-4"
        >
          <Download className="w-4 h-4 mr-2" />
          Baixar Todos
        </Button>
      </div>
    </CardHeader>
  );
}