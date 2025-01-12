import { Award, Clock, MapPin, Shield, Truck, Users, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            Sobre a ArclimaFrio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Há mais de uma década proporcionando conforto térmico com excelência e compromisso com a satisfação dos nossos clientes.
          </p>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-accent rounded-lg hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-primary mb-4">Missão</h3>
              <p className="text-gray-600">
                Proporcionar o melhor em climatização, garantindo o conforto e bem-estar dos nossos clientes através de produtos de qualidade e atendimento excepcional.
              </p>
            </div>
            <div className="text-center p-6 bg-accent rounded-lg hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-primary mb-4">Visão</h3>
              <p className="text-gray-600">
                Ser referência nacional em soluções de climatização, reconhecida pela excelência em produtos, serviços e inovação tecnológica.
              </p>
            </div>
            <div className="text-center p-6 bg-accent rounded-lg hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-primary mb-4">Valores</h3>
              <p className="text-gray-600">
                Comprometimento, qualidade, inovação, sustentabilidade e foco no cliente são os pilares que guiam nossas ações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-primary" />,
                title: "Garantia Estendida",
                description: "Todos os nossos produtos contam com garantia estendida e suporte técnico especializado."
              },
              {
                icon: <Truck className="h-12 w-12 text-primary" />,
                title: "Entrega Rápida",
                description: "Entrega em até 48 horas para toda a região metropolitana."
              },
              {
                icon: <Users className="h-12 w-12 text-primary" />,
                title: "Equipe Especializada",
                description: "Profissionais altamente capacitados para melhor atendê-lo."
              },
              {
                icon: <Award className="h-12 w-12 text-primary" />,
                title: "Produtos Certificados",
                description: "Trabalhamos apenas com as melhores marcas do mercado."
              },
              {
                icon: <Clock className="h-12 w-12 text-primary" />,
                title: "Suporte 24/7",
                description: "Assistência técnica disponível 24 horas por dia, 7 dias por semana."
              },
              {
                icon: <MapPin className="h-12 w-12 text-primary" />,
                title: "Cobertura Nacional",
                description: "Atendemos em todo o território nacional com rapidez e eficiência."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossa História</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Fundada em 2010, a ArclimaFrio nasceu do sonho de revolucionar o mercado de climatização no Brasil. Começamos como uma pequena loja familiar e hoje somos referência nacional em soluções de ar condicionado.
            </p>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Ao longo dos anos, investimos constantemente em tecnologia e capacitação profissional, sempre com o objetivo de oferecer as melhores soluções em climatização para nossos clientes.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Hoje, contamos com uma equipe de mais de 100 profissionais especializados e uma estrutura moderna para atender às necessidades dos nossos clientes em todo o Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para melhorar seu conforto?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Entre em contato conosco e descubra a melhor solução para sua necessidade
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>(11) 9999-9999</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>contato@arclimafrio.com.br</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
