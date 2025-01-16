import { useState, useEffect } from "react";
import { toast } from "sonner";
import { saveBanner, getBanners, deleteBanner } from "@/utils/databaseService";
import { Banner } from "@/types/storage";

export const useBannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [secondaryBanners, setSecondaryBanners] = useState<Banner[]>([]);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const fetchedBanners = await getBanners();
      if (Array.isArray(fetchedBanners)) {
        const mainBanners = fetchedBanners.filter(banner => !banner.file_path?.includes('secondary'));
        const secondary = fetchedBanners.filter(banner => banner.file_path?.includes('secondary'));
        setBanners(mainBanners);
        setSecondaryBanners(secondary);
      }
    } catch (error) {
      console.error('Error loading banners:', error);
      toast.error("Erro ao carregar banners");
    }
  };

  const handleUploadSuccess = async (imageUrl: string) => {
    try {
      const newBanner: Banner = {
        id: crypto.randomUUID(),
        image_url: imageUrl,
        active: true
      };
      await saveBanner(newBanner);
      loadBanners();
      toast.success("Banner adicionado com sucesso!");
    } catch (error) {
      console.error('Error saving banner:', error);
      toast.error("Erro ao salvar banner");
    }
  };

  const handleSecondaryUploadSuccess = async (imageUrl: string) => {
    try {
      const newBanner: Banner = {
        id: crypto.randomUUID(),
        image_url: imageUrl,
        active: true,
        file_path: 'secondary'
      };
      await saveBanner(newBanner);
      loadBanners();
      toast.success("Banner secundário adicionado com sucesso!");
    } catch (error) {
      console.error('Error saving secondary banner:', error);
      toast.error("Erro ao salvar banner secundário");
    }
  };

  const handleDelete = async (bannerId: string) => {
    try {
      await deleteBanner(bannerId);
      loadBanners();
      toast.success("Banner removido com sucesso!");
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error("Erro ao remover banner");
    }
  };

  const handleSecondaryDelete = async (bannerId: string) => {
    try {
      await deleteBanner(bannerId);
      loadBanners();
      toast.success("Banner secundário removido com sucesso!");
    } catch (error) {
      console.error('Error deleting secondary banner:', error);
      toast.error("Erro ao remover banner secundário");
    }
  };

  const toggleBannerStatus = async (bannerId: string) => {
    const banner = banners.find(b => b.id === bannerId);
    if (banner) {
      try {
        const updatedBanner = { ...banner, active: !banner.active };
        await saveBanner(updatedBanner);
        loadBanners();
        toast.success("Status do banner atualizado!");
      } catch (error) {
        console.error('Error updating banner status:', error);
        toast.error("Erro ao atualizar status do banner");
      }
    }
  };

  const toggleSecondaryBannerStatus = async (bannerId: string) => {
    const banner = secondaryBanners.find(b => b.id === bannerId);
    if (banner) {
      try {
        const updatedBanner = { ...banner, active: !banner.active };
        await saveBanner(updatedBanner);
        loadBanners();
        toast.success("Status do banner secundário atualizado!");
      } catch (error) {
        console.error('Error updating secondary banner status:', error);
        toast.error("Erro ao atualizar status do banner secundário");
      }
    }
  };

  return {
    banners,
    secondaryBanners,
    handleUploadSuccess,
    handleSecondaryUploadSuccess,
    handleDelete,
    handleSecondaryDelete,
    toggleBannerStatus,
    toggleSecondaryBannerStatus
  };
};