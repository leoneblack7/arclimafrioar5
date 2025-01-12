import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { AirVent, RefrigeratorIcon, Settings, Truck } from "lucide-react";

// Temporary mock data until we integrate with backend
const featuredProducts = [
  {
    id: 1,
    title: "Ar Condicionado Split Inverter 12000 BTUs",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Split Inverter com tecnologia de última geração, economia de energia e controle via WiFi",
  },
  {
    id: 2,
    title: "Ar Condicionado Portátil 9000 BTUs",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description: "Solução portátil ideal para ambientes sem instalação fixa, com controle remoto e timer",
  },
  {
    id: 3,
    title: "Split Hi-Wall Premium 18000 BTUs",
    price: 3299.99,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Sistema avançado de filtragem, operação silenciosa e máxima eficiência energética",
  },
  {
    id: 4,
    title: "Multi Split Inverter 24000 BTUs",
    price: 4599.99,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Sistema multi split para até 3 ambientes, com tecnologia inverter e controle individual",
  },
];

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => Promise.resolve(featuredProducts), // Temporary mock fetch
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Climatização Inteligente com ArclimaFrio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra nossa linha premium de ar condicionado com tecnologia de ponta e máxima eficiência
          </p>
          <Button size="lg" className="animate-float">
            Explorar Produtos
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
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
            ].map((feature, index) => (
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

      {/* Products Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Produtos em Destaque
          </h2>
          {isLoading ? (
            <div className="text-center">Carregando produtos...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products?.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para melhorar seu conforto?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Entre em contato conosco e descubra a melhor solução para sua necessidade
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Fale Conosco
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;