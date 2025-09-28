"use client";

import { useState, useEffect } from "react";
import { Heart, Shield, ArrowLeft } from "lucide-react";

interface ServicesHeaderProps {
  onBack?: () => void;
  scrollY: number;
}

export function ServicesHeader({ onBack, scrollY }: ServicesHeaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
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
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-8 left-8 z-50 flex items-center space-x-2 px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-600 hover:border-purple-500 transition-all duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Voltar</span>
        </button>
      )}

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
  );
}