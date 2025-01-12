import { Navbar } from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { ProductsSection } from "@/components/home/ProductsSection";
import { Footer } from "@/components/home/Footer";
import { getFromLocalStorage } from "@/utils/localStorage";

const Products = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const storedProducts = getFromLocalStorage('products', []);
      return storedProducts
        .filter((item: any) => item.active)
        .map((item: any) => ({
          id: Number(item.id),
          title: item.title,
          price: Number(item.price),
          image: item.image || '/placeholder.svg',
          description: item.description
        }));
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produtos...</p>
          </div>
        ) : (
          <ProductsSection 
            products={products || []} 
            title="Todos os Produtos"
            description="Explore nossa coleção completa de produtos"
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;