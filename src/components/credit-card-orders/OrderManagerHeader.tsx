import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OrderManagerHeaderProps {
  onDownloadAll: () => void;
  totalOrders: number;
}

export function OrderManagerHeader({ onDownloadAll, totalOrders }: OrderManagerHeaderProps) {
  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Pedidos com Cartão</CardTitle>
            <Badge variant="secondary">{totalOrders} pedidos</Badge>
          </div>
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