import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/product";

interface ProductFormProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSave({
          ...product,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>
          {product.id ? "Editar Produto" : "Novo Produto"}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <Input
            value={product.title}
            onChange={(e) => onSave({ ...product, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Preço</label>
          <Input
            type="number"
            value={product.price}
            onChange={(e) => onSave({ ...product, price: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Descrição</label>
          <Textarea
            value={product.description}
            onChange={(e) => onSave({ ...product, description: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Imagem</label>
          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.title}
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
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(product)}>
            Salvar
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};