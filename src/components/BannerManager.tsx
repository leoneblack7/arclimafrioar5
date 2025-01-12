import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface Banner {
  id: string;
  image_url: string;
  active: boolean;
}

export const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadBanners = () => {
    try {
      console.log("BannerManager - Iniciando carregamento dos banners");
      const storedBanners = localStorage.getItem('banners');
      const parsedBanners = storedBanners ? JSON.parse(storedBanners) : [];
      console.log("BannerManager - Banners carregados:", parsedBanners);
      setBanners(parsedBanners);
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      toast.error('Erro ao carregar os banners');
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("BannerManager - Iniciando processo de upload", {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });

      if (!file.type.startsWith('image/')) {
        console.error("BannerManager - Tipo de arquivo inválido:", file.type);
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }

      try {
        // Convert file to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const newBanner = {
            id: `banner-${Date.now()}`,
            image_url: base64String,
            active: true
          };

          const updatedBanners = [...banners, newBanner];
          localStorage.setItem('banners', JSON.stringify(updatedBanners));
          window.dispatchEvent(new Event('bannersUpdated'));
          
          console.log("BannerManager - Banner adicionado com sucesso");
          toast.success("Banner adicionado e ativado com sucesso!");
          loadBanners();
        };

        reader.readAsDataURL(file);
      } catch (error: any) {
        console.error('BannerManager - Erro ao adicionar banner:', error);
        toast.error(`Erro ao adicionar banner: ${error.message || 'Erro desconhecido'}`);
      }
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = async (id: string) => {
    try {
      console.log("BannerManager - Iniciando exclusão do banner:", id);
      const updatedBanners = banners.filter(banner => banner.id !== id);
      localStorage.setItem('banners', JSON.stringify(updatedBanners));
      window.dispatchEvent(new Event('bannersUpdated'));
      
      console.log("BannerManager - Banner excluído com sucesso");
      toast.success("Banner removido com sucesso!");
      loadBanners();
    } catch (error) {
      console.error('Erro ao remover banner:', error);
      toast.error("Erro ao remover o banner");
    }
  };

  const toggleBannerStatus = async (id: string, newStatus: boolean) => {
    try {
      console.log("BannerManager - Alterando status do banner:", { id, newStatus });
      const updatedBanners = banners.map(banner =>
        banner.id === id ? { ...banner, active: newStatus } : banner
      );
      localStorage.setItem('banners', JSON.stringify(updatedBanners));
      window.dispatchEvent(new Event('bannersUpdated'));
      
      console.log("BannerManager - Status atualizado com sucesso");
      toast.success(newStatus ? "Banner ativado com sucesso!" : "Banner desativado com sucesso!");
      loadBanners();
    } catch (error) {
      console.error('Erro ao atualizar status do banner:', error);
      toast.error("Erro ao atualizar o status do banner");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Gerenciar Banners</h2>
      
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {banners.map((banner) => (
          <div key={banner.id} className="border rounded-lg p-4 space-y-2">
            <img 
              src={banner.image_url} 
              alt="Banner preview" 
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="flex justify-between items-center gap-2">
              <Button
                variant={banner.active ? "secondary" : "default"}
                className="flex-1"
                onClick={() => toggleBannerStatus(banner.id, !banner.active)}
              >
                {banner.active ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Desativar
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Ativar
                  </>
                )}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(banner.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};