import { useState, useEffect } from 'react';
import { BannerNavigation } from './banner/BannerNavigation';
import { BannerSlide } from './banner/BannerSlide';
import { BannerIndicators } from './banner/BannerIndicators';

interface Banner {
  id: string;
  image_url: string;
  active: boolean;
}

const defaultBanner: Banner = {
  id: 'default-banner',
  image_url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
  active: true
};

export const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([defaultBanner]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const loadBanners = () => {
    try {
      console.log("Banner - Iniciando carregamento dos banners");
      const storedBanners = localStorage.getItem('banners');
      console.log("Banner - Dados do localStorage:", storedBanners);
      
      if (storedBanners) {
        const parsedBanners = JSON.parse(storedBanners);
        console.log("Banner - Banners parseados:", parsedBanners);
        const activeBanners = parsedBanners.filter((banner: Banner) => banner.active);
        console.log("Banner - Banners ativos:", activeBanners);
        if (activeBanners.length > 0) {
          setBanners(activeBanners);
        }
      } else {
        console.log("Banner - Usando banner padrão");
        setBanners([defaultBanner]);
      }
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      setBanners([defaultBanner]);
    }
  };

  useEffect(() => {
    loadBanners();
    window.addEventListener('bannersUpdated', loadBanners);
    return () => {
      window.removeEventListener('bannersUpdated', loadBanners);
    };
  }, []);

  useEffect(() => {
    console.log("Banner - Estado atual dos banners:", banners);
  }, [banners]);

  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const selectSlide = (index: number) => {
    setSlideDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  return (
    <div className="relative w-full h-[300px] overflow-hidden mt-16">
      {banners.map((banner, index) => (
        <BannerSlide
          key={banner.id}
          id={banner.id}
          image_url={banner.image_url}
          isActive={index === currentIndex}
          direction={slideDirection}
        />
      ))}
      
      <BannerNavigation
        onPrevClick={prevSlide}
        onNextClick={nextSlide}
        showControls={banners.length > 1}
      />

      <BannerIndicators
        count={banners.length}
        currentIndex={currentIndex}
        onSelect={selectSlide}
      />
    </div>
  );
};