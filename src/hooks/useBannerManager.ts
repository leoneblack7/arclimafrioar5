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
    image_url: '/lovable-uploads/be106df6-7f56-49b8-8767-4cf73aa20a7b.png',
    active: true
  },
  {
    id: 'default-banner-2',
    image_url: '/lovable-uploads/3f83f27c-39bc-4118-9240-41e9d4d45fbf.png',
    active: true
  },
  {
    id: 'default-banner-3',
    image_url: '/lovable-uploads/b628c938-51f7-44ca-9c86-ff0be454ec82.png',
    active: true
  },
  {
    id: 'default-banner-4',
    image_url: '/lovable-uploads/cac2472b-8231-4414-8fd3-13200a6cecc9.png',
    active: true
  },
  {
    id: 'default-banner-5',
    image_url: '/lovable-uploads/10041c18-fc73-405c-a630-853731dc5792.png',
    active: true
  },
  {
    id: 'default-banner-6',
    image_url: '/lovable-uploads/14fcd544-00af-494f-b65d-d120a188f4af.png',
    active: true
  }
];

const defaultSecondaryBanners: Banner[] = [
  {
    id: 'secondary-banner-1',
    image_url: '/lovable-uploads/be106df6-7f56-49b8-8767-4cf73aa20a7b.png',
    active: true
  },
  {
    id: 'secondary-banner-2',
    image_url: '/lovable-uploads/3f83f27c-39bc-4118-9240-41e9d4d45fbf.png',
    active: true
  },
  {
    id: 'secondary-banner-3',
    image_url: '/lovable-uploads/b628c938-51f7-44ca-9c86-ff0be454ec82.png',
    active: true
  }
];

export const useBannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [secondaryBanners, setSecondaryBanners] = useState<Banner[]>([]);

  const loadBanners = () => {
    try {
      console.log("BannerManager - Iniciando carregamento dos banners");
      const storedBanners = localStorage.getItem('banners');
      const storedSecondaryBanners = localStorage.getItem('secondary-banners');
      
      if (storedBanners) {
        const parsedBanners = JSON.parse(storedBanners);
        if (parsedBanners && Array.isArray(parsedBanners) && parsedBanners.length > 0) {
          setBanners(parsedBanners);
        } else {
          setBanners(defaultBanners);
        }
      } else {
        setBanners(defaultBanners);
      }

      if (storedSecondaryBanners) {
        const parsedSecondaryBanners = JSON.parse(storedSecondaryBanners);
        if (parsedSecondaryBanners && Array.isArray(parsedSecondaryBanners) && parsedSecondaryBanners.length > 0) {
          setSecondaryBanners(parsedSecondaryBanners);
        } else {
          setSecondaryBanners(defaultSecondaryBanners);
        }
      } else {
        setSecondaryBanners(defaultSecondaryBanners);
      }
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      toast.error('Erro ao carregar os banners');
      setBanners(defaultBanners);
      setSecondaryBanners(defaultSecondaryBanners);
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
    toast.success("Banner adicionado e ativado com sucesso!");
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