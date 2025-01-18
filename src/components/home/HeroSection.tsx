import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection = ({ onExploreClick }: HeroSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 text-center">
        <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-6xl'} font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 animate-fade-in leading-tight`}>
          Climatização Inteligente para seu Conforto
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
          Descubra nossa linha premium de ar condicionado com tecnologia de ponta e máxima eficiência energética
        </p>
        <Button 
          size={isMobile ? "default" : "lg"} 
          className="animate-float bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 text-white font-medium px-8"
          onClick={onExploreClick}
        >
          Explorar Produtos
        </Button>
      </div>
    </section>
  );
};