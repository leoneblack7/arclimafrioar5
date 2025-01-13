import { useState, useEffect } from 'react';

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

  if (banners.length === 0) {
    return null;
  }

  const gradients = [
    'bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#9b87f5]',
    'bg-gradient-to-r from-[#D946EF] to-[#F97316] hover:from-[#F97316] hover:to-[#D946EF]',
    'bg-gradient-to-r from-[#0EA5E9] to-[#33C3F0] hover:from-[#33C3F0] hover:to-[#0EA5E9]'
  ];

  const titles = [
    'Smart Control',
    'Eco Power',
    'Ultra Comfort'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
      {banners.map((banner, index) => (
        <div 
          key={banner.id}
          className="space-y-2"
        >
          <h3 className={`text-xl md:text-2xl font-bold text-center bg-clip-text text-transparent ${
            index === 0 ? 'bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6]' :
            index === 1 ? 'bg-gradient-to-r from-[#D946EF] to-[#F97316]' :
            'bg-gradient-to-r from-[#0EA5E9] to-[#33C3F0]'
          }`}>
            {titles[index]}
          </h3>
          <div className={`relative w-full overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${gradients[index]}`}>
            <div className="relative aspect-[21/9] group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
              <img
                src={banner.image_url}
                alt={`${titles[index]} banner`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};