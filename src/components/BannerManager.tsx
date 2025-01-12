import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface Banner {
  id: number;
  imageUrl: string;
  active: boolean;
}

export const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadBanners = () => {
    const savedBanners = localStorage.getItem("siteBanners");
    if (savedBanners) {
      const parsedBanners = JSON.parse(savedBanners);
      setBanners(parsedBanners);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const newBanner: Banner = {
          id: Date.now(),
          imageUrl: result,
          active: true // Ativando banner por padrão
        };
        const updatedBanners = [...banners, newBanner];
        setBanners(updatedBanners);
        localStorage.setItem("siteBanners", JSON.stringify(updatedBanners));
        window.dispatchEvent(new Event('storage'));
        toast.success("Banner adicionado e ativado com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = (id: number) => {
    const updatedBanners = banners.filter(banner => banner.id !== id);
    setBanners(updatedBanners);
    localStorage.setItem("siteBanners", JSON.stringify(updatedBanners));
    window.dispatchEvent(new Event('storage'));
    toast.success("Banner removido com sucesso!");
  };

  const toggleBannerStatus = (id: number, newStatus: boolean) => {
    const updatedBanners = banners.map(banner => 
      banner.id === id ? { ...banner, active: newStatus } : banner
    );
    setBanners(updatedBanners);
    localStorage.setItem("siteBanners", JSON.stringify(updatedBanners));
    window.dispatchEvent(new Event('storage'));
    toast.success(newStatus ? "Banner ativado com sucesso!" : "Banner desativado com sucesso!");
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
              src={banner.imageUrl} 
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