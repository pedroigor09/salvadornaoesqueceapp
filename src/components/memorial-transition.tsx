'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';

interface MemorialTransitionProps {
  onComplete: () => void;
  duration?: number;
}

export function MemorialTransition({ onComplete, duration = 16000 }: MemorialTransitionProps) {
  const [phase, setPhase] = useState<'entering' | 'showing' | 'transitioning' | 'second-showing' | 'exiting'>('entering');
  const [opacity, setOpacity] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState<'danilo' | 'jucilene'>('danilo');

  useEffect(() => {
    const timeline = [
      // Primeira foto (Danilo)
      { delay: 500, action: () => setOpacity(1) },
      { delay: 2500, action: () => setPhase('showing') },
      
      // Transição para segunda foto
      { delay: 6500, action: () => setPhase('transitioning') },
      { delay: 7000, action: () => setOpacity(0) },
      { delay: 8000, action: () => {
        setCurrentPhoto('jucilene');
        setOpacity(1);
      }},
      { delay: 8500, action: () => setPhase('second-showing') },
      
      // Saída final
      { delay: 13000, action: () => setPhase('exiting') },
      { delay: 13500, action: () => setOpacity(0) },
      { delay: duration, action: onComplete }
    ];

    const timers = timeline.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete, duration]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background com blur e degradê */}
      <div className="absolute inset-0">
        {/* Imagem de fundo com blur */}
        <div className="absolute inset-0 opacity-20 transition-all duration-2000">
          <Image
            src={currentPhoto === 'danilo' ? "/danilo2.png" : "/jucilena.png"}
            alt=""
            fill
            className="object-cover filter blur-3xl grayscale"
            priority
          />
        </div>
        
        {/* Degradê overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/95 to-black" />
        
        {/* Particles de luz suaves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <Star className="w-1 h-1 text-white opacity-30" />
            </div>
          ))}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center px-8">
        {/* Polaroid Container */}
        <div 
          className="relative mx-auto mb-8 transition-all duration-2000 ease-out"
          style={{
            opacity,
            transform: `translateY(${opacity === 1 ? '0' : '30px'}) scale(${opacity === 1 ? '1' : '0.9'})`
          }}
        >
          {/* Polaroid Frame */}
          <div className="bg-white p-4 pb-12 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-1000 max-w-sm mx-auto">
            <div className="relative w-72 h-72 mx-auto overflow-hidden bg-gray-100">
              <Image
                src={currentPhoto === 'danilo' ? "/danilo2.png" : "/jucilena.png"}
                alt="Em memória"
                fill
                className="object-cover filter grayscale-0 transition-all duration-2000"
                priority
              />
              
              {/* Overlay respeitoso */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              
              {/* Efeito de luz suave */}
              <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
            </div>
            
            {/* Texto na parte inferior do polaroid */}
            <div className="mt-3 text-center">
              <p className="text-gray-700 font-handwriting text-base">
                {currentPhoto === 'danilo' 
                  ? "Para sempre em nossos corações" 
                  : "Sua luz continua a brilhar"
                }
              </p>
            </div>
          </div>

          {/* Múltiplas sombras para profundidade */}
          <div className="absolute inset-0 bg-black/15 transform translate-x-1 translate-y-1 -z-10 blur-sm max-w-sm mx-auto" />
          <div className="absolute inset-0 bg-black/10 transform translate-x-2 translate-y-2 -z-20 blur-md max-w-sm mx-auto" />
        </div>

        {/* Texto memorial */}
        <div 
          className="space-y-4 transition-all duration-2000 delay-1000"
          style={{
            opacity: (phase === 'showing' || phase === 'second-showing') ? 1 : 0,
            transform: `translateY(${(phase === 'showing' || phase === 'second-showing') ? '0' : '20px'})`
          }}
        >
          <div className="flex justify-center mb-4">
            <Heart className="w-8 h-8 text-red-400 animate-pulse" />
          </div>
          
          <h2 className="text-3xl font-light text-white mb-3">
            Em memória de cada vida perdida
          </h2>
          
          <p className="text-gray-300 max-w-lg mx-auto leading-relaxed text-lg">
            {currentPhoto === 'danilo' ? (
              <>
                Cada sorriso, cada sonho, cada momento vivido.<br />
                Suas histórias continuam vivas em nossos corações.
              </>
            ) : (
              <>
                Vidas que tocaram tantas outras,<br />
                deixando marcas de amor e saudade.
              </>
            )}
          </p>

          {/* Indicador de progresso */}
          <div className="flex justify-center mt-8 space-x-2">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentPhoto === 'danilo' ? 'bg-white' : 'bg-white/40'
              }`}
            />
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentPhoto === 'jucilene' ? 'bg-white' : 'bg-white/40'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Efeito de fade-out final */}
      {phase === 'exiting' && (
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-2000"
          style={{ opacity: phase === 'exiting' ? 1 : 0 }}
        />
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400&display=swap');
        
        .font-handwriting {
          font-family: 'Kalam', cursive;
        }
        
        .duration-2000 {
          transition-duration: 2000ms;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
        
        @keyframes gentlePulse {
          0%, 100% { 
            opacity: 0.8;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.02);
          }
        }
        
        .animate-gentle-pulse {
          animation: gentlePulse 4s ease-in-out infinite;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}