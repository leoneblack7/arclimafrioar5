import { useState, useEffect } from 'react';
import { getFromStorage } from '@/utils/storage';
import { Banner } from '@/types/storage';

export const useBannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    const loadedBanners = await getFromStorage<Banner[]>('banners', []);
    setBanners(loadedBanners);
    setIsLoading(false);
  };

  const handleToggleActive = async (bannerId: string) => {
    const updatedBanners = banners.map(banner => {
      if (banner.id === bannerId) {
        return { ...banner, active: !banner.active };
      }
      return banner;
    });

    await saveToStorage('banners', updatedBanners);
    setBanners(updatedBanners);
  };

  const handleDeleteBanner = async (bannerId: string) => {
    const updatedBanners = banners.filter(banner => banner.id !== bannerId);
    await saveToStorage('banners', updatedBanners);
    setBanners(updatedBanners);
  };

  const handleAddBanner = async (newBanner: Banner) => {
    const updatedBanners = [...banners, newBanner];
    await saveToStorage('banners', updatedBanners);
    setBanners(updatedBanners);
  };

  return {
    banners,
    isLoading,
    handleToggleActive,
    handleDeleteBanner,
    handleAddBanner,
  };
};
