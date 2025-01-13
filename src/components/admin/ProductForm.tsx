import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUploader } from "./product-form/ImageUploader";
import { DescriptionEditor } from "./product-form/DescriptionEditor";
import { SpecificationsEditor } from "./product-form/SpecificationsEditor";

interface ProductFormProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    ...product,
    images: product.images || [product.image],
    isDescriptionActive: product.isDescriptionActive ?? true,
    specifications: product.specifications || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      images: formData.images.filter(Boolean)
    });
  };

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
      <DialogHeader>
        <DialogTitle>
          {product.id ? "Editar Produto" : "Novo Produto"}
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[calc(80vh-100px)] pr-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Título</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Preço</label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
          </div>

          <DescriptionEditor
            description={formData.description}
            isActive={formData.isDescriptionActive}
            onDescriptionChange={(description) => setFormData({ ...formData, description })}
            onActiveChange={(isDescriptionActive) => setFormData({ ...formData, isDescriptionActive })}
          />

          <ImageUploader
            images={formData.images}
            onImagesChange={(images) => setFormData({
              ...formData,
              image: images[0],
              images
            })}
          />

          <SpecificationsEditor
            specifications={formData.specifications}
            onSpecificationsChange={(specifications) => 
              setFormData({ ...formData, specifications })
            }
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </ScrollArea>
    </DialogContent>
  );
};