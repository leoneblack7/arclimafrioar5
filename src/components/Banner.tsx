import { useState, useEffect } from 'react';
import { BannerNavigation } from './banner/BannerNavigation';
import { BannerSlide } from './banner/BannerSlide';
import { BannerIndicators } from './banner/BannerIndicators';
import axios from 'axios';

interface Banner {
  id: string;
  image_url: string;
  active: boolean;
}

export const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const loadBanners = async () => {
    try {
      console.log("Banner - Iniciando carregamento dos banners");
      const response = await axios.get('/api/banners/read.php');
      console.log("Banner - Resposta da API:", response.data);
      
      if (response.data && Array.isArray(response.data)) {
        // Filtra apenas os banners ativos
        const activeBanners = response.data.filter((banner: Banner) => banner.active);
        
        if (activeBanners.length > 0) {
          console.log("Banner - Banners ativos carregados:", activeBanners);
          setBanners(activeBanners);
          return;
        }
      }
      
      console.error("Banner - Nenhum banner ativo encontrado");
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
    }
  };

  useEffect(() => {
    loadBanners();
    
    // Recarrega os banners a cada 30 segundos
    const interval = setInterval(loadBanners, 30000);
    
    return () => clearInterval(interval);
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
      className="relative w-full overflow-hidden aspect-[21/9]"
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