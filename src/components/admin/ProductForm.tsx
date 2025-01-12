import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductFormProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    ...product,
    images: product.images || [product.image]
  });
  const [images, setImages] = useState<string[]>(formData.images);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
        setFormData({
          ...formData,
          image: newImages[0], // Mantém a primeira imagem como principal
          images: newImages // Salva todas as imagens
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      images: images.filter(Boolean) // Remove imagens vazias
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Imagens do Produto (até 5)</label>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  {images[index] && (
                    <img
                      src={images[index]}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="text-sm text-gray-500">
              A descrição suporta formatação HTML para melhor apresentação do produto.
            </div>
          </div>
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