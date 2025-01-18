import { Product } from "@/types/product";

export interface ProductCardProps {
  product: Product;
  specifications?: string;
  isSpecificationsActive?: boolean;
}

export const ProductCard = ({ product, specifications, isSpecificationsActive }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4">
      <img src={product.image_url} alt={product.title} className="w-full h-48 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500">{product.description}</p>
      {isSpecificationsActive && specifications && (
        <p className="text-sm text-gray-500 mt-2">{specifications}</p>
      )}
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">View Details</button>
      </div>
    </div>
  );
};