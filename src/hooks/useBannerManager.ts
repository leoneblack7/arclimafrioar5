import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Banner } from '@/types/storage';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorage';

export const useBannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [secondaryBanners, setSecondaryBanners] = useState<Banner[]>([]);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = () => {
    const storedBanners = getFromLocalStorage('banners', []);
    const storedSecondaryBanners = getFromLocalStorage('secondary-banners', []);
    setBanners(storedBanners);
    setSecondaryBanners(storedSecondaryBanners);
  };

  const handleUploadSuccess = (base64String: string) => {
    const newBanner: Banner = {
      id: crypto.randomUUID(),
      image_url: base64String,
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const updatedBanners = [...banners, newBanner];
    saveToLocalStorage('banners', updatedBanners);
    setBanners(updatedBanners);
    window.dispatchEvent(new Event('bannersUpdated'));
    toast.success('Banner adicionado com sucesso!');
  };

  const handleSecondaryUploadSuccess = (base64String: string) => {
    const newBanner: Banner = {
      id: crypto.randomUUID(),
      image_url: base64String,
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const updatedBanners = [...secondaryBanners, newBanner];
    saveToLocalStorage('secondary-banners', updatedBanners);
    setSecondaryBanners(updatedBanners);
    window.dispatchEvent(new Event('secondaryBannersUpdated'));
    toast.success('Banner secundário adicionado com sucesso!');
  };

  const handleDelete = (id: string) => {
    const updatedBanners = banners.filter(banner => banner.id !== id);
    saveToLocalStorage('banners', updatedBanners);
    setBanners(updatedBanners);
    window.dispatchEvent(new Event('bannersUpdated'));
    toast.success('Banner removido com sucesso!');
  };

  const handleSecondaryDelete = (id: string) => {
    const updatedBanners = secondaryBanners.filter(banner => banner.id !== id);
    saveToLocalStorage('secondary-banners', updatedBanners);
    setSecondaryBanners(updatedBanners);
    window.dispatchEvent(new Event('secondaryBannersUpdated'));
    toast.success('Banner secundário removido com sucesso!');
  };

  const toggleBannerStatus = (id: string) => {
    const updatedBanners = banners.map(banner =>
      banner.id === id ? { ...banner, active: !banner.active } : banner
    );
    saveToLocalStorage('banners', updatedBanners);
    setBanners(updatedBanners);
    window.dispatchEvent(new Event('bannersUpdated'));
    toast.success('Status do banner atualizado com sucesso!');
  };

  const toggleSecondaryBannerStatus = (id: string) => {
    const updatedBanners = secondaryBanners.map(banner =>
      banner.id === id ? { ...banner, active: !banner.active } : banner
    );
    saveToLocalStorage('secondary-banners', updatedBanners);
    setSecondaryBanners(updatedBanners);
    window.dispatchEvent(new Event('secondaryBannersUpdated'));
    toast.success('Status do banner secundário atualizado com sucesso!');
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