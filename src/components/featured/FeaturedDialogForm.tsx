import { Dialog } from "../ui/dialog";
import { ProductForm } from "../admin/ProductForm";
import { Product } from "@/types/product";

interface FeaturedDialogFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const FeaturedDialogForm = ({
  isOpen,
  onOpenChange,
  editingProduct,
  onSave,
  onCancel
}: FeaturedDialogFormProps) => {
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