import { AirVent, RefrigeratorIcon, Settings, Truck } from "lucide-react";

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
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 text-center rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};