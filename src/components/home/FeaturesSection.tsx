import { AirVent, RefrigeratorIcon, Settings, Truck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    icon: <AirVent className="h-8 w-8 text-primary" />,
    title: "Tecnologia Avançada",
    description: "Controle pelo celular com nosso app exclusivo",
  },
  {
    icon: <RefrigeratorIcon className="h-8 w-8 text-primary" />,
    title: "Economia de Energia",
    description: "Até 60% de economia na conta de luz",
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: "Instalação Grátis",
    description: "Instalação profissional inclusa na compra",
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'md:grid-cols-4 gap-8'}`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 text-center rounded-2xl bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-6 animate-float">
                <div className="p-3 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};