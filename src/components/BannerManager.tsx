import { BannerUploader } from "./banner/BannerUploader";
import { BannerCard } from "./banner/BannerCard";
import { useBannerManager } from "@/hooks/useBannerManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const BannerManager = () => {
  const { 
    banners, 
    secondaryBanners,
    handleUploadSuccess, 
    handleSecondaryUploadSuccess,
    handleDelete, 
    handleSecondaryDelete,
    toggleBannerStatus, 
    toggleSecondaryBannerStatus,
    updateBannerUrl,
    updateSecondaryBannerUrl
  } = useBannerManager();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Gerenciar Banners</h2>
      <Tabs defaultValue="main" className="w-full">
        <TabsList>
          <TabsTrigger value="main">Banners Principais</TabsTrigger>
          <TabsTrigger value="secondary">3 Banners abaixo do Explorar Produtos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="main">
          <BannerUploader onUploadSuccess={handleUploadSuccess} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {banners.map((banner) => (
              <BannerCard
                key={banner.id}
                id={banner.id}
                imageUrl={banner.image_url}
                active={banner.active}
                onToggleStatus={toggleBannerStatus}
                onDelete={handleDelete}
                onUpdateUrl={updateBannerUrl}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="secondary">
          <BannerUploader onUploadSuccess={handleSecondaryUploadSuccess} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {secondaryBanners.map((banner) => (
              <BannerCard
                key={banner.id}
                id={banner.id}
                imageUrl={banner.image_url}
                active={banner.active}
                onToggleStatus={toggleSecondaryBannerStatus}
                onDelete={handleSecondaryDelete}
                onUpdateUrl={updateSecondaryBannerUrl}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};