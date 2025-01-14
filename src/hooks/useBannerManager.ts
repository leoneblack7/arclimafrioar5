import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

interface Banner {
  id: string;
  image_url: string;
  active: boolean;
}

export const useBannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [secondaryBanners, setSecondaryBanners] = useState<Banner[]>([]);

  const loadBanners = async () => {
    try {
      const response = await axios.get('/api/banners/read.php');
      if (response.data) {
        setBanners(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      toast.error('Erro ao carregar os banners');
    }
  };

  const handleUploadSuccess = async (base64String: string) => {
    try {
      const response = await axios.post('/api/banners/save.php', {
        image: base64String
      });

      if (response.data.image_url) {
        const newBanner = {
          id: `banner-${Date.now()}`,
          image_url: response.data.image_url,
          active: true
        };

        setBanners(prev => [...prev, newBanner]);
        toast.success("Banner adicionado e ativado com sucesso!");
      }
    } catch (error) {
      console.error('Erro ao salvar banner:', error);
      toast.error('Erro ao salvar o banner');
    }
  };

  const handleSecondaryUploadSuccess = (base64String: string) => {
    const newBanner = {
      id: `secondary-banner-${Date.now()}`,
      image_url: base64String,
      active: true
    };

    const updatedBanners = [...secondaryBanners, newBanner];
    localStorage.setItem('secondary-banners', JSON.stringify(updatedBanners));
    setSecondaryBanners(updatedBanners);
    window.dispatchEvent(new Event('secondaryBannersUpdated'));
    toast.success("Banner secundário adicionado e ativado com sucesso!");
  };

  const handleDelete = (id: string) => {
    const updatedBanners = banners.filter(banner => banner.id !== id);
    localStorage.setItem('banners', JSON.stringify(updatedBanners));
    setBanners(updatedBanners);
    window.dispatchEvent(new Event('bannersUpdated'));
    toast.success("Banner removido com sucesso!");
  };

  const handleSecondaryDelete = (id: string) => {
    const updatedBanners = secondaryBanners.filter(banner => banner.id !== id);
    localStorage.setItem('secondary-banners', JSON.stringify(updatedBanners));
    setSecondaryBanners(updatedBanners);
    window.dispatchEvent(new Event('secondaryBannersUpdated'));
    toast.success("Banner secundário removido com sucesso!");
  };

  const toggleBannerStatus = (id: string, newStatus: boolean) => {
    const updatedBanners = banners.map(banner =>
      banner.id === id ? { ...banner, active: newStatus } : banner
    );
    localStorage.setItem('banners', JSON.stringify(updatedBanners));
    setBanners(updatedBanners);
    window.dispatchEvent(new Event('bannersUpdated'));
    toast.success(newStatus ? "Banner ativado com sucesso!" : "Banner desativado com sucesso!");
  };

  const toggleSecondaryBannerStatus = (id: string, newStatus: boolean) => {
    const updatedBanners = secondaryBanners.map(banner =>
      banner.id === id ? { ...banner, active: newStatus } : banner
    );
    localStorage.setItem('secondary-banners', JSON.stringify(updatedBanners));
    setSecondaryBanners(updatedBanners);
    window.dispatchEvent(new Event('secondaryBannersUpdated'));
    toast.success(newStatus ? "Banner secundário ativado com sucesso!" : "Banner secundário desativado com sucesso!");
  };

  const updateBannerUrl = (id: string, newUrl: string) => {
    const updatedBanners = banners.map(banner =>
      banner.id === id ? { ...banner, image_url: newUrl } : banner
    );
    localStorage.setItem('banners', JSON.stringify(updatedBanners));
    setBanners(updatedBanners);
    window.dispatchEvent(new Event('bannersUpdated'));
    toast.success("URL do banner atualizada com sucesso!");
  };

  const updateSecondaryBannerUrl = (id: string, newUrl: string) => {
    const updatedBanners = secondaryBanners.map(banner =>
      banner.id === id ? { ...banner, image_url: newUrl } : banner
    );
    localStorage.setItem('secondary-banners', JSON.stringify(updatedBanners));
    setSecondaryBanners(updatedBanners);
    window.dispatchEvent(new Event('secondaryBannersUpdated'));
    toast.success("URL do banner secundário atualizada com sucesso!");
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return {
    banners,
    secondaryBanners,
    handleUploadSuccess,
    handleSecondaryUploadSuccess,
    handleDelete,
    handleSecondaryDelete,
    toggleBannerStatus,
    toggleSecondaryBannerStatus,
    updateBannerUrl,
    updateSecondaryBannerUrl
  };
};

export type { Banner };
