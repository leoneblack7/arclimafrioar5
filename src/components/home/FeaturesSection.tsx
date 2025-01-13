import { AirVent, RefrigeratorIcon, Settings, Truck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    icon: <AirVent className="h-8 w-8 text-primary" />,
    title: "Tecnologia Avançada",
    description: "Sistemas inteligentes com controle via app",
  },
  {
    icon: <RefrigeratorIcon className="h-8 w-8 text-primary" />,
    title: "Economia de Energia",
    description: "Até 60% de economia na conta de luz",
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: "Instalação Grátis",
    description: "Instalação profissional inclusa",
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Entrega Rápida",
    description: "Entrega em até 48 horas",
  },
];

export const FeaturesSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 md:py-16">
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-4 gap-8'}`}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 text-center rounded-xl bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-center mb-4 animate-float">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};