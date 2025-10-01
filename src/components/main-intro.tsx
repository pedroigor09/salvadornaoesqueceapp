"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Star } from "lucide-react";
import { TypewriterText } from "./typewriter-text";
import { ConnectionLine } from "./connection-line";
import { FloatingPoint } from "./floating-point";
import { ProgressIndicator } from "./progress-indicator";

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

interface MainIntroProps {
  onComplete: () => void;
}

export function MainIntro({ onComplete }: MainIntroProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
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
    if (autoAdvance) {
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
          setTimeout(() => {
            onComplete();
          }, 2000);
        }, 3000);
      }
    }
  };
        
  // Ativar a primeira conexão automaticamente após um delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveConnections(new Set([0]));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Listeners para teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Iniciar animação de saída
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      } else if (event.key === 'ArrowRight') {
        // Desabilitar avanço automático ao usar navegação manual
        setAutoAdvance(false);
        // Avançar para próxima fase
        if (currentPhase < messages.length - 1) {
          setActiveConnections(prev => new Set([...prev, currentPhase]));
          setCurrentPhase(prev => prev + 1);
        } else if (!showHearts) {
          setActiveConnections(new Set(Array.from({ length: CONNECTION_POINTS.length - 1 }, (_, i) => i)));
          setShowHearts(true);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              onComplete();
            }, 2000);
          }, 3000);
        }
      } else if (event.key === 'ArrowLeft') {
        // Desabilitar avanço automático ao usar navegação manual
        setAutoAdvance(false);
        // Voltar para fase anterior
        if (currentPhase > 0) {
          setCurrentPhase(prev => prev - 1);
          // Remover a última conexão ativa
          setActiveConnections(prev => {
            const newSet = new Set(prev);
            newSet.delete(currentPhase - 1);
            return newSet;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onComplete, currentPhase, showHearts, messages.length]);

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
                  key={`${currentPhase}-${autoAdvance}`}
                  text={message}
                  speed={80}
                  onComplete={handlePhaseComplete}
                  className="text-2xl md:text-3xl font-light text-white leading-relaxed block"
                />
              ) : index < currentPhase ? (
                <p className="text-2xl md:text-3xl font-light text-white leading-relaxed opacity-60 font-[family-name:var(--font-poppins)]">
                  {message}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        {/* Dicas de navegação - fixo na parte inferior */}
        {!showHearts && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[60]">
            {/* Indicador de progresso acima das dicas */}
            <div className="mb-4">
              <ProgressIndicator 
                currentPhase={currentPhase} 
                totalPhases={messages.length} 
              />
            </div>
            
            <div className="text-center space-y-2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-gray-400 text-xs">
                <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300 mr-1">←</kbd>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300 mr-2">→</kbd>
                Navegar entre mensagens
              </p>
              <p className="text-gray-400 text-xs">
                <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300 mr-2">ESC</kbd>
                Pular para o app
              </p>
            </div>
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