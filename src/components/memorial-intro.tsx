"use client";

import { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { MemorialTypewriterText } from "./memorial-typewriter-text";
import { MemorialProgressIndicator } from "./memorial-progress-indicator";

interface MemorialIntroProps {
  onComplete: () => void;
}

export function MemorialIntro({ onComplete }: MemorialIntroProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
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
    if (autoAdvance) {
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

  // Adicionar listeners para teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onComplete();
      } else if (event.key === 'ArrowRight') {
        // Desabilitar avanço automático ao usar navegação manual
        setAutoAdvance(false);
        // Avançar para próxima fase
        if (currentPhase < messages.length - 1) {
          setCurrentPhase(prev => prev + 1);
        } else if (!showHearts) {
          setShowHearts(true);
          setTimeout(() => {
            onComplete();
          }, 3000);
        }
      } else if (event.key === 'ArrowLeft') {
        // Desabilitar avanço automático ao usar navegação manual
        setAutoAdvance(false);
        // Voltar para fase anterior
        if (currentPhase > 0) {
          setCurrentPhase(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onComplete, currentPhase, showHearts, messages.length]);

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
                <MemorialTypewriterText
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

        {/* Dicas de navegação - fixo na parte inferior */}
        {!showHearts && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            {/* Indicador de progresso acima das dicas */}
            <div className="mb-4">
              <MemorialProgressIndicator 
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
                Pular para o memorial
              </p>
            </div>
          </div>
        )}

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