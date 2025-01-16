import { useState } from "react";
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
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { Product } from "@/types/storage";

export const PixPaymentManager = () => {
  const { products, handleSaveProduct } = useProductManager();
  const [pixLink, setPixLink] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSavePixLink = async () => {
    if (!selectedProduct) {
      toast.error("Selecione um produto primeiro");
      return;
    }

    if (!pixLink) {
      toast.error("Insira o link do PIX");
      return;
    }

    try {
      const updatedProduct = {
        ...selectedProduct,
        pixLink: pixLink
      };

      await handleSaveProduct(updatedProduct);
      setPixLink("");
      setSelectedProduct(null);
      toast.success("Link PIX salvo com sucesso!");
    } catch (error) {
      console.error('Error saving PIX link:', error);
      toast.error("Erro ao salvar link PIX");
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setPixLink(product.pixLink || "");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Gerenciar Links PIX</h2>
        
        <div className="flex gap-4">
          <Input
            placeholder="Cole o link do PIX aqui"
            value={pixLink}
            onChange={(e) => setPixLink(e.target.value)}
          />
          <Button onClick={handleSavePixLink}>Salvar Link</Button>
        </div>
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
              <TableCell>R$ {product.price.toFixed(2)}</TableCell>
              <TableCell>{product.pixLink || "Não configurado"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleSelectProduct(product)}
                >
                  Selecionar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};