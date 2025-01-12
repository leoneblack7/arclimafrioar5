import { Navbar } from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { Banner } from "@/components/Banner";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/home/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Product, DatabaseProduct } from "@/types/product";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true);
      
      if (error) {
        console.error('Error fetching products:', error);
        return [];
      }
      
      return (data || []).map((item: DatabaseProduct) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image_url,
        description: item.description,
        active: item.active || false
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full">
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