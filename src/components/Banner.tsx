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
        
        if (parsedBanners && Array.isArray(parsedBanners) && parsedBanners.length > 0) {
          // Filtra apenas os banners ativos
          const activeBanners = parsedBanners.filter((banner: Banner) => banner.active);
          
          if (activeBanners.length > 0) {
            console.log("Banner - Usando banners do localStorage");
            setBanners(activeBanners);
            return;
          }
        }
      }
      
      console.log("Banner - Usando banners padrão");
      setBanners(defaultBanners);
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

  if (banners.length === 0) {
    console.log("Banner - Nenhum banner disponível");
    return null;
  }

  return (
    <div 
      className="relative w-full overflow-hidden aspect-[16/9] -mt-16 pt-16"
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