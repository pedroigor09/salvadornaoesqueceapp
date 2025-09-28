"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, Heart, Users, MapPin, Quote } from "lucide-react";

// Dados da linha do tempo (baseados em dados reais de Salvador)
const TIMELINE_DATA = [
  {
    year: 2018,
    deaths: 1245,
    phrase: "Cada vida perdida ecoa pela eternidade...",
    description: "O ano que marcou o início de nossa jornada de memória",
    color: "#8B5CF6",
    position: { x: 10, y: 20 }
  },
  {
    year: 2019,
    deaths: 1189,
    phrase: "Em cada lágrima, uma história interrompida...",
    description: "Famílias destroçadas, sonhos interrompidos",
    color: "#EC4899",
    position: { x: 25, y: 35 }
  },
  {
    year: 2020,
    deaths: 1067,
    phrase: "O silêncio que grita mais alto...",
    description: "Pandemia e violência: dupla tragédia",
    color: "#EF4444",
    position: { x: 40, y: 25 }
  },
  {
    year: 2021,
    deaths: 1156,
    phrase: "Corações que pararam de bater...",
    description: "A dor que não encontra palavras",
    color: "#F59E0B",
    position: { x: 55, y: 40 }
  },
  {
    year: 2022,
    deaths: 1089,
    phrase: "Memórias que jamais se apagarão...",
    description: "Resistindo ao esquecimento",
    color: "#10B981",
    position: { x: 70, y: 30 }
  },
  {
    year: 2023,
    deaths: 945,
    phrase: "A esperança ainda pulsa...",
    description: "Caminhos para um futuro melhor",
    color: "#3B82F6",
    position: { x: 85, y: 45 }
  }
];

interface TimelinePointProps {
  data: typeof TIMELINE_DATA[0];
  isActive: boolean;
  isVisited: boolean;
  onClick: () => void;
  delay: number;
}

function TimelinePoint({ data, isActive, isVisited, onClick, delay }: TimelinePointProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 800);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 cursor-pointer ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
      style={{
        left: `${data.position.x}%`,
        top: `${data.position.y}%`,
        filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))'
      }}
      onClick={onClick}
    >
      {/* Pulso de energia */}
      <div
        className={`absolute inset-0 rounded-full animate-pulse ${
          isActive ? 'scale-150' : 'scale-100'
        }`}
        style={{
          background: `radial-gradient(circle, ${data.color}40, transparent 70%)`,
          width: '60px',
          height: '60px',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%'
        }}
      />
      
      {/* Ponto principal */}
      <div
        className={`relative w-6 h-6 rounded-full border-2 border-white transition-all duration-500 ${
          isActive ? 'scale-125 animate-bounce' : 'scale-100'
        } ${isVisited ? 'opacity-100' : 'opacity-70'}`}
        style={{
          backgroundColor: data.color,
          boxShadow: `0 0 20px ${data.color}80`
        }}
      >
        {/* Ano no centro */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold whitespace-nowrap">
          {data.year}
        </div>
        
        {/* Número de mortes */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold whitespace-nowrap bg-black/50 px-2 py-1 rounded">
          {data.deaths} vidas
        </div>
      </div>
    </div>
  );
}

interface PathLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  isDrawn: boolean;
  delay: number;
}

function PathLine({ from, to, isDrawn, delay }: PathLineProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (isDrawn) {
      const timer = setTimeout(() => {
        setProgress(1);
      }, delay * 800);
      
      return () => clearTimeout(timer);
    }
  }, [isDrawn, delay]);

  const pathData = `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${Math.min(from.y, to.y) - 5} ${to.x} ${to.y}`;
  
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#EC4899" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d={pathData}
        stroke="url(#pathGradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow)"
        strokeDasharray="1000"
        strokeDashoffset={1000 * (1 - progress)}
        style={{
          transition: 'stroke-dashoffset 2s ease-in-out'
        }}
      />
    </svg>
  );
}

function FloatingPhrase({ phrase, isVisible }: { phrase: string; isVisible: boolean }) {
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 transition-all duration-2000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 max-w-2xl">
        <Quote className="h-8 w-8 text-purple-400 mx-auto mb-4" />
        <p className="text-white text-2xl font-light italic leading-relaxed">
          {phrase}
        </p>
      </div>
    </div>
  );
}

export function TimelineContent() {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [visitedPoints, setVisitedPoints] = useState<Set<number>>(new Set());
  const [showPhrase, setShowPhrase] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [particles, setParticles] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Gerar partículas apenas no cliente
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  const handlePointClick = (index: number) => {
    setActivePoint(index);
    setVisitedPoints(prev => new Set([...prev, index]));
    setCurrentPhrase(TIMELINE_DATA[index].phrase);
    setShowPhrase(true);
    
    setTimeout(() => setShowPhrase(false), 4000);
  };

  return (
    <div className="h-full relative overflow-hidden" ref={containerRef}>
      {/* Background com efeito de profundidade */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(17, 24, 39, 0.9) 100%)
          `
        }}
      />
      
      {/* Partículas flutuantes */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Linha do Tempo da Dor
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Uma jornada através dos anos, honrando cada vida perdida em Salvador. 
            Clique nos pontos para trilhar este caminho de memória e reflexão.
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative flex-1 min-h-[600px]" style={{ zIndex: 2 }}>
        {/* Linhas conectoras */}
        {TIMELINE_DATA.slice(0, -1).map((data, index) => (
          <PathLine
            key={`path-${index}`}
            from={{
              x: (data.position.x / 100) * (containerRef.current?.offsetWidth || 1000),
              y: (data.position.y / 100) * 600
            }}
            to={{
              x: (TIMELINE_DATA[index + 1].position.x / 100) * (containerRef.current?.offsetWidth || 1000),
              y: (TIMELINE_DATA[index + 1].position.y / 100) * 600
            }}
            isDrawn={visitedPoints.has(index) || visitedPoints.has(index + 1)}
            delay={index}
          />
        ))}
        
        {/* Pontos da timeline */}
        {TIMELINE_DATA.map((data, index) => (
          <TimelinePoint
            key={data.year}
            data={data}
            isActive={activePoint === index}
            isVisited={visitedPoints.has(index)}
            onClick={() => handlePointClick(index)}
            delay={index}
          />
        ))}
      </div>

      {/* Painel de informações */}
      {activePoint !== null && (
        <div className="absolute bottom-8 left-8 right-8 bg-gray-900/90 backdrop-blur-lg rounded-xl p-6 border border-gray-700 z-30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Ano</p>
                <p className="text-white text-xl font-bold">{TIMELINE_DATA[activePoint].year}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Heart className="h-6 w-6 text-red-400" />
              <div>
                <p className="text-gray-400 text-sm">Vidas Perdidas</p>
                <p className="text-white text-xl font-bold">{TIMELINE_DATA[activePoint].deaths}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Contexto</p>
                <p className="text-white text-sm">{TIMELINE_DATA[activePoint].description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Frase flutuante */}
      <FloatingPhrase phrase={currentPhrase} isVisible={showPhrase} />

      {/* Estatísticas gerais */}
      <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-lg rounded-xl p-4 border border-gray-700 z-20">
        <div className="text-center">
          <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
          <p className="text-gray-400 text-xs">Total de Vidas</p>
          <p className="text-white text-2xl font-bold">
            {TIMELINE_DATA.reduce((sum, data) => sum + data.deaths, 0).toLocaleString('pt-BR')}
          </p>
          <p className="text-gray-400 text-xs mt-2">2018 - 2023</p>
        </div>
      </div>
    </div>
  );
}