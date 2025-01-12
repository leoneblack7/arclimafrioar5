import { useRef } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "sonner";

interface BannerUploaderProps {
  onUploadSuccess: (base64String: string) => void;
}

export const BannerUploader = ({ onUploadSuccess }: BannerUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("BannerUploader - Iniciando processo de upload", {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });

      if (!file.type.startsWith('image/')) {
        console.error("BannerUploader - Tipo de arquivo inválido:", file.type);
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          onUploadSuccess(base64String);
        };

        reader.readAsDataURL(file);
      } catch (error: any) {
        console.error('BannerUploader - Erro ao adicionar banner:', error);
        toast.error(`Erro ao adicionar banner: ${error.message || 'Erro desconhecido'}`);
      }
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <Label>Upload do Banner</Label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <Button onClick={handleClickUpload} className="w-full">
          Escolher arquivo
        </Button>
      </div>
    </div>
  );
};