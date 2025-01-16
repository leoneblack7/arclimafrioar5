import { useState, useEffect } from "react";
import { toast } from "sonner";
import { saveBanner, getBanners, deleteBanner } from "@/utils/databaseService";
import { Banner } from "@/types/storage";

export const useBannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [secondaryBanners, setSecondaryBanners] = useState<Banner[]>([]);

  const loadBanners = async () => {
    try {
      const storedBanners = await getBanners();
      if (storedBanners && storedBanners.length > 0) {
        const mainBanners = storedBanners.filter(b => !b.id.startsWith('secondary-'));
        const secBanners = storedBanners.filter(b => b.id.startsWith('secondary-'));
        setBanners(mainBanners);
        setSecondaryBanners(secBanners);
      } else {
        setBanners([]);
        setSecondaryBanners([]);
      }
    } catch (error) {
      console.error('Error loading banners:', error);
      toast.error('Erro ao carregar os banners');
      setBanners([]);
      setSecondaryBanners([]);
    }
  };

  const handleUploadSuccess = (base64String: string) => {
    const newBanner = {
      id: `banner-${Date.now()}`,
      image_url: base64String,
      active: true
    };

    saveBanner(newBanner);
    setBanners([...banners, newBanner]);
    toast.success("Banner adicionado e ativado com sucesso!");
  };

  const handleSecondaryUploadSuccess = (base64String: string) => {
    const newBanner = {
      id: `secondary-banner-${Date.now()}`,
      image_url: base64String,
      active: true
    };

    saveBanner(newBanner);
    setSecondaryBanners([...secondaryBanners, newBanner]);
    toast.success("Banner secundário adicionado e ativado com sucesso!");
  };

  const handleDelete = (id: string) => {
    deleteBanner(id);
    setBanners(banners.filter(banner => banner.id !== id));
    toast.success("Banner removido com sucesso!");
  };

  const handleSecondaryDelete = (id: string) => {
    deleteBanner(id);
    setSecondaryBanners(secondaryBanners.filter(banner => banner.id !== id));
    toast.success("Banner secundário removido com sucesso!");
  };

  const toggleBannerStatus = (id: string, newStatus: boolean) => {
    const updatedBanners = banners.map(banner =>
      banner.id === id ? { ...banner, active: newStatus } : banner
    );
    setBanners(updatedBanners);
    saveBanner(updatedBanners.find(b => b.id === id));
    toast.success(newStatus ? "Banner ativado com sucesso!" : "Banner desativado com sucesso!");
  };

  const toggleSecondaryBannerStatus = (id: string, newStatus: boolean) => {
    const updatedBanners = secondaryBanners.map(banner =>
      banner.id === id ? { ...banner, active: newStatus } : banner
    );
    setSecondaryBanners(updatedBanners);
    saveBanner(updatedBanners.find(b => b.id === id));
    toast.success(newStatus ? "Banner secundário ativado com sucesso!" : "Banner secundário desativado com sucesso!");
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
    toggleSecondaryBannerStatus
  };
};