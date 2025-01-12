import { BannerUploader } from "./banner/BannerUploader";
import { BannerCard } from "./banner/BannerCard";
import { useBannerManager } from "@/hooks/useBannerManager";

export const BannerManager = () => {
  const { banners, handleUploadSuccess, handleDelete, toggleBannerStatus } = useBannerManager();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Gerenciar Banners</h2>
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
          />
        ))}
      </div>
    </div>
  );
};