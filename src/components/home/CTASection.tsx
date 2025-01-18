import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Phone } from "lucide-react";

export const CTASection = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`py-20 ${isMobile ? 'px-4' : ''} bg-gradient-to-r from-blue-600 to-cyan-500 text-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
      <div className="container mx-auto text-center relative z-10">
        <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold mb-6 animate-fade-in`}>
          Pronto para Melhorar seu Conforto?
        </h2>
        <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto animate-fade-in delay-100">
          Entre em contato conosco e descubra a melhor solução para sua necessidade. 
          Oferecemos consultoria especializada gratuitamente.
        </p>
        <Button
          size={isMobile ? "default" : "lg"}
          variant="secondary"
          className="bg-white text-primary hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 animate-float gap-2"
        >
          <Phone className="h-5 w-5" />
          Fale Conosco
        </Button>
      </div>
    </section>
  );
};