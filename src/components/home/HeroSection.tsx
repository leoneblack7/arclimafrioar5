import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection = ({ onExploreClick }: HeroSectionProps) => {
  return (
    <section className="pb-12 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto text-center pt-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          Climatização Inteligente com ArclimaFrio
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Descubra nossa linha premium de ar condicionado com tecnologia de ponta e máxima eficiência
        </p>
        <Button size="lg" className="animate-float" onClick={onExploreClick}>
          Explorar Produtos
        </Button>
      </div>
    </section>
  );
};