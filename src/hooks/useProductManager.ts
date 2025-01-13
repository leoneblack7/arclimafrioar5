import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

export const useProductManager = () => {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const storedProducts = getFromLocalStorage('products', []);
      return storedProducts.map((item: any) => ({
        id: Number(item.id),
        title: item.title,
        price: Number(item.price),
        image: item.image || '/placeholder.svg',
        images: item.images || [item.image || '/placeholder.svg'],
        description: item.description,
        active: item.active || false
      }));
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
      let updatedProducts;
      const productToSave = {
        ...updatedProduct,
        price: Number(updatedProduct.price),
        id: updatedProduct.id || Date.now(),
        images: updatedProduct.images || [updatedProduct.image],
        image: updatedProduct.images?.[0] || updatedProduct.image
      };

      if (products.find(p => p.id === productToSave.id)) {
        updatedProducts = products.map(p => 
          p.id === productToSave.id ? productToSave : p
        );
        toast.success("Produto atualizado com sucesso!");
      } else {
        updatedProducts = [...products, productToSave];
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
      const newProduct: Product = {
        id: Date.now(),
        title: scrapedProduct.title,
        price: Number(scrapedProduct.price),
        image: scrapedProduct.images[0] || '/placeholder.svg',
        images: scrapedProduct.images || [scrapedProduct.images[0] || '/placeholder.svg'],
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

  const handleDeleteProduct = async (productId: number) => {
    try {
      const updatedProducts = products.filter(p => p.id !== productId);
      saveToLocalStorage('products', updatedProducts);
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