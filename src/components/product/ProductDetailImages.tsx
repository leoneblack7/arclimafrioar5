interface ProductDetailImagesProps {
  title: string;
  images: string[];
  isActive?: boolean;
}

export const ProductDetailImages = ({ title, images, isActive }: ProductDetailImagesProps) => {
  if (!isActive || !images || images.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Produto de qualidade</h2>
      <div className="flex flex-col space-y-6">
        {images.map((image, index) => (
          <div key={index} className="w-full flex justify-center">
            <img
              src={image}
              alt={`${title} - Imagem ${index + 1}`}
              className="w-full md:w-auto max-h-[600px] object-contain rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};