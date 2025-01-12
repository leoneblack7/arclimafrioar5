import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { useState } from "react";

interface ProductFormProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState(product);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <DialogContent className="sm:max-w-[800px]">
      <DialogHeader>
        <DialogTitle>
          {product.id ? "Editar Produto" : "Novo Produto"}
        </DialogTitle>
      </DialogHeader>
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
          <label className="text-sm font-medium">Descrição</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-[300px] font-mono text-sm"
          />
          <div className="text-sm text-gray-500">
            A descrição suporta formatação HTML para melhor apresentação do produto.
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Imagem</label>
          <div className="flex items-center gap-4">
            <img
              src={formData.image}
              alt={formData.title}
              className="w-24 h-24 object-cover rounded"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
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
    </DialogContent>
  );
};