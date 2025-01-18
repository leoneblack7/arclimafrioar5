import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Sobre a ArclimaFrio</h3>
            <p className="text-gray-400 leading-relaxed">
              Especialistas em soluções de climatização com mais de 10 anos de experiência no mercado brasileiro.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Links Úteis</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="/produtos" className="hover:text-white transition-colors">Produtos</a>
              </li>
              <li>
                <a href="/rastreio" className="hover:text-white transition-colors">Rastrear Pedido</a>
              </li>
              <li>
                <a href="/sobre" className="hover:text-white transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="/contato" className="hover:text-white transition-colors">Contato</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Contato</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                São Paulo, SP
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                (11) 9999-9999
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                contato@arclimafrio.com.br
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Formas de Pagamento</h3>
            <p className="text-gray-400 mb-4">
              Aceitamos diversas formas de pagamento para sua comodidade:
            </p>
            <ul className="text-gray-400 space-y-2">
              <li>• Cartão de Crédito</li>
              <li>• PIX</li>
              <li>• Boleto Bancário</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2024 ArclimaFrio. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};