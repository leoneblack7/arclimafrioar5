import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Dialog } from "./ui/dialog";
import { ProductForm } from "./admin/ProductForm";
import { ProductImportForm } from "./admin/ProductImportForm";
import { ProductsTable } from "./admin/ProductsTable";
import { toast } from "sonner";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  active: boolean;
}

export const FeaturedProductManager = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Ar Condicionado Split 12000 BTUs Inverter",
      price: 2499.99,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      description: "Split Inverter com tecnologia de última geração, economia de energia e controle via WiFi.",
      active: true
    },
    {
      id: 2,
      title: "Ar Condicionado Split 9000 BTUs",
      price: 1899.99,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      description: "Ideal para ambientes pequenos, com operação silenciosa e alta eficiência.",
      active: true
    },
    {
      id: 3,
      title: "Ar Condicionado Portátil 12000 BTUs",
      price: 3299.99,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      description: "Solução portátil com mobilidade e praticidade para qualquer ambiente.",
      active: true
    },
    {
      id: 4,
      title: "Split Hi-Wall Premium 18000 BTUs",
      price: 3599.99,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      description: "Sistema avançado de filtragem e máxima eficiência energética.",
      active: true
    },
    {
      id: 5,
      title: "Multi Split Inverter 24000 BTUs",
      price: 4599.99,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      description: "Sistema multi split para até 3 ambientes, com tecnologia inverter.",
      active: true
    },
    {
      id: 6,
      title: "Ar Condicionado Cassete 36000 BTUs",
      price: 5999.99,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      description: "Ideal para ambientes comerciais, com distribuição uniforme do ar.",
      active: true
    }
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    if (updatedProduct.id) {
      setProducts(products.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      ));
      toast.success("Produto em destaque atualizado com sucesso!");
    } else {
      setProducts([...products, { ...updatedProduct, id: products.length + 1 }]);
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
      description: scrapedProduct.description,
      active: true
    };
    setProducts([...products, newProduct]);
    toast.success("Produto em destaque importado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Produtos em Destaque</h2>
        <Button 
          onClick={handleNewProduct} 
          className="flex items-center gap-2"
          disabled={products.length >= 6}
        >
          <Plus className="h-4 w-4" />
          Novo Produto em Destaque
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