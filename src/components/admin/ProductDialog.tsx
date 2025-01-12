import { Dialog } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { Product } from "@/types/product";

interface ProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const ProductDialog = ({
  isOpen,
  onOpenChange,
  editingProduct,
  onSave,
  onCancel,
}: ProductDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
    </Dialog>
  );
};