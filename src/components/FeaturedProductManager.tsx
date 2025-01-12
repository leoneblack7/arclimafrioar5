import { useState, useEffect } from "react";
import { toast } from "sonner";
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";
import { Product } from "@/types/product";
import { ProductImportForm } from "./admin/ProductImportForm";
import { ProductsTable } from "./admin/ProductsTable";
import { FeaturedHeader } from "./featured/FeaturedHeader";
import { FeaturedDialogForm } from "./featured/FeaturedDialogForm";

export const FeaturedProductManager = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    return getFromLocalStorage('featured-products', [
      {
        id: 1,
        title: "Ar Condicionado Split 12000 BTUs Inverter",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        images: ["https://images.unsplash.com/photo-1649972904349-6e44c42644a7"],
        description: "Split Inverter com tecnologia de última geração, economia de energia e controle via WiFi.",
        active: true
      },
      {
        id: 2,
        title: "Ar Condicionado Split 9000 BTUs",
        price: 1899.99,
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"],
        description: "Ideal para ambientes pequenos, com operação silenciosa e alta eficiência.",
        active: true
      },
      {
        id: 3,
        title: "Ar Condicionado Portátil 12000 BTUs",
        price: 3299.99,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        images: ["https://images.unsplash.com/photo-1518770660439-4636190af475"],
        description: "Solução portátil com mobilidade e praticidade para qualquer ambiente.",
        active: true
      },
      {
        id: 4,
        title: "Split Hi-Wall Premium 18000 BTUs",
        price: 3599.99,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        images: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6"],
        description: "Sistema avançado de filtragem e máxima eficiência energética.",
        active: true
      },
      {
        id: 5,
        title: "Multi Split Inverter 24000 BTUs",
        price: 4599.99,
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"],
        description: "Sistema multi split para até 3 ambientes, com tecnologia inverter.",
        active: true
      },
      {
        id: 6,
        title: "Ar Condicionado Cassete 36000 BTUs",
        price: 5999.99,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"],
        description: "Ideal para ambientes comerciais, com distribuição uniforme do ar.",
        active: true
      }
    ]);
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    saveToLocalStorage('featured-products', products);
  }, [products]);

  const handleNewProduct = () => {
    if (products.length >= 6) {
      toast.error("Limite máximo de 6 produtos em destaque atingido!");
      return;
    }

    const newProduct: Product = {
      id: products.length + 1,
      title: "Novo Produto em Destaque",
      price: 0,
      image: "/placeholder.svg",
      images: ["/placeholder.svg"],
      description: "Descrição do novo produto em destaque",
      active: true
    };
    setEditingProduct(newProduct);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    if (products.length >= 6 && !products.find(p => p.id === updatedProduct.id)) {
      toast.error("Limite máximo de 6 produtos em destaque atingido!");
      return;
    }

    const productToSave = {
      ...updatedProduct,
      images: updatedProduct.images || [updatedProduct.image],
      image: updatedProduct.images?.[0] || updatedProduct.image
    };

    if (updatedProduct.id) {
      setProducts(products.map(p => 
        p.id === updatedProduct.id ? productToSave : p
      ));
      toast.success("Produto em destaque atualizado com sucesso!");
    } else {
      setProducts([...products, { ...productToSave, id: products.length + 1 }]);
      toast.success("Novo produto em destaque adicionado!");
    }
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleImportProduct = (scrapedProduct: any) => {
    if (products.length >= 6) {
      toast.error("Limite máximo de 6 produtos em destaque atingido!");
      return;
    }

    const newProduct = {
      id: products.length + 1,
      title: scrapedProduct.title,
      price: scrapedProduct.price,
      image: scrapedProduct.images[0] || '/placeholder.svg',
      images: scrapedProduct.images || [scrapedProduct.images[0] || '/placeholder.svg'],
      description: scrapedProduct.description,
      active: true
    };
    setProducts([...products, newProduct]);
    toast.success("Produto em destaque importado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <FeaturedHeader 
        onNewProduct={handleNewProduct}
        productsCount={products.length}
      />
      
      <ProductImportForm onImport={handleImportProduct} />

      <FeaturedDialogForm
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingProduct={editingProduct}
        onSave={handleSaveProduct}
        onCancel={() => {
          setIsDialogOpen(false);
          setEditingProduct(null);
        }}
      />

      <ProductsTable
        products={products}
        onEdit={(product) => {
          setEditingProduct(product);
          setIsDialogOpen(true);
        }}
        onDelete={(productId) => {
          setProducts(products.filter(p => p.id !== productId));
          toast.success("Produto em destaque removido com sucesso!");
        }}
        onToggleActive={(productId) => {
          setProducts(products.map(product => 
            product.id === productId 
              ? { ...product, active: !product.active }
              : product
          ));
          toast.success("Status do produto em destaque atualizado!");
        }}
      />
    </div>
  );
};