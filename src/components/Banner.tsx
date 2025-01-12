import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface Banner {
  id: number;
  imageUrl: string;
  active: boolean;
}

export const Banner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    try {
      console.log('Iniciando carregamento dos banners...');
      const savedBanners = localStorage.getItem("siteBanners");
      console.log('Dados do localStorage:', savedBanners);
      
      if (savedBanners) {
        const parsedBanners = JSON.parse(savedBanners);
        console.log('Banners parseados:', parsedBanners);
        
        const activeBanners = parsedBanners.filter((banner: Banner) => banner.active);
        console.log('Banners ativos:', activeBanners);
        
        setBanners(activeBanners);
      } else {
        // Adicionar banner de exemplo se não houver banners
        const defaultBanner: Banner = {
          id: 1,
          imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
          active: true
        };
        console.log('Adicionando banner padrão:', defaultBanner);
        setBanners([defaultBanner]);
        localStorage.setItem("siteBanners", JSON.stringify([defaultBanner]));
      }
    } catch (error) {
      console.error('Erro ao carregar banners:', error);
      toast.error('Erro ao carregar os banners');
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  console.log('Renderizando Banner component. Número de banners:', banners.length);
  
  if (banners.length === 0) {
    console.log('Nenhum banner ativo encontrado');
    return null;
  }

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
            src={banner.imageUrl}
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