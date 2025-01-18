import { useState, useEffect } from 'react';
import { Banner } from '@/types/storage';
import { mysqlService } from '@/utils/mysqlService';
import { toast } from 'sonner';

export const useBannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [secondaryBanners, setSecondaryBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const allBanners = await mysqlService.getBanners();
      setBanners(allBanners.filter(b => !b.type || b.type === 'primary'));
      setSecondaryBanners(allBanners.filter(b => b.type === 'secondary'));
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading banners:', error);
      toast.error('Erro ao carregar banners');
    }
  };

  const handleAddBanner = async (newBanner: Banner) => {
    try {
      await mysqlService.saveBanner({ ...newBanner, type: 'primary' });
      setBanners([...banners, { ...newBanner, type: 'primary' }]);
      toast.success('Banner adicionado com sucesso!');
    } catch (error) {
      console.error('Error adding banner:', error);
      toast.error('Erro ao adicionar banner');
    }
  };

  const handleAddSecondaryBanner = async (newBanner: Banner) => {
    try {
      await mysqlService.saveBanner({ ...newBanner, type: 'secondary' });
      setSecondaryBanners([...secondaryBanners, { ...newBanner, type: 'secondary' }]);
      toast.success('Banner secundário adicionado com sucesso!');
    } catch (error) {
      console.error('Error adding secondary banner:', error);
      toast.error('Erro ao adicionar banner secundário');
    }
  };

  const handleToggleActive = async (bannerId: string) => {
    const updatedBanners = banners.map(banner => 
      banner.id === bannerId ? { ...banner, active: !banner.active } : banner
    );
    await mysqlService.saveBanners(updatedBanners);
    setBanners(updatedBanners);
  };

  const handleToggleSecondaryActive = async (bannerId: string) => {
    const updatedBanners = secondaryBanners.map(banner => 
      banner.id === bannerId ? { ...banner, active: !banner.active } : banner
    );
    await mysqlService.saveBanners([...banners, ...updatedBanners]);
    setSecondaryBanners(updatedBanners);
  };

  const handleDeleteBanner = async (bannerId: string) => {
    await mysqlService.deleteBanner(bannerId);
    setBanners(banners.filter(banner => banner.id !== bannerId));
  };

  const handleDeleteSecondaryBanner = async (bannerId: string) => {
    await mysqlService.deleteBanner(bannerId);
    setSecondaryBanners(secondaryBanners.filter(banner => banner.id !== bannerId));
  };

  return {
    banners,
    secondaryBanners,
    isLoading,
    handleAddBanner,
    handleAddSecondaryBanner,
    handleToggleActive,
    handleToggleSecondaryActive,
    handleDeleteBanner,
    handleDeleteSecondaryBanner,
  };
};