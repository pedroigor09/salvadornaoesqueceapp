"use client";

import { useState, useEffect } from "react";
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
        <span className="animate-pulse text-purple-400">|</span>
      )}
    </span>
  );
}

interface MemorialIntroProps {
  onComplete: () => void;
}

export function MemorialIntro({ onComplete }: MemorialIntroProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [particles, setParticles] = useState<Array<{left: number, top: number, duration: number}>>([]);
  const [hearts, setHearts] = useState<Array<{left: number, top: number, delay: number, duration: number, size: number}>>([]);

  const messages = [
    "Em memória de cada vida perdida...",
    "Que suas histórias jamais sejam esquecidas...",
    "Salvador carrega suas memórias no coração...",
    "Cada nome, cada rosto, cada sonho interrompido...",
    "Vive eternamente em nossa lembrança."
  ];

  const handlePhaseComplete = () => {
    if (currentPhase < messages.length - 1) {
      setTimeout(() => {
        setCurrentPhase(prev => prev + 1);
      }, 1500);
    } else {
      setShowHearts(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  // Gerar partículas e corações apenas no cliente
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 4
    }));
    setParticles(newParticles);
    
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: i * 0.1,
      duration: 2 + Math.random(),
      size: 12 + Math.random() * 8
    }));
    setHearts(newHearts);
  }, []);

  // Adicionar listener para tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
      {/* Background com efeito de profundidade */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(17, 24, 39, 0.9) 100%)
          `
        }}
      />

      {/* Partículas de luz flutuando */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="memorial-particle absolute w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
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

        {/* Efeito final com corações */}
        {showHearts && (
          <div className="absolute inset-0 pointer-events-none">
            {hearts.map((heart, i) => (
              <Heart
                key={i}
                className="absolute text-red-400 animate-bounce opacity-70"
                style={{
                  left: `${heart.left}%`,
                  top: `${heart.top}%`,
                  animationDelay: `${heart.delay}s`,
                  animationDuration: `${heart.duration}s`,
                  fontSize: `${heart.size}px`
                }}
                fill="currentColor"
              />
            ))}
          </div>
        )}

        {/* Indicador de progresso sutil */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  index <= currentPhase ? 'bg-purple-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dica sobre pular */}
        {!showHearts && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <p className="text-gray-500 text-xs text-center">
              Pressione <kbd className="px-1 py-0.5 bg-gray-800 rounded text-gray-300">ESC</kbd> ou clique em "Pular" para continuar
            </p>
          </div>
        )}

        {/* Botão de pular */}
        <div className="absolute top-6 right-6">
          <button
            onClick={onComplete}
            className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-all duration-300 hover:bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700/30 hover:border-gray-600"
          >
            Pular →
          </button>
        </div>

        {/* Mensagem de continuação */}
        {showHearts && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-fade-in">
            <p className="text-gray-400 text-sm italic">
              Entrando no memorial...
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