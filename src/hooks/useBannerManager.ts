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
      console.log("Carregando banners do servidor...");
      const response = await axios.get('/api/banners/read.php');
      if (response.data) {
        console.log("Banners carregados:", response.data);
        setBanners(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      toast.error('Erro ao carregar os banners');
    }
  };

  const handleUploadSuccess = async (base64String: string) => {
    try {
      console.log("Iniciando upload do banner...");
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

  const handleSecondaryUploadSuccess = async (base64String: string) => {
    try {
      console.log("Iniciando upload do banner secundário...");
      const response = await axios.post('/api/banners/save.php', {
        image: base64String,
        type: 'secondary'
      });

      if (response.data.image_url) {
        const newBanner = {
          id: `secondary-banner-${Date.now()}`,
          image_url: response.data.image_url,
          active: true
        };

        setSecondaryBanners(prev => [...prev, newBanner]);
        toast.success("Banner secundário adicionado e ativado com sucesso!");
      }
    } catch (error) {
      console.error('Erro ao salvar banner secundário:', error);
      toast.error('Erro ao salvar o banner secundário');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log("Deletando banner:", id);
      await axios.post('/api/banners/delete.php', { id });
      const updatedBanners = banners.filter(banner => banner.id !== id);
      setBanners(updatedBanners);
      toast.success("Banner removido com sucesso!");
    } catch (error) {
      console.error('Erro ao deletar banner:', error);
      toast.error('Erro ao deletar o banner');
    }
  };

  const handleSecondaryDelete = async (id: string) => {
    try {
      console.log("Deletando banner secundário:", id);
      await axios.post('/api/banners/delete.php', { id, type: 'secondary' });
      const updatedBanners = secondaryBanners.filter(banner => banner.id !== id);
      setSecondaryBanners(updatedBanners);
      toast.success("Banner secundário removido com sucesso!");
    } catch (error) {
      console.error('Erro ao deletar banner secundário:', error);
      toast.error('Erro ao deletar o banner secundário');
    }
  };

  const toggleBannerStatus = async (id: string, newStatus: boolean) => {
    try {
      console.log("Alterando status do banner:", id, newStatus);
      await axios.post('/api/banners/update.php', { id, active: newStatus });
      const updatedBanners = banners.map(banner =>
        banner.id === id ? { ...banner, active: newStatus } : banner
      );
      setBanners(updatedBanners);
      toast.success(newStatus ? "Banner ativado com sucesso!" : "Banner desativado com sucesso!");
    } catch (error) {
      console.error('Erro ao atualizar status do banner:', error);
      toast.error('Erro ao atualizar status do banner');
    }
  };

  const toggleSecondaryBannerStatus = async (id: string, newStatus: boolean) => {
    try {
      console.log("Alterando status do banner secundário:", id, newStatus);
      await axios.post('/api/banners/update.php', { id, active: newStatus, type: 'secondary' });
      const updatedBanners = secondaryBanners.map(banner =>
        banner.id === id ? { ...banner, active: newStatus } : banner
      );
      setSecondaryBanners(updatedBanners);
      toast.success(newStatus ? "Banner secundário ativado com sucesso!" : "Banner secundário desativado com sucesso!");
    } catch (error) {
      console.error('Erro ao atualizar status do banner secundário:', error);
      toast.error('Erro ao atualizar status do banner secundário');
    }
  };

  const updateBannerUrl = async (id: string, newUrl: string) => {
    try {
      console.log("Atualizando URL do banner:", id, newUrl);
      await axios.post('/api/banners/update.php', { id, image_url: newUrl });
      const updatedBanners = banners.map(banner =>
        banner.id === id ? { ...banner, image_url: newUrl } : banner
      );
      setBanners(updatedBanners);
      toast.success("URL do banner atualizada com sucesso!");
    } catch (error) {
      console.error('Erro ao atualizar URL do banner:', error);
      toast.error('Erro ao atualizar URL do banner');
    }
  };

  const updateSecondaryBannerUrl = async (id: string, newUrl: string) => {
    try {
      console.log("Atualizando URL do banner secundário:", id, newUrl);
      await axios.post('/api/banners/update.php', { id, image_url: newUrl, type: 'secondary' });
      const updatedBanners = secondaryBanners.map(banner =>
        banner.id === id ? { ...banner, image_url: newUrl } : banner
      );
      setSecondaryBanners(updatedBanners);
      toast.success("URL do banner secundário atualizada com sucesso!");
    } catch (error) {
      console.error('Erro ao atualizar URL do banner secundário:', error);
      toast.error('Erro ao atualizar URL do banner secundário');
    }
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