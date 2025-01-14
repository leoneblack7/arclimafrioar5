import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Product } from "@/types/product";
import axios from "axios";

export const useProductManager = () => {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/products/read.php');
        return response.data || [];
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    }
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
      const productToSave = {
        ...updatedProduct,
        price: Number(updatedProduct.price),
        id: updatedProduct.id || Date.now(),
        images: updatedProduct.images || [updatedProduct.image],
        image: updatedProduct.images?.[0] || updatedProduct.image
      };

      const response = await axios.post('/api/products/update.php', productToSave);
      
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setEditingProduct(null);
        setIsDialogOpen(false);
        toast.success("Produto salvo com sucesso!");
      } else {
        throw new Error(response.data.message || 'Erro ao salvar produto');
      }
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
      
      const response = await axios.post('/api/products/create.php', newProduct);
      
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Produto importado com sucesso!");
      } else {
        throw new Error(response.data.message || 'Erro ao importar produto');
      }
    } catch (error) {
      console.error('Error importing product:', error);
      toast.error("Erro ao importar produto");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      const response = await axios.post('/api/products/delete.php', { id: productId });
      
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Produto removido com sucesso!");
      } else {
        throw new Error(response.data.message || 'Erro ao remover produto');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Erro ao remover produto");
    }
  };

  const handleToggleActive = async (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    try {
      const updatedProduct = { ...product, active: !product.active };
      const response = await axios.post('/api/products/update.php', updatedProduct);
      
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Status do produto atualizado!");
      } else {
        throw new Error(response.data.message || 'Erro ao atualizar status do produto');
      }
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