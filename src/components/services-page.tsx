"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Heart, 
  Users, 
  Scale, 
  MessageSquare,
  ArrowLeft,
  ExternalLink,
  Gavel,
  Building,
  UserCheck,
  Globe
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  contact?: string;
  address?: string;
  hours?: string;
  icon: React.ReactNode;
  index: number;
}

function ServiceCard({ title, description, contact, address, hours, icon, index }: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Scroll progress para efeitos dinâmicos
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calcular progresso do scroll (0 a 1)
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Calcular inicial

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Efeitos simples 
  const scaleEffect = isVisible ? 1 : 0.95;
  const opacityEffect = isVisible ? 1 : 0;
  const translateY = isVisible ? 0 : 20;

  // Diferentes tipos de entrada baseados no index
  const getEntryAnimation = () => {
    const animations = [
      'animate-slide-in-left',
      'animate-slide-in-right', 
      'animate-fade-in-up',
      'animate-zoom-in',
      'animate-rotate-in',
      'animate-bounce-in'
    ];
    return animations[index % animations.length];
  };

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 ${
        isVisible 
          ? `translate-y-0 opacity-100 scale-100 ${getEntryAnimation()}` 
          : 'translate-y-8 opacity-0 scale-95'
      }`}
      style={{ 
        animationDelay: `${index * 200}ms`,
        transform: `translateY(${translateY}px) scale(${scaleEffect})`,
        opacity: opacityEffect
      }}
    >
      <div 
        className="bg-gradient-to-br from-slate-800 via-slate-900 to-black p-6 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 group relative overflow-hidden"
        onMouseMove={handleMouseMove}
        style={{
          transform: `perspective(1000px) rotateX(${(1 - scrollProgress) * 15}deg) rotateY(${(1 - scrollProgress) * 5}deg)`
        }}
      >
        {/* Efeito de spotlight no hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
          }}
        />

        {/* Efeito de scan line baseado no scroll */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
          style={{
            transform: `translateX(${scrollProgress * 200 - 100}%)`,
            height: '2px',
            top: `${scrollProgress * 100}%`
          }}
        />
        {/* Ícone e título */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {title}
            </h3>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Informações de contato */}
        <div className="space-y-3">
          {contact && (
            <div className="flex items-center space-x-3 text-gray-400">
              <Phone className="h-4 w-4 text-green-400" />
              <span>{contact}</span>
            </div>
          )}
          {address && (
            <div className="flex items-start space-x-3 text-gray-400">
              <MapPin className="h-4 w-4 text-red-400 mt-0.5" />
              <span className="flex-1">{address}</span>
            </div>
          )}
          {hours && (
            <div className="flex items-center space-x-3 text-gray-400">
              <Clock className="h-4 w-4 text-blue-400" />
              <span>{hours}</span>
            </div>
          )}
        </div>

        {/* Efeito hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

function ParallaxSection({ children, className = "", speed = 0.5 }: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <section 
      ref={sectionRef}
      className={`relative ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </section>
  );
}

interface ServicesPageProps {
  onBack: () => void;
}

export function ServicesPage({ onBack }: ServicesPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: "Delegacia Virtual",
      description: "Ampliou as opções de registros de ocorrências incluindo violência doméstica contra mulher. As denúncias podem ser feitas pela internet.",
      contact: "www.delegaciavirtual.sinesp.gov.br",
      icon: <Globe className="h-6 w-6 text-white" />
    },
    {
      title: "Tribunal de Justiça - Judi",
      description: "Assistente virtual que fornece informações sobre tipos de violência doméstica e familiar, além de acesso aos canais de denúncia.",
      contact: "(71) 99978-4768",
      icon: <MessageSquare className="h-6 w-6 text-white" />
    },
    {
      title: "Centro de Referência de Atendimento à Mulher (CRAM)",
      description: "Oferece acompanhamento multidisciplinar com orientação jurídica em Salvador e outros 30 municípios da Bahia.",
      contact: "(71) 3235-4268",
      address: "Praça Almirante Coelho Neto, nº 1, Barris",
      hours: "8h às 18h",
      icon: <Building className="h-6 w-6 text-white" />
    },
    {
      title: "Núcleo de Defesa da Mulher (Nudem)",
      description: "Serviço da Defensoria Pública que oferece atendimento emergencial de médio e longo prazo para garantir direitos a uma vida sem violência.",
      contact: "(71) 3324-1587",
      address: "Rua Arquimedes Gonçalves, Jardim Baiano - 3º andar",
      hours: "7h às 16h",
      icon: <Shield className="h-6 w-6 text-white" />
    },
    {
      title: "Grupo de Atuação Especial em Defesa da Mulher (Gedem)",
      description: "Ação do Ministério Público que atua no atendimento e proteção do direito da mulher, baseado na Lei Maria da Penha.",
      contact: "(71) 3321-1949",
      address: "Rua Arquimedes Gonçalves, nº 142, Jardim Baiano",
      hours: "8h às 12h e 14h às 18h",
      icon: <Gavel className="h-6 w-6 text-white" />
    },
    {
      title: "Delegacias de Atendimento à Mulher (DEAM)",
      description: "15 unidades na Bahia. Em Salvador: Engenho Velho de Brotas e Periperi. Atendimento especializado para mulheres vítimas de violência.",
      contact: "(71) 3116-7000 / (71) 3117-8203",
      address: "Engenho Velho de Brotas e Periperi",
      icon: <UserCheck className="h-6 w-6 text-white" />
    },
    {
      title: "Coordenadoria Estadual das Mulheres",
      description: "Criada pelo TJ-BA, atende mulheres em situação de violência doméstica e intermedia com outros órgãos de apoio.",
      contact: "(71) 3372-1867/1895",
      address: "Centro Administrativo da Bahia - 5ª Avenida, nº 560",
      icon: <Scale className="h-6 w-6 text-white" />
    },
    {
      title: "TamoJuntas",
      description: "Organização que presta assessoria jurídica, psicológica, social e pedagógica gratuita para mulheres em situação de violência.",
      contact: "(71) 99185-4691",
      address: "Rua da Mangueira, nº 73, Nazaré",
      icon: <Users className="h-6 w-6 text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Conteúdo principal */}
      <div className="relative">
        {/* Header com parallax */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Partículas dinâmicas que respondem ao scroll */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  transform: `translateY(${scrollY * (0.1 + Math.random() * 0.3)}px) scale(1.02)`,
                  opacity: 0.2
                }}
              />
            ))}
          </div>

        {/* Botão voltar */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 z-50 flex items-center space-x-2 px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-600 hover:border-purple-500 transition-all duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Voltar</span>
        </button>

        {/* Conteúdo principal do header */}
        <div className={`relative z-10 text-center max-w-4xl mx-auto px-8 transform transition-all duration-1500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="mb-8">
            <Heart className="h-16 w-16 text-red-400 mx-auto mb-6 animate-pulse" fill="currentColor" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Serviços de Apoio
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Lista completa de serviços gratuitos de apoio jurídico e psicológico para mulheres vítimas de violência na Bahia
          </p>

          <div className="flex items-center justify-center space-x-2 text-purple-400">
            <Shield className="h-5 w-5" />
            <span className="text-lg font-medium">Apoio • Proteção • Justiça</span>
            <Shield className="h-5 w-5" />
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Seção de estatísticas com efeitos Rockstar Games */}
      <div className="py-8 relative overflow-hidden">
        {/* Background dinâmico que muda com o scroll */}
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(139, 92, 246, 0.2) 0%, transparent 60%),
              linear-gradient(135deg, 
                rgba(0, 0, 0, 0.8) 0%, 
                rgba(75, 0, 130, 0.2) 100%)
            `,
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        />
        
        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <h2 
            className="text-3xl md:text-4xl font-light mb-8 text-white transition-all duration-1000"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              opacity: 1
            }}
          >
            Você Não Está Sozinha
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { number: "15", label: "Delegacias especializadas na Bahia", icon: <Shield className="h-8 w-8" /> },
              { number: "31", label: "Cidades com CRAM ativo", icon: <Building className="h-8 w-8" /> },
              { number: "24h", label: "Atendimento disponível", icon: <Clock className="h-8 w-8" /> }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 group-hover:border-purple-500 transition-all duration-500">
                  <div className="text-purple-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seção única - serviços + emergência sem separação */}
      <div className="bg-gradient-to-b from-black via-slate-900/20 to-red-900/10">
        {/* Parte dos serviços */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
                Onde Buscar Ajuda
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Conheça todos os serviços disponíveis em Salvador e no interior da Bahia
              </p>
            </div>

            {/* Grid de serviços */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  {...service}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Parte da emergência - SEM SEPARAÇÃO */}
        <div className="py-8 relative overflow-hidden">
          {/* Background animado - mais sutil */}
          <div className="absolute inset-0">
            <div className="absolute inset-0">
              {Array.from({ length: 15 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-red-400 rounded-full opacity-30 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
            <div className="p-6 bg-gradient-to-br from-red-800/40 to-purple-800/40 rounded-3xl border border-red-500/50 backdrop-blur-sm relative overflow-hidden group">
              {/* Efeito de pulso de fundo */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-purple-600/10 rounded-3xl scale-0 group-hover:scale-100 transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Phone className="h-16 w-16 text-red-400 animate-pulse" />
                    {/* Ondas de emergência */}
                    <div className="absolute inset-0 rounded-full border-2 border-red-400/30 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-2 border-red-400/20 animate-ping" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 text-white">
                  Em Caso de Emergência
                </h3>
                <p className="text-xl text-gray-300 mb-6">
                  Se você está em situação de risco imediato, ligue para:
                </p>
                
                {/* Números de emergência com efeito especial */}
                <div className="flex justify-center space-x-8 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-400 mb-2 hover:scale-110 transition-transform cursor-pointer">
                      190
                    </div>
                    <p className="text-gray-400 text-sm">Polícia Militar</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2 hover:scale-110 transition-transform cursor-pointer">
                      180
                    </div>
                    <p className="text-gray-400 text-sm">Central da Mulher</p>
                  </div>
                </div>
                
                <div className="p-4 bg-black/30 rounded-xl">
                  <p className="text-gray-300 text-sm">
                    💡 <strong>Dica:</strong> Se não puder falar, faça uma ligação silenciosa para 190 e pressione 0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Footer com transição suave */}
        <footer className="py-8 bg-gradient-to-t from-slate-900 to-black border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <p className="text-gray-400 mb-4">
              Informações baseadas em dados do G1 Bahia e SPM - Secretaria de Políticas para as Mulheres
            </p>
            <div className="flex items-center justify-center space-x-2 text-purple-400">
              <Heart className="h-4 w-4" fill="currentColor" />
              <span>Salvador Não Esquece</span>
              <Heart className="h-4 w-4" fill="currentColor" />
            </div>
          </div>
        </footer>
      </div>

      {/* Estilos CSS customizados para efeitos Rockstar Games */}
      <style jsx>{`
        @keyframes slide-in-left {
          from { 
            opacity: 0; 
            transform: translateX(-100px) rotateY(-30deg);
            filter: blur(5px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0) rotateY(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes slide-in-right {
          from { 
            opacity: 0; 
            transform: translateX(100px) rotateY(30deg);
            filter: blur(5px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0) rotateY(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(60px) scale(0.8);
            filter: blur(8px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes zoom-in {
          from { 
            opacity: 0; 
            transform: scale(0.3) rotateZ(-10deg);
            filter: blur(10px);
          }
          to { 
            opacity: 1; 
            transform: scale(1) rotateZ(0deg);
            filter: blur(0px);
          }
        }
        
        @keyframes rotate-in {
          from { 
            opacity: 0; 
            transform: rotateY(90deg) scale(0.5);
            filter: blur(15px);
          }
          to { 
            opacity: 1; 
            transform: rotateY(0deg) scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes bounce-in {
          0% { 
            opacity: 0; 
            transform: translateY(-100px) scale(0.3);
            filter: blur(20px);
          }
          50% { 
            opacity: 0.8; 
            transform: translateY(20px) scale(1.1);
            filter: blur(5px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        
        .animate-slide-in-left { animation: slide-in-left 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-slide-in-right { animation: slide-in-right 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-fade-in-up { animation: fade-in-up 1.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-zoom-in { animation: zoom-in 1.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-rotate-in { animation: rotate-in 2s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-bounce-in { animation: bounce-in 2.2s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
      `}</style>
    </div>
  );
}