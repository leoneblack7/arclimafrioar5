import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/storage";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageUploader } from "./product-form/ImageUploader";
import { DescriptionEditor } from "./product-form/DescriptionEditor";
import { SpecificationsEditor } from "./product-form/SpecificationsEditor";
import { RelatedProductsEditor } from "./product-form/RelatedProductsEditor";

interface ProductFormProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    ...product,
    images: product.images || [product.image_url],
    additional_images: product.additional_images || [],
    is_description_active: product.is_description_active ?? true,
    is_images_active: product.is_images_active ?? true,
    is_specifications_active: product.is_specifications_active ?? true,
    is_additional_images_active: product.is_additional_images_active ?? true,
    is_related_products_active: product.is_related_products_active ?? true,
    related_product_ids: product.related_product_ids || [],
    specifications: product.specifications || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      image_url: formData.images[0] || '/placeholder.svg',
      images: formData.images.filter(Boolean),
      additional_images: formData.additional_images.filter(Boolean)
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
            isActive={formData.is_description_active}
            onDescriptionChange={(description) => setFormData({ ...formData, description })}
            onActiveChange={(is_description_active) => setFormData({ ...formData, is_description_active })}
          />

          <ImageUploader
            images={formData.images}
            isActive={formData.is_images_active}
            onImagesChange={(images) => setFormData({
              ...formData,
              images,
              image_url: images[0] || '/placeholder.svg'
            })}
            onActiveChange={(is_images_active) => setFormData({ ...formData, is_images_active })}
          />

          <SpecificationsEditor
            specifications={formData.specifications}
            isActive={formData.is_specifications_active}
            onSpecificationsChange={(specifications) => 
              setFormData({ ...formData, specifications })
            }
            onActiveChange={(is_specifications_active) => 
              setFormData({ ...formData, is_specifications_active })
            }
          />

          <RelatedProductsEditor
            relatedProductIds={formData.related_product_ids}
            isActive={formData.is_related_products_active}
            onRelatedProductsChange={(related_product_ids) => 
              setFormData({ ...formData, related_product_ids })
            }
            onActiveChange={(is_related_products_active) => 
              setFormData({ ...formData, is_related_products_active })
            }
          />

          <ImageUploader
            title="Imagens Adicionais"
            images={formData.additional_images || []}
            isActive={formData.is_additional_images_active}
            onImagesChange={(additional_images) => setFormData({
              ...formData,
              additional_images
            })}
            onActiveChange={(is_additional_images_active) => 
              setFormData({ ...formData, is_additional_images_active })
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