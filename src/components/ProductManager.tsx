import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Dialog } from "./ui/dialog";
import { ProductForm } from "./admin/ProductForm";
import { ProductImportForm } from "./admin/ProductImportForm";
import { ProductsTable } from "./admin/ProductsTable";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

export const ProductManager = () => {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const storedProducts = getFromLocalStorage('products', []);
      return storedProducts.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image || '/placeholder.svg',
        description: item.description,
        active: item.active || false
      }));
    }
  });

  const handleNewProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: "Novo Produto",
      price: 0,
      image: "/placeholder.svg",
      description: "Descrição do novo produto",
      active: true
    };
    setEditingProduct(newProduct);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      let updatedProducts;
      if (updatedProduct.id) {
        updatedProducts = products.map(p => 
          p.id === updatedProduct.id ? updatedProduct : p
        );
        toast.success("Produto atualizado com sucesso!");
      } else {
        const newProduct = {
          ...updatedProduct,
          id: Date.now().toString()
        };
        updatedProducts = [...products, newProduct];
        toast.success("Produto adicionado com sucesso!");
      }
      
      saveToLocalStorage('products', updatedProducts);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error("Erro ao salvar produto");
    }
  };

  const handleImportProduct = async (scrapedProduct: any) => {
    try {
      const newProduct = {
        id: Date.now().toString(),
        title: scrapedProduct.title,
        price: scrapedProduct.price,
        image: scrapedProduct.images[0] || '/placeholder.svg',
        description: scrapedProduct.description,
        active: true
      };
      
      const updatedProducts = [...products, newProduct];
      saveToLocalStorage('products', updatedProducts);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto importado com sucesso!");
    } catch (error) {
      console.error('Error importing product:', error);
      toast.error("Erro ao importar produto");
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
        <Button onClick={handleNewProduct} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>
      
      <ProductImportForm onImport={handleImportProduct} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditingProduct(null);
            }}
          />
        )}
      </Dialog>

      <ProductsTable
        products={products}
        onEdit={(product) => {
          setEditingProduct(product);
          setIsDialogOpen(true);
        }}
        onDelete={async (productId) => {
          try {
            const updatedProducts = products.filter(p => p.id !== productId);
            saveToLocalStorage('products', updatedProducts);
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Produto removido com sucesso!");
          } catch (error) {
            console.error('Error deleting product:', error);
            toast.error("Erro ao remover produto");
          }
        }}
        onToggleActive={async (productId) => {
          const product = products.find(p => p.id === productId);
          if (!product) return;

          try {
            const updatedProducts = products.map(p => 
              p.id === productId ? { ...p, active: !p.active } : p
            );
            saveToLocalStorage('products', updatedProducts);
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Status do produto atualizado!");
          } catch (error) {
            console.error('Error updating product status:', error);
            toast.error("Erro ao atualizar status do produto");
          }
        }}
      />
    </div>
  );
};