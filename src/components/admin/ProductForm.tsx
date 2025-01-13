import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Upload, Link } from "lucide-react";
import { toast } from "sonner";

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
  const [images, setImages] = useState<string[]>(formData.images);
  const [newImageUrl, setNewImageUrl] = useState("");

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
          image: newImages[0],
          images: newImages
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl) {
      toast.error("Por favor, insira uma URL válida");
      return;
    }
    const newImages = [...images, newImageUrl];
    setImages(newImages);
    setFormData({
      ...formData,
      image: newImages[0],
      images: newImages
    });
    setNewImageUrl("");
    toast.success("Imagem adicionada com sucesso!");
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setFormData({
      ...formData,
      image: newImages[0] || "",
      images: newImages
    });
    toast.success("Imagem removida com sucesso!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      images: images.filter(Boolean)
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

          <div className="flex items-center space-x-2">
            <Switch
              id="description-active"
              checked={formData.isDescriptionActive}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, isDescriptionActive: checked })
              }
            />
            <Label htmlFor="description-active">Ativar Descrição</Label>
          </div>

          {formData.isDescriptionActive && (
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
          )}

          <div className="space-y-4">
            <label className="text-sm font-medium">Imagens do Produto</label>
            
            <div className="flex gap-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Cole a URL da imagem aqui"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddImageUrl}
                className="flex items-center gap-2"
              >
                <Link className="h-4 w-4" />
                Adicionar URL
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <label className="cursor-pointer">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)}
                        className="hidden"
                      />
                      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                        <Upload className="h-4 w-4" />
                      </div>
                    </label>
                  </div>
                </div>
              ))}
              {images.length < 5 && (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, images.length)}
                    className="hidden"
                  />
                  <PlusCircle className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500">Adicionar Imagem</span>
                </label>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Especificações Técnicas</label>
            <Textarea
              value={formData.specifications}
              onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              className="min-h-[200px] font-mono text-sm"
              placeholder="Cole aqui as especificações técnicas do produto..."
            />
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