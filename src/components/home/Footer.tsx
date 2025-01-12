export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-gray-400">
              Especialistas em soluções de climatização com mais de 10 anos de experiência no mercado.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/produtos" className="hover:text-white transition-colors">Produtos</a></li>
              <li><a href="/rastreio" className="hover:text-white transition-colors">Rastrear Pedido</a></li>
              <li><a href="/contato" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li>contato@arclimafrio.com.br</li>
              <li>(11) 9999-9999</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Formas de Pagamento</h3>
            <p className="text-gray-400">
              Aceitamos cartão de crédito e PIX
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 ArclimaFrio. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};