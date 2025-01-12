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
    description: "Split Inverter com tecnologia de última geração, economia de energia e controle via WiFi. Ideal para ambientes de até 20m².",
  },
  {
    id: 2,
    title: "Ar Condicionado Portátil 9000 BTUs",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description: "Solução portátil ideal para ambientes sem instalação fixa. Perfeito para quartos e escritórios até 15m².",
  },
  {
    id: 3,
    title: "Split Hi-Wall Premium 18000 BTUs",
    price: 3299.99,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Sistema avançado de filtragem, operação silenciosa e máxima eficiência energética. Recomendado para salas até 30m².",
  },
  {
    id: 4,
    title: "Multi Split Inverter 24000 BTUs",
    price: 4599.99,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Sistema multi split para até 3 ambientes, com tecnologia inverter e controle individual. Ideal para apartamentos.",
  },
  {
    id: 5,
    title: "Ar Condicionado Cassete 36000 BTUs",
    price: 5999.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description: "Ideal para ambientes comerciais, com distribuição uniforme do ar e instalação no teto. Perfeito para lojas e escritórios.",
  },
  {
    id: 6,
    title: "Split Piso Teto 48000 BTUs",
    price: 7299.99,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "Versátil e potente, perfeito para grandes ambientes comerciais ou industriais. Recomendado para áreas até 70m².",
  }
];

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => Promise.resolve(featuredProducts),
  });

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <Button size="lg" className="animate-float" onClick={scrollToProducts}>
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
      <section id="products-section" className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Produtos em Destaque
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Explore nossa seleção de produtos premium com tecnologia de ponta e eficiência energética
          </p>
          {isLoading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando produtos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((product) => (
                <div key={product.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                  <ProductCard {...product} />
                </div>
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

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
              <p className="text-gray-400">
                Especialistas em soluções de climatização com mais de 10 anos de experiência no mercado.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/produtos" className="hover:text-white transition-colors">Produtos</a></li>
                <li><a href="/rastreio" className="hover:text-white transition-colors">Rastrear Pedido</a></li>
                <li><a href="/contato" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-400">
                <li>contato@arclimafrio.com.br</li>
                <li>(11) 9999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Formas de Pagamento</h3>
              <p className="text-gray-400">
                Aceitamos cartão de crédito e PIX
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 ArclimaFrio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;