import { useState, useEffect } from 'react';
import { BannerNavigation } from './banner/BannerNavigation';
import { BannerSlide } from './banner/BannerSlide';
import { BannerIndicators } from './banner/BannerIndicators';

interface Banner {
  id: string;
  image_url: string;
  active: boolean;
}

const defaultBanners: Banner[] = [
  {
    id: 'default-banner-1',
    image_url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    active: true
  },
  {
    id: 'default-banner-2',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    active: true
  },
  {
    id: 'default-banner-3',
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    active: true
  },
  {
    id: 'default-banner-4',
    image_url: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff',
    active: true
  },
  {
    id: 'default-banner-5',
    image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
    active: true
  }
];

export const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
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
        
        // Filtra apenas os banners ativos
        const activeBanners = parsedBanners.filter((banner: Banner) => banner.active);
        
        if (activeBanners.length > 0) {
          console.log("Banner - Usando banners do localStorage");
          setBanners(activeBanners);
        } else {
          console.log("Banner - Usando banners padrão pois não há ativos");
          setBanners(defaultBanners);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      setBanners(defaultBanners);
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  return (
    <div 
      className="relative w-full h-[300px] overflow-hidden mt-16"
      tabIndex={0}
      aria-label="Banner carousel"
    >
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