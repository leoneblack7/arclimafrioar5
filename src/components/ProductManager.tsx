import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Dialog } from "./ui/dialog";
import { ProductForm } from "./admin/ProductForm";
import { ProductImportForm } from "./admin/ProductImportForm";
import { ProductsTable } from "./admin/ProductsTable";

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

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleSaveProduct = (updatedProduct: Product) => {
    if (updatedProduct.id) {
      setProducts(products.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      ));
    } else {
      setProducts([...products, { ...updatedProduct, id: products.length + 1 }]);
    }
    setEditingProduct(null);
  };

  const handleImportProduct = (scrapedProduct: any) => {
    const newProduct = {
      id: products.length + 1,
      title: scrapedProduct.title,
      price: scrapedProduct.price,
      image: scrapedProduct.images[0] || '',
      description: scrapedProduct.description,
      active: true
    };
    setProducts([...products, newProduct]);
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
        }}
        onToggleActive={(productId) => {
          setProducts(products.map(product => 
            product.id === productId 
              ? { ...product, active: !product.active }
              : product
          ));
        }}
      />
    </div>
  );
};
