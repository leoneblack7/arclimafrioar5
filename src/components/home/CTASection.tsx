import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export const CTASection = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`py-16 ${isMobile ? 'px-4' : ''} bg-gradient-to-r from-blue-600 to-cyan-500 text-white`}>
      <div className="container mx-auto text-center">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-4 animate-fade-in`}>
          Pronto para melhorar seu conforto?
        </h2>
        <p className="mb-8 text-lg opacity-90 animate-fade-in delay-100">
          Entre em contato conosco e descubra a melhor solução para sua necessidade
        </p>
        <Button
          size={isMobile ? "default" : "lg"}
          variant="secondary"
          className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 animate-float"
        >
          Fale Conosco
        </Button>
      </div>
    </section>
  );
};