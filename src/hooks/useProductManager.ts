import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { saveProduct, getProducts, deleteProduct } from "@/utils/databaseService";

export const useProductManager = () => {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return getProducts();
    }
  });

  const handleNewProduct = () => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      title: "Novo Produto",
      price: 0,
      image_url: "/placeholder.svg",
      images: ["/placeholder.svg"],
      description: "Descrição do novo produto",
      active: true,
      relatedProductIds: []
    };
    setEditingProduct(newProduct);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      const productToSave = {
        ...updatedProduct,
        price: Number(updatedProduct.price),
        id: updatedProduct.id || crypto.randomUUID(),
        images: updatedProduct.images || [updatedProduct.image_url],
        image_url: updatedProduct.images?.[0] || updatedProduct.image_url
      };

      saveProduct(productToSave);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
      setIsDialogOpen(false);
      toast.success("Produto salvo com sucesso!");
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error("Erro ao salvar produto");
    }
  };

  const handleImportProduct = async (scrapedProduct: any) => {
    try {
      const newProduct: Product = {
        id: crypto.randomUUID(),
        title: scrapedProduct.title,
        price: Number(scrapedProduct.price),
        image_url: scrapedProduct.images[0] || '/placeholder.svg',
        images: scrapedProduct.images || [scrapedProduct.images[0] || '/placeholder.svg'],
        description: scrapedProduct.description,
        active: true,
        relatedProductIds: []
      };
      
      saveProduct(newProduct);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto importado com sucesso!");
    } catch (error) {
      console.error('Error importing product:', error);
      toast.error("Erro ao importar produto");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      deleteProduct(productId);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto removido com sucesso!");
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Erro ao remover produto");
    }
  };

  const handleToggleActive = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    try {
      const updatedProduct = { ...product, active: !product.active };
      saveProduct(updatedProduct);
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