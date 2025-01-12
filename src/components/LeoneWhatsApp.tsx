import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";

export const LeoneWhatsApp = () => {
  const banners = [
    "/lovable-uploads/e9383322-dd18-4278-8a53-e88e5446ffcb.png",
    "/lovable-uploads/a0789ab6-2c1a-4953-8f38-5c7f5eed8ea1.png",
    "/lovable-uploads/1c1e50b3-34fd-4534-815c-81860aeffec9.png",
    "/lovable-uploads/37d5d2b4-9a29-44df-93a9-66c2a43bdb82.png"
  ];

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
            {banners.map((banner, index) => (
              <img 
                key={index}
                src={banner}
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