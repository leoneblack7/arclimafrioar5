import { Navbar } from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { Banner } from "@/components/Banner";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/home/Footer";

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
      <div className="w-full mt-16">
        <Banner />
      </div>
      <HeroSection onExploreClick={scrollToProducts} />
      <FeaturesSection />
      {isLoading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando produtos...</p>
        </div>
      ) : (
        <ProductsSection products={products || []} />
      )}
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
