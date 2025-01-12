import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      const parsedBanners = storedBanners ? JSON.parse(storedBanners) : [];
      const activeBanners = parsedBanners.filter((banner: Banner) => banner.active);
      console.log("Banner - Banners ativos carregados:", activeBanners);
      setBanners(activeBanners);
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

  console.log("Banner - Renderizando banner atual:", currentIndex, banners[currentIndex]);

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={banner.image_url}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
};