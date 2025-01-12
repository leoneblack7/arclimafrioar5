import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Dialog } from "./ui/dialog";
import { ProductForm } from "./admin/ProductForm";
import { ProductImportForm } from "./admin/ProductImportForm";
import { ProductsTable } from "./admin/ProductsTable";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  description: string;
  active: boolean;
}

export const ProductManager = () => {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        toast.error("Erro ao carregar produtos");
        throw error;
      }
      
      return data || [];
    }
  });

  const handleNewProduct = () => {
    const newProduct: Partial<Product> = {
      title: "Novo Produto",
      price: 0,
      image_url: "/placeholder.svg",
      description: "Descrição do novo produto",
      active: true
    };
    setEditingProduct(newProduct as Product);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      if (updatedProduct.id) {
        const { error } = await supabase
          .from('products')
          .update({
            title: updatedProduct.title,
            price: updatedProduct.price,
            image_url: updatedProduct.image_url,
            description: updatedProduct.description,
            active: updatedProduct.active
          })
          .eq('id', updatedProduct.id);

        if (error) throw error;
        toast.success("Produto atualizado com sucesso!");
      } else {
        const { error } = await supabase
          .from('products')
          .insert([{
            title: updatedProduct.title,
            price: updatedProduct.price,
            image_url: updatedProduct.image_url,
            description: updatedProduct.description,
            active: updatedProduct.active
          }]);

        if (error) throw error;
        toast.success("Produto adicionado com sucesso!");
      }
      
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
      const { error } = await supabase
        .from('products')
        .insert([{
          title: scrapedProduct.title,
          price: scrapedProduct.price,
          image_url: scrapedProduct.images[0] || '/placeholder.svg',
          description: scrapedProduct.description,
          active: true
        }]);

      if (error) throw error;
      
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
            const { error } = await supabase
              .from('products')
              .delete()
              .eq('id', productId);

            if (error) throw error;
            
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
            const { error } = await supabase
              .from('products')
              .update({ active: !product.active })
              .eq('id', productId);

            if (error) throw error;
            
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