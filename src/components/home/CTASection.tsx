import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Pronto para melhorar seu conforto?
        </h2>
        <p className="mb-8 text-lg opacity-90">
          Entre em contato conosco e descubra a melhor solução para sua necessidade
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          Fale Conosco
        </Button>
      </div>
    </section>
  );
};