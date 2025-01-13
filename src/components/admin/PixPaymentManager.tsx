import { useProductManager } from "@/hooks/useProductManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { Product } from "@/types/product";

export const PixPaymentManager = () => {
  const { products, handleSaveProduct } = useProductManager();
  const featuredProducts = getFromLocalStorage('featured-products', []) as Product[];
  const pixLinksEnabled = getFromLocalStorage('pix-links-enabled', false);

  // Combine and remove duplicates based on product ID
  const allProducts = [...products, ...featuredProducts].filter((product, index, self) =>
    index === self.findIndex((p) => p.id === product.id)
  );

  const handleSetPixLink = async (productId: number, pixLink: string) => {
    const product = allProducts.find((p) => p.id === productId);
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

  const togglePixLinks = () => {
    const newState = !pixLinksEnabled;
    saveToLocalStorage('pix-links-enabled', newState);
    
    if (newState) {
      // Disable all PIX configurations when enabling PIX Links
      const pixConfig = getFromLocalStorage('PIX_CONFIG', {});
      saveToLocalStorage('PIX_CONFIG', {
        ...pixConfig,
        enabled: false,
        useCustomKeys: false,
        usePixPay: false,
        usePixUp: false,
        maintenance: false
      });
      toast.success("Links PIX ativados e configurações PIX desativadas");
    } else {
      toast.success("Links PIX desativados");
    }
    
    // Force page reload to update all components
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciar Links PIX</h2>
        <div className="flex items-center space-x-2">
          <Switch
            id="pix-links-enabled"
            checked={pixLinksEnabled}
            onCheckedChange={togglePixLinks}
          />
          <Label htmlFor="pix-links-enabled">
            {pixLinksEnabled ? "Ativo" : "Inativo"}
          </Label>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Link PIX</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>
                {featuredProducts.some(p => p.id === product.id) ? 'Destaque' : 'Regular'}
              </TableCell>
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
                  disabled={!pixLinksEnabled}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleSetPixLink(product.id, "")}
                  disabled={!pixLinksEnabled}
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