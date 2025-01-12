import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ProductsSectionProps {
  products: Product[];
  title: string;
  description: string;
}

export const ProductsSection = ({ products, title, description }: ProductsSectionProps) => {
  return (
    <section id="products-section" className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div key={product.id} className="transform hover:-translate-y-1 transition-transform duration-300">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};