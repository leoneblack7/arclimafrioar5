import { Navbar } from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { Banner } from "@/components/Banner";
import { SecondaryBanner } from "@/components/banner/SecondaryBanner";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/home/Footer";
import { getFromStorage } from "@/utils/storage";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      console.log("Fetching featured products");
      const storedProducts = await getFromStorage('featured-products', []);
      console.log("Stored products:", storedProducts);
      return storedProducts
        .filter((item: any) => item.active)
        .map((item: any) => ({
          id: Number(item.id),
          title: item.title,
          price: Number(item.price),
          image: item.image || '/placeholder.svg',
          description: item.description,
          active: item.active,
          specifications: item.specifications,
          isSpecificationsActive: item.isSpecificationsActive
        }));
    }
  });

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="w-full">
        <Banner />
      </div>
      <div className={`flex-grow ${isMobile ? 'px-4' : 'container mx-auto'}`}>
        <HeroSection onExploreClick={scrollToProducts} />
        <FeaturesSection />
        <div className="w-full my-8">
          <SecondaryBanner />
        </div>
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
      </div>
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;