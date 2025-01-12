import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductsSection } from "@/components/home/ProductsSection";
import { Footer } from "@/components/home/Footer";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
import { Navbar } from "@/components/Navbar";

const initialProducts = [
  {
    id: 1,
    title: "Ar Condicionado Split Inverter 12000 BTUs",
    price: 2499.99,
    image: "/placeholder.svg",
    description: "Split Inverter com tecnologia de última geração, economia de energia e controle via WiFi. Ideal para ambientes de até 20m².",
    active: true
  },
  {
    id: 2,
    title: "Ar Condicionado Portátil 9000 BTUs",
    price: 1899.99,
    image: "/placeholder.svg",
    description: "Solução portátil ideal para ambientes sem instalação fixa. Perfeito para quartos e escritórios até 15m².",
    active: true
  },
  {
    id: 3,
    title: "Split Hi-Wall Premium 18000 BTUs",
    price: 3299.99,
    image: "/placeholder.svg",
    description: "Sistema avançado de filtragem, operação silenciosa e máxima eficiência energética. Recomendado para salas até 30m².",
    active: true
  },
  {
    id: 4,
    title: "Multi Split Inverter 24000 BTUs",
    price: 4599.99,
    image: "/placeholder.svg",
    description: "Sistema multi split para até 3 ambientes, com tecnologia inverter e controle individual. Ideal para apartamentos.",
    active: true
  },
  {
    id: 5,
    title: "Ar Condicionado Cassete 36000 BTUs",
    price: 5999.99,
    image: "/placeholder.svg",
    description: "Ideal para ambientes comerciais, com distribuição uniforme do ar e instalação no teto. Perfeito para lojas e escritórios.",
    active: true
  },
  {
    id: 6,
    title: "Split Piso Teto 48000 BTUs",
    price: 7299.99,
    image: "/placeholder.svg",
    description: "Versátil e potente, perfeito para grandes ambientes comerciais ou industriais. Recomendado para áreas até 70m².",
    active: true
  },
  {
    id: 7,
    title: "Ar Condicionado Window 10000 BTUs",
    price: 1499.99,
    image: "/placeholder.svg",
    description: "Modelo tradicional de janela, ideal para ambientes pequenos.",
    active: true
  },
  {
    id: 8,
    title: "Split Inverter Dual 18000 BTUs",
    price: 3899.99,
    image: "/placeholder.svg",
    description: "Sistema dual com duas unidades internas, perfeito para dois ambientes.",
    active: true
  }
];

const Products = () => {
  useEffect(() => {
    const existingProducts = getFromLocalStorage('products', []);
    if (existingProducts.length === 0) {
      saveToLocalStorage('products', initialProducts);
    }
  }, []);

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