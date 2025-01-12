import { Navbar } from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { Banner } from "@/components/Banner";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/home/Footer";
import { getFromLocalStorage } from "@/utils/localStorage";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const storedProducts = getFromLocalStorage('featured-products', []);
      return storedProducts
        .filter((item: any) => item.active)
        .map((item: any) => ({
          id: Number(item.id),
          title: item.title,
          price: item.price,
          image: item.image || '/placeholder.svg',
          description: item.description,
          active: item.active
        }));
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full">
        <Banner />
      </div>
      <HeroSection onExploreClick={() => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }} />
      <FeaturesSection />
      {isLoading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando produtos...</p>
        </div>
      ) : (
        <ProductsSection 
          products={products || []} 
          title="Produtos em Destaque"
          description="Explore nossa seleção de produtos premium com tecnologia de ponta e eficiência energética"
        />
      )}
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;