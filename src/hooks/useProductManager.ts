import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { productService } from "@/services/productService";

export const useProductManager = () => {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts
  });

  const handleNewProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      title: "Novo Produto",
      price: 0,
      image: "/placeholder.svg",
      images: ["/placeholder.svg"],
      description: "Descrição do novo produto",
      active: true
    };
    setEditingProduct(newProduct);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      await productService.saveProduct(updatedProduct);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
      setIsDialogOpen(false);
      toast.success(updatedProduct.id ? "Produto atualizado com sucesso!" : "Produto adicionado com sucesso!");
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error("Erro ao salvar produto");
    }
  };

  const handleImportProduct = async (scrapedProduct: any) => {
    try {
      const newProduct: Product = {
        id: Date.now(),
        title: scrapedProduct.title,
        price: Number(scrapedProduct.price),
        image: scrapedProduct.images[0] || '/placeholder.svg',
        images: scrapedProduct.images || [scrapedProduct.images[0] || '/placeholder.svg'],
        description: scrapedProduct.description,
        active: true
      };
      
      await productService.saveProduct(newProduct);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto importado com sucesso!");
    } catch (error) {
      console.error('Error importing product:', error);
      toast.error("Erro ao importar produto");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await productService.deleteProduct(productId);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto removido com sucesso!");
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Erro ao remover produto");
    }
  };

  const handleToggleActive = async (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    try {
      await productService.saveProduct({ ...product, active: !product.active });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Status do produto atualizado!");
    } catch (error) {
      console.error('Error updating product status:', error);
      toast.error("Erro ao atualizar status do produto");
    }
  };

  return {
    products,
    isLoading,
    editingProduct,
    isDialogOpen,
    setIsDialogOpen,
    setEditingProduct,
    handleNewProduct,
    handleSaveProduct,
    handleImportProduct,
    handleDeleteProduct,
    handleToggleActive,
  };
};