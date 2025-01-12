import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: 1,
    title: "Ar Condicionado Inverter",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Ar condicionado inteligente com controle WiFi e economia de energia",
  },
  {
    id: 2,
    title: "Ar Condicionado Portátil",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description: "Solução compacta e potente de ar condicionado portátil",
  },
  {
    id: 3,
    title: "Split Premium",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Sistema split de alto desempenho com resfriamento avançado",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Seção Principal */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-white to-secondary">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Mantenha-se Fresco com ArclimaFrio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra nossa linha de soluções em ar condicionado para sua casa e escritório
          </p>
          <Button size="lg" className="animate-float">
            Comprar Agora
          </Button>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Recursos */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Por Que Nos Escolher</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Economia de Energia",
                description: "Economize dinheiro com nossas unidades eficientes",
                icon: "⚡",
              },
              {
                title: "Suporte 24/7",
                description: "Suporte especializado quando você precisar",
                icon: "🛠️",
              },
              {
                title: "Entrega Rápida",
                description: "Serviço de entrega rápido e confiável",
                icon: "🚚",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 text-center rounded-lg bg-secondary hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;