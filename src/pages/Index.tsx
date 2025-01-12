import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: 1,
    title: "Smart Inverter AC",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Energy-efficient smart air conditioner with WiFi control",
  },
  {
    id: 2,
    title: "Portable AC Unit",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description: "Compact and powerful portable air conditioning solution",
  },
  {
    id: 3,
    title: "Premium Split AC",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    description: "High-performance split system with advanced cooling",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-white to-secondary">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Stay Cool with ArclimaFrio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our range of energy-efficient air conditioning solutions for your home and office
          </p>
          <Button size="lg" className="animate-float">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Energy Efficient",
                description: "Save money with our energy-efficient units",
                icon: "⚡",
              },
              {
                title: "24/7 Support",
                description: "Expert support whenever you need it",
                icon: "🛠️",
              },
              {
                title: "Fast Delivery",
                description: "Quick and reliable delivery service",
                icon: "🚚",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 text-center rounded-lg bg-secondary hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;