import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Upload, Link } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface ImageUploaderProps {
  images: string[];
  isActive: boolean;
  onImagesChange: (images: string[]) => void;
  onActiveChange: (active: boolean) => void;
}

export const ImageUploader = ({ images, isActive, onImagesChange, onActiveChange }: ImageUploaderProps) => {
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        onImagesChange(newImages);
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
    onImagesChange(newImages);
    setNewImageUrl("");
    toast.success("Imagem adicionada com sucesso!");
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    toast.success("Imagem removida com sucesso!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Imagens do Produto</label>
        <div className="flex items-center space-x-2">
          <Switch
            id="images-active"
            checked={isActive}
            onCheckedChange={onActiveChange}
          />
          <Label htmlFor="images-active">Ativar Imagens</Label>
        </div>
      </div>

      {isActive && (
        <>
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
        </>
      )}
    </div>
  );
};