import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { Navbar } from "@/components/Navbar";
import { getFromStorage } from "@/utils/storage";
import { Product } from "@/types/storage";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getFromStorage<Product[] | string>('products', []);
      
      // Check if the response is valid JSON and not PHP code
      if (typeof response === 'string') {
        if (response.includes('<?php')) {
          console.error('Invalid API response:', response);
          setProducts([]);
          setFilteredProducts([]);
          return;
        }
        // Try to parse string response as JSON
        try {
          const parsed = JSON.parse(response);
          if (Array.isArray(parsed)) {
            setProducts(parsed);
            setFilteredProducts(parsed);
            return;
          }
        } catch (e) {
          console.error('Failed to parse response:', e);
        }
        setProducts([]);
        setFilteredProducts([]);
        return;
      }

      if (Array.isArray(response)) {
        setProducts(response);
        setFilteredProducts(response);
      } else {
        console.error('Loaded products is not an array:', response);
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
      setFilteredProducts([]);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: Number(product.id),
                title: product.title,
                price: product.price,
                image: product.image_url || '/placeholder.svg',
                description: product.description,
                specifications: product.specifications,
                isSpecificationsActive: product.is_specifications_active
              }} 
            />
          ))}
        </div>
        {(!Array.isArray(filteredProducts) || filteredProducts.length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}