import { ProductHeader } from "./admin/ProductHeader";
import { ProductDialog } from "./admin/ProductDialog";
import { ProductImportForm } from "./admin/ProductImportForm";
import { ProductsTable } from "./admin/ProductsTable";
import { useProductManager } from "@/hooks/useProductManager";

export const ProductManager = () => {
  const {
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
  } = useProductManager();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <ProductHeader onNewProduct={handleNewProduct} />
      
      <ProductImportForm onImport={handleImportProduct} />

      <ProductDialog
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
          setEditingProduct({
            ...product,
            images: product.images || [product.image]
          });
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteProduct}
        onToggleActive={handleToggleActive}
      />
    </div>
  );
};