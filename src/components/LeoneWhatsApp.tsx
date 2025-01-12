import { Button } from "./ui/button";
import { MessageSquare } from "lucide-react";

export const LeoneWhatsApp = () => {
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
              <MessageSquare className="w-6 h-6" />
              <span className="text-lg">WhatsApp</span>
            </a>
          </Button>

          <img 
            src="/lovable-uploads/b628c938-51f7-44ca-9c86-ff0be454ec82.png"
            alt="Leone WhatsApp Banner"
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};