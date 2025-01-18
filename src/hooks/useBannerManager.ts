import { useState, useEffect } from 'react';
import { getFromStorage } from '@/utils/storage';
import { Banner } from '@/types/storage';
import { mysqlService } from '@/utils/mysqlService';

export const useBannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [secondaryBanners, setSecondaryBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    const allBanners = await getFromStorage<Banner[]>('banners', []);
    setBanners(allBanners.filter(b => !b.type || b.type === 'primary'));
    setSecondaryBanners(allBanners.filter(b => b.type === 'secondary'));
    setIsLoading(false);
  };

  const handleToggleActive = async (bannerId: string) => {
    const updatedBanners = banners.map(banner => {
      if (banner.id === bannerId) {
        return { ...banner, active: !banner.active };
      }
      return banner;
    });
    await mysqlService.saveBanners(updatedBanners);
    setBanners(updatedBanners);
  };

  const handleToggleSecondaryActive = async (bannerId: string) => {
    const updatedBanners = secondaryBanners.map(banner => {
      if (banner.id === bannerId) {
        return { ...banner, active: !banner.active };
      }
      return banner;
    });
    await mysqlService.saveBanners([...banners, ...updatedBanners]);
    setSecondaryBanners(updatedBanners);
  };

  const handleDeleteBanner = async (bannerId: string) => {
    const updatedBanners = banners.filter(banner => banner.id !== bannerId);
    await mysqlService.saveBanners(updatedBanners);
    setBanners(updatedBanners);
  };

  const handleDeleteSecondaryBanner = async (bannerId: string) => {
    const updatedBanners = secondaryBanners.filter(banner => banner.id !== bannerId);
    await mysqlService.saveBanners([...banners, ...updatedBanners]);
    setSecondaryBanners(updatedBanners);
  };

  const handleAddBanner = async (newBanner: Banner) => {
    const updatedBanners = [...banners, { ...newBanner, type: 'primary' }];
    await mysqlService.saveBanners(updatedBanners);
    setBanners(updatedBanners);
  };

  const handleAddSecondaryBanner = async (newBanner: Banner) => {
    const updatedBanners = [...secondaryBanners, { ...newBanner, type: 'secondary' }];
    await mysqlService.saveBanners([...banners, ...updatedBanners]);
    setSecondaryBanners(updatedBanners);
  };

  return {
    banners,
    secondaryBanners,
    isLoading,
    handleToggleActive,
    handleToggleSecondaryActive,
    handleDeleteBanner,
    handleDeleteSecondaryBanner,
    handleAddBanner,
    handleAddSecondaryBanner,
  };
};