"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Star } from "lucide-react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

function TypewriterText({ text, speed = 50, onComplete, className = "" }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      setTimeout(onComplete, 1000);
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-red-400">|</span>
      )}
    </span>
  );
}

// Pontos de conexão para as estrelas/partículas
const CONNECTION_POINTS = [
  { x: 15, y: 25, delay: 0 },
  { x: 30, y: 15, delay: 0.5 },
  { x: 45, y: 35, delay: 1 },
  { x: 60, y: 20, delay: 1.5 },
  { x: 75, y: 40, delay: 2 },
  { x: 85, y: 25, delay: 2.5 },
  { x: 20, y: 60, delay: 3 },
  { x: 50, y: 70, delay: 3.5 },
  { x: 80, y: 65, delay: 4 },
];

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  isDrawn: boolean;
  delay: number;
}

function ConnectionLine({ from, to, isDrawn, delay }: ConnectionLineProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (isDrawn) {
      const timer = setTimeout(() => {
        setProgress(1);
      }, delay * 1200); // Aumentei o delay para ser mais visível
      
      return () => clearTimeout(timer);
    } else {
      // Reset quando não deve ser desenhada
      setProgress(0);
    }
  }, [isDrawn, delay]);

  const pathData = `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${Math.min(from.y, to.y) - 20} ${to.x} ${to.y}`;
  
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
        <filter id="connectionGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d={pathData}
        stroke="url(#connectionGradient)"
        strokeWidth="1"
        fill="none"
        filter="url(#connectionGlow)"
        strokeDasharray="300"
        strokeDashoffset={300 * (1 - progress)}
        opacity={isDrawn ? 1 : 0}
        style={{
          transition: 'stroke-dashoffset 2s ease-in-out, opacity 0.5s ease-in-out'
        }}
      />
    </svg>
  );
}

interface FloatingPointProps {
  point: typeof CONNECTION_POINTS[0];
  index: number;
}

function FloatingPoint({ point, index }: FloatingPointProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, point.delay * 1000);
    
    return () => clearTimeout(timer);
  }, [point.delay]);

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
      }}
    >
      {/* Pulso de energia */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)',
          width: '30px',
          height: '30px',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%'
        }}
      />
      
      {/* Ponto principal */}
      <div className="relative w-2 h-2 rounded-full bg-white opacity-80 animate-pulse">
        {/* Estrela ocasional */}
        {index % 3 === 0 && (
          <Star 
            className="absolute -top-1 -left-1 h-4 w-4 text-white opacity-60 animate-spin" 
            style={{ animationDuration: '4s' }}
          />
        )}
      </div>
    </div>
  );
}

interface MainIntroProps {
  onComplete: () => void;
}

export function MainIntro({ onComplete }: MainIntroProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [activeConnections, setActiveConnections] = useState<Set<number>>(new Set());
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const messages = [
    "Cada número aqui era uma vida.",
    "Lembrar é resistir.",  
    "Salvador não esquece.",
    "Este é um espaço de memória, não de esquecimento.",
    "Aqui, cada história importa. Cada vida teve valor.",
    "Sejam bem-vindos a um lugar de acolhimento e reflexão."
  ];

  const handlePhaseComplete = () => {
    if (currentPhase < messages.length - 1) {
      // Ativar conexão atual primeiro
      setActiveConnections(prev => new Set([...prev, currentPhase]));
      
      setTimeout(() => {
        setCurrentPhase(prev => prev + 1);
      }, 1500);
    } else {
      // Ativar todas as conexões restantes no final
      setActiveConnections(new Set(Array.from({ length: CONNECTION_POINTS.length - 1 }, (_, i) => i)));
      setShowHearts(true);
      setTimeout(() => {
        // Iniciar animação de saída
        setIsExiting(true);
        // Completar após o fade-out
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 3000);
    }
  };

  // Ativar a primeira conexão automaticamente após um delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveConnections(new Set([0]));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Listener para tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Iniciar animação de saída
        setIsExiting(true);
        // Completar após o fade-out
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden transition-opacity duration-1000 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background com gradiente sóbrio */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(17, 24, 39, 0.9) 100%)
          `
        }}
      />

      {/* Pontos flutuantes conectados */}
      <div className="absolute inset-0">
        {CONNECTION_POINTS.map((point, index) => (
          <FloatingPoint
            key={index}
            point={point}
            index={index}
          />
        ))}
        
        {/* Linhas de conexão */}
        {CONNECTION_POINTS.slice(0, -1).map((point, index) => {
          const nextPoint = CONNECTION_POINTS[index + 1];
          const containerWidth = containerRef.current?.offsetWidth || 1000;
          const containerHeight = containerRef.current?.offsetHeight || 800;
          
          return (
            <ConnectionLine
              key={`connection-${index}`}
              from={{
                x: (point.x / 100) * containerWidth,
                y: (point.y / 100) * containerHeight
              }}
              to={{
                x: (nextPoint.x / 100) * containerWidth,
                y: (nextPoint.y / 100) * containerHeight
              }}
              isDrawn={activeConnections.has(index)}
              delay={index}
            />
          );
        })}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        {/* Ícone central */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <Heart 
              className={`h-16 w-16 text-red-400 transition-all duration-1000 ${
                showHearts ? 'scale-125 animate-pulse' : 'scale-100'
              }`} 
              fill="currentColor"
            />
            {showHearts && (
              <>
                <Star className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-spin" fill="currentColor" />
                <Star className="absolute -bottom-2 -left-2 h-4 w-4 text-blue-400 animate-bounce" fill="currentColor" />
              </>
            )}
          </div>
        </div>

        {/* Mensagens com efeito typewriter */}
        <div className="space-y-8 min-h-[400px] flex flex-col justify-center">
          {messages.map((message, index) => (
            <div key={index} className={`transition-opacity duration-1000 ${
              index <= currentPhase ? 'opacity-100' : 'opacity-0'
            }`}>
              {index === currentPhase ? (
                <TypewriterText
                  text={message}
                  speed={80}
                  onComplete={handlePhaseComplete}
                  className="text-2xl md:text-3xl font-light text-white leading-relaxed block"
                />
              ) : index < currentPhase ? (
                <p className="text-2xl md:text-3xl font-light text-white leading-relaxed opacity-60">
                  {message}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        {/* Indicador de progresso sutil */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index <= currentPhase ? 'bg-red-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dica sobre pular - fixo na parte inferior */}
        {!showHearts && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[60]">
            <p className="text-gray-500 text-xs text-center">
              Pressione <kbd className="px-1 py-0.5 bg-gray-800 rounded text-gray-300">ESC</kbd> para continuar
            </p>
          </div>
        )}

        {/* Mensagem de continuação */}
        {showHearts && !isExiting && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-fade-in">
            <p className="text-gray-400 text-sm italic">
              Entrando no Salvador Não Esquece...
            </p>
          </div>
        )}

        {/* Mensagem de transição */}
        {isExiting && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-fade-in">
            <p className="text-gray-300 text-base font-light">
              Carregando memorial...
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in-out;
        }
      `}</style>
    </div>
  );
}