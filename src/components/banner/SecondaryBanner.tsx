import { useState, useEffect } from 'react';
import { BannerNavigation } from './BannerNavigation';
import { BannerSlide } from './BannerSlide';
import { BannerIndicators } from './BannerIndicators';

interface Banner {
  id: string;
  image_url: string;
  active: boolean;
}

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

export const SecondaryBanner = () => {
  const [banners, setBanners] = useState<Banner[]>(defaultSecondaryBanners);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const loadBanners = () => {
    try {
      console.log("SecondaryBanner - Iniciando carregamento dos banners");
      const storedBanners = localStorage.getItem('secondary-banners');
      console.log("SecondaryBanner - Dados do localStorage:", storedBanners);
      
      if (storedBanners) {
        const parsedBanners = JSON.parse(storedBanners);
        console.log("SecondaryBanner - Banners parseados:", parsedBanners);
        
        if (parsedBanners && Array.isArray(parsedBanners) && parsedBanners.length > 0) {
          const activeBanners = parsedBanners.filter((banner: Banner) => banner.active);
          
          if (activeBanners.length > 0) {
            console.log("SecondaryBanner - Usando banners do localStorage");
            setBanners(activeBanners);
            return;
          }
        }
      }
      
      console.log("SecondaryBanner - Usando banners padrão");
      setBanners(defaultSecondaryBanners);
    } catch (error) {
      console.error('Erro ao carregar banners secundários:', error);
      setBanners(defaultSecondaryBanners);
    }
  };

  useEffect(() => {
    loadBanners();
    window.addEventListener('secondaryBannersUpdated', loadBanners);
    return () => {
      window.removeEventListener('secondaryBannersUpdated', loadBanners);
    };
  }, []);

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

  if (banners.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative w-full overflow-hidden aspect-[21/9]"
      tabIndex={0}
      aria-label="Secondary banner carousel"
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