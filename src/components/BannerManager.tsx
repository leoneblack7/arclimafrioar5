import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BannerUploader } from "./banner/BannerUploader";
import { BannerCard } from "./banner/BannerCard";

interface Banner {
  id: string;
  image_url: string;
  active: boolean;
}

const defaultBanners: Banner[] = [
  {
    id: 'default-banner-1',
    image_url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    active: true
  },
  {
    id: 'default-banner-2',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    active: true
  },
  {
    id: 'default-banner-3',
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    active: true
  },
  {
    id: 'default-banner-4',
    image_url: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff',
    active: true
  },
  {
    id: 'default-banner-5',
    image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
    active: true
  }
];

export const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);

  const loadBanners = () => {
    try {
      console.log("BannerManager - Iniciando carregamento dos banners");
      const storedBanners = localStorage.getItem('banners');
      
      if (!storedBanners) {
        console.log("BannerManager - Nenhum banner encontrado, usando padrões");
        localStorage.setItem('banners', JSON.stringify(defaultBanners));
        setBanners(defaultBanners);
        return;
      }

      const parsedBanners = JSON.parse(storedBanners);
      console.log("BannerManager - Banners carregados:", parsedBanners);
      setBanners(parsedBanners);
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      toast.error('Erro ao carregar os banners');
      setBanners(defaultBanners);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleUploadSuccess = (base64String: string) => {
    const newBanner = {
      id: `banner-${Date.now()}`,
      image_url: base64String,
      active: true
    };

    const updatedBanners = [...banners, newBanner];
    localStorage.setItem('banners', JSON.stringify(updatedBanners));
    setBanners(updatedBanners);
    window.dispatchEvent(new Event('bannersUpdated'));
    
    console.log("BannerManager - Banner adicionado com sucesso");
    toast.success("Banner adicionado e ativado com sucesso!");
  };

  const handleDelete = async (id: string) => {
    try {
      if (id.startsWith('default-banner')) {
        toast.error("Não é possível excluir os banners padrão");
        return;
      }

      console.log("BannerManager - Iniciando exclusão do banner:", id);
      const updatedBanners = banners.filter(banner => banner.id !== id);
      
      localStorage.setItem('banners', JSON.stringify(updatedBanners));
      setBanners(updatedBanners);
      window.dispatchEvent(new Event('bannersUpdated'));
      
      console.log("BannerManager - Banner excluído com sucesso");
      toast.success("Banner removido com sucesso!");
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
      setBanners(updatedBanners);
      window.dispatchEvent(new Event('bannersUpdated'));
      
      console.log("BannerManager - Status atualizado com sucesso");
      toast.success(newStatus ? "Banner ativado com sucesso!" : "Banner desativado com sucesso!");
    } catch (error) {
      console.error('Erro ao atualizar status do banner:', error);
      toast.error("Erro ao atualizar o status do banner");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Gerenciar Banners</h2>
      <BannerUploader onUploadSuccess={handleUploadSuccess} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {banners.map((banner) => (
          <BannerCard
            key={banner.id}
            id={banner.id}
            imageUrl={banner.image_url}
            active={banner.active}
            onToggleStatus={toggleBannerStatus}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};