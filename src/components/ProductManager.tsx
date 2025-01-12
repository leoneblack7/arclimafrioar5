import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { ProductScraperService } from "@/utils/ProductScraperService";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  active: boolean;
}

export const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Ar Condicionado Split 12000 BTUs",
      price: 2499.99,
      image: "https://example.com/ac-image.jpg",
      description: "Ar condicionado split 12000 BTUs com tecnologia inverter",
      active: true
    },
    // Add more sample products here if needed
  ]);
  const [importUrl, setImportUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const handleImportProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsImporting(true);

    try {
      const scrapedProduct = await ProductScraperService.scrapeProduct(importUrl);
      
      if (scrapedProduct) {
        const newProduct = {
          id: products.length + 1,
          title: scrapedProduct.title,
          price: scrapedProduct.price,
          image: scrapedProduct.images[0] || '',
          description: scrapedProduct.description,
          active: true
        };

        setProducts([...products, newProduct]);
        setImportUrl("");
        toast.success("Produto importado com sucesso!");
      }
    } catch (error) {
      console.error('Error importing product:', error);
      toast.error("Erro ao importar produto. Verifique o link e tente novamente.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleToggleActive = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, active: !product.active }
        : product
    ));
    toast.success("Status do produto atualizado!");
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts(products.filter(product => product.id !== productId));
      toast.success("Produto removido com sucesso!");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Importar Produto</h3>
        <form onSubmit={handleImportProduct} className="flex gap-4">
          <Input
            type="url"
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            placeholder="Cole o link do produto aqui"
            className="flex-1"
          />
          <Button type="submit" disabled={isImporting}>
            {isImporting ? "Importando..." : "Importar"}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{product.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={product.active}
                    onCheckedChange={() => handleToggleActive(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
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
    </div>
  );
};