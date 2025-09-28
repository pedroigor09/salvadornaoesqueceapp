"use client";

import { Phone } from "lucide-react";

export function EmergencySection() {
  return (
    <div className="py-8 relative overflow-hidden bg-gradient-to-b from-red-900/5 via-red-900/20 to-black">
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
  );
}