import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types/product";

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
  onToggleActive: (productId: number) => void;
}

export const ProductsTable = ({ products, onEdit, onDelete, onToggleActive }: ProductsTableProps) => {
  const handleDelete = (productId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      onDelete(productId);
      toast.success("Produto removido com sucesso!");
    }
  };

  const formatProductCode = (id: number) => {
    return String(id).padStart(5, '0');
  };

  return (
    <div className="bg-background rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-foreground dark:text-foreground">Código</TableHead>
            <TableHead className="text-foreground dark:text-foreground">Produto</TableHead>
            <TableHead className="text-foreground dark:text-foreground">Preço</TableHead>
            <TableHead className="text-foreground dark:text-foreground">Status</TableHead>
            <TableHead className="text-foreground dark:text-foreground">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="text-foreground dark:text-foreground font-mono">
                {formatProductCode(product.id)}
              </TableCell>
              <TableCell className="text-foreground dark:text-foreground">
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-foreground dark:text-foreground">{product.title}</p>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground truncate max-w-md">
                      {product.description}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-foreground dark:text-foreground">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </TableCell>
              <TableCell>
                <Switch
                  checked={product.active}
                  onCheckedChange={() => onToggleActive(product.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};