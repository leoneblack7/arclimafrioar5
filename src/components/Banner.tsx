import { useState, useEffect } from 'react';
import { BannerNavigation } from './banner/BannerNavigation';
import { BannerSlide } from './banner/BannerSlide';

interface Banner {
  id: string;
  image_url: string;
  active: boolean;
}

export const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadBanners = () => {
    try {
      console.log("Banner - Iniciando carregamento dos banners");
      const storedBanners = localStorage.getItem('banners');
      if (storedBanners) {
        const parsedBanners = JSON.parse(storedBanners);
        console.log("Banner - Banners carregados:", parsedBanners);
        const activeBanners = parsedBanners.filter((banner: Banner) => banner.active);
        console.log("Banner - Banners ativos:", activeBanners);
        setBanners(activeBanners);
      } else {
        console.log("Banner - Nenhum banner encontrado no localStorage");
      }
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
    }
  };

  useEffect(() => {
    loadBanners();
    window.addEventListener('bannersUpdated', loadBanners);
    return () => {
      window.removeEventListener('bannersUpdated', loadBanners);
    };
  }, []);

  const getRandomIndex = (currentIdx: number, length: number) => {
    if (length <= 1) return 0;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * length);
    } while (newIndex === currentIdx);
    return newIndex;
  };

  const nextSlide = () => {
    if (banners.length > 1) {
      setCurrentIndex(current => getRandomIndex(current, banners.length));
    }
  };

  const prevSlide = () => {
    if (banners.length > 1) {
      setCurrentIndex(current => getRandomIndex(current, banners.length));
    }
  };

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(nextSlide, 7000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  if (banners.length === 0) {
    console.log("Banner - Nenhum banner ativo encontrado");
    return null;
  }

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {banners.map((banner, index) => (
        <BannerSlide
          key={banner.id}
          id={banner.id}
          image_url={banner.image_url}
          isActive={index === currentIndex}
        />
      ))}
      
      <BannerNavigation
        onPrevClick={prevSlide}
        onNextClick={nextSlide}
        showControls={banners.length > 1}
      />
    </div>
  );
};