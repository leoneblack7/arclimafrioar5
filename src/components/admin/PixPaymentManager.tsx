import { useProductManager } from "@/hooks/useProductManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const PixPaymentManager = () => {
  const { products, handleSaveProduct } = useProductManager();

  const handleSetPixLink = async (productId: number, pixLink: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    try {
      await handleSaveProduct({
        ...product,
        pixLink: pixLink || "https://payment.ticto.app/O368AB06D"
      });
      toast.success("Link PIX atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar link PIX");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciar Links PIX</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Link PIX</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                <Input
                  defaultValue={product.pixLink || "https://payment.ticto.app/O368AB06D"}
                  onChange={(e) => handleSetPixLink(product.id, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleSetPixLink(product.id, "")}
                >
                  Definir Link Padrão
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};