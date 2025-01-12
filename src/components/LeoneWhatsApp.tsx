import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";
import { useBannerManager } from "@/hooks/useBannerManager";

export const LeoneWhatsApp = () => {
  const { banners } = useBannerManager();
  const defaultBanners = banners.filter(banner => banner.id.startsWith('default-banner-'));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">LEONE WHATSAPP</h2>
      
      <div className="max-w-2xl mx-auto bg-background rounded-lg overflow-hidden shadow-lg">
        <div className="p-4">
          <Button
            variant="outline"
            size="lg"
            className="w-full mb-4 text-green-500 hover:text-green-600 border-green-500 hover:border-green-600"
            asChild
          >
            <a
              href="https://wa.me/5565992708533?text="
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="w-6 h-6 mr-2" />
              <span className="text-lg">WhatsApp</span>
            </a>
          </Button>

          <div className="space-y-4">
            {defaultBanners.slice(0, 3).map((banner, index) => (
              <img 
                key={banner.id}
                src={banner.image_url}
                alt={`Banner ${index + 1}`}
                className="w-full rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};