import { useQuery } from "@tanstack/react-query";
import { getFromLocalStorage } from "@/utils/localStorage";
import { ProductCard } from "@/components/ProductCard";

interface RelatedProductsProps {
  currentProductId: number;
}

export const RelatedProducts = ({ currentProductId }: RelatedProductsProps) => {
  const { data: relatedProducts } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const products = getFromLocalStorage('featured-products', []);
      return products
        .filter((product: any) => product.active && product.id !== currentProductId)
        .slice(0, 3)
        .map((item: any) => ({
          id: Number(item.id),
          title: item.title,
          price: item.price,
          image: item.image || '/placeholder.svg',
          description: item.description,
        }));
    }
  });

  if (!relatedProducts?.length) return null;

  return (
    <div className="border rounded-lg p-4 mb-6 w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Quem viu, também viu
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedProducts.map((product) => (
          <div key={product.id} className="transform hover:-translate-y-1 transition-transform duration-300">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};