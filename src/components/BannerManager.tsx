import { BannerUploader } from "./banner/BannerUploader";
import { BannerCard } from "./banner/BannerCard";
import { useBannerManager } from "@/hooks/useBannerManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { v4 as uuidv4 } from 'uuid';
import { Banner } from "@/types/storage";

export const BannerManager = () => {
  const { 
    banners, 
    secondaryBanners,
    handleAddBanner, 
    handleAddSecondaryBanner,
    handleDeleteBanner, 
    handleDeleteSecondaryBanner,
    handleToggleActive, 
    handleToggleSecondaryActive
  } = useBannerManager();

  const handlePrimaryUpload = (base64String: string) => {
    const newBanner: Banner = {
      id: uuidv4(),
      image_url: base64String,
      active: true,
      type: 'primary'
    };
    handleAddBanner(newBanner);
  };

  const handleSecondaryUpload = (base64String: string) => {
    const newBanner: Banner = {
      id: uuidv4(),
      image_url: base64String,
      active: true,
      type: 'secondary'
    };
    handleAddSecondaryBanner(newBanner);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Gerenciar Banners</h2>
      <Tabs defaultValue="main" className="w-full">
        <TabsList>
          <TabsTrigger value="main">Banners Principais</TabsTrigger>
          <TabsTrigger value="secondary">3 Banners abaixo do Explorar Produtos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="main">
          <BannerUploader onUploadSuccess={handlePrimaryUpload} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {banners.map((banner) => (
              <BannerCard
                key={banner.id}
                id={banner.id}
                imageUrl={banner.image_url}
                active={banner.active}
                onToggleStatus={handleToggleActive}
                onDelete={handleDeleteBanner}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="secondary">
          <BannerUploader onUploadSuccess={handleSecondaryUpload} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {secondaryBanners.map((banner) => (
              <BannerCard
                key={banner.id}
                id={banner.id}
                imageUrl={banner.image_url}
                active={banner.active}
                onToggleStatus={handleToggleSecondaryActive}
                onDelete={handleDeleteSecondaryBanner}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};