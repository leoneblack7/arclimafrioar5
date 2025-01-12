import { useState, useEffect } from "react";
import { toast } from "sonner";

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

export const useBannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

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
      if (parsedBanners.length === 0) {
        console.log("BannerManager - Array vazio, usando banners padrão");
        localStorage.setItem('banners', JSON.stringify(defaultBanners));
        setBanners(defaultBanners);
        return;
      }

      // Garante que os banners padrão sempre estejam presentes
      const existingDefaultBannerIds = parsedBanners
        .filter((banner: Banner) => banner.id.startsWith('default-banner-'))
        .map((banner: Banner) => banner.id);

      const missingDefaultBanners = defaultBanners.filter(
        defaultBanner => !existingDefaultBannerIds.includes(defaultBanner.id)
      );

      const updatedBanners = [...parsedBanners, ...missingDefaultBanners];
      
      console.log("BannerManager - Banners carregados:", updatedBanners);
      localStorage.setItem('banners', JSON.stringify(updatedBanners));
      setBanners(updatedBanners);
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      toast.error('Erro ao carregar os banners');
      setBanners(defaultBanners);
    }
  };

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

  const updateBannerUrl = (id: string, newUrl: string) => {
    try {
      console.log("BannerManager - Atualizando URL do banner:", { id, newUrl });
      const updatedBanners = banners.map(banner =>
        banner.id === id ? { ...banner, image_url: newUrl } : banner
      );
      
      localStorage.setItem('banners', JSON.stringify(updatedBanners));
      setBanners(updatedBanners);
      window.dispatchEvent(new Event('bannersUpdated'));
      
      console.log("BannerManager - URL atualizada com sucesso");
      toast.success("URL do banner atualizada com sucesso!");
    } catch (error) {
      console.error('Erro ao atualizar URL do banner:', error);
      toast.error("Erro ao atualizar a URL do banner");
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return {
    banners,
    handleUploadSuccess,
    handleDelete,
    toggleBannerStatus,
    updateBannerUrl
  };
};

export type { Banner };