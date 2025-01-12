import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import { ProductScraperService } from "@/utils/ProductScraperService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";

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
      title: "Ar Condicionado Split 12000 BTUs Inverter",
      price: 2499.99,
      image: "/placeholder.svg",
      description: "Ar condicionado split 12000 BTUs com tecnologia inverter, economia de energia",
      active: true
    },
    {
      id: 2,
      title: "Ar Condicionado Split 9000 BTUs",
      price: 1899.99,
      image: "/placeholder.svg",
      description: "Ar condicionado split 9000 BTUs ideal para ambientes pequenos",
      active: true
    },
    {
      id: 3,
      title: "Ar Condicionado Portátil 12000 BTUs",
      price: 3299.99,
      image: "/placeholder.svg",
      description: "Ar condicionado portátil com mobilidade e praticidade",
      active: true
    },
    {
      id: 4,
      title: "Ar Condicionado Split 18000 BTUs",
      price: 3599.99,
      image: "/placeholder.svg",
      description: "Ar condicionado split 18000 BTUs para ambientes grandes",
      active: true
    },
    {
      id: 5,
      title: "Ar Condicionado Split 24000 BTUs",
      price: 4299.99,
      image: "/placeholder.svg",
      description: "Ar condicionado split 24000 BTUs para áreas extensas",
      active: true
    }
  ]);

  const [importUrl, setImportUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      ));
      setIsDialogOpen(false);
      setEditingProduct(null);
      toast.success("Produto atualizado com sucesso!");
    }
  };

  const handleNewProduct = () => {
    const newProduct: Product = {
      id: products.length + 1,
      title: "Novo Produto",
      price: 0,
      image: "/placeholder.svg",
      description: "Descrição do novo produto",
      active: true
    };
    setEditingProduct(newProduct);
    setIsDialogOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct({
          ...editingProduct,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <Button onClick={handleNewProduct} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>
      
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct?.id ? "Editar Produto" : "Novo Produto"}
            </DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título</label>
                <Input
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    title: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Preço</label>
                <Input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    price: parseFloat(e.target.value)
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                <Textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    description: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Imagem</label>
                <div className="flex items-center gap-4">
                  <img
                    src={editingProduct.image}
                    alt={editingProduct.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit}>
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
                      onClick={() => handleEditProduct(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
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