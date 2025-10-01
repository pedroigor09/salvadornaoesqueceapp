"use client";

import { Heart, TrendingDown } from "lucide-react";

interface HopeMessageProps {
  totalVictims: number;
  reduction?: number;
}

export function HopeMessage({ totalVictims, reduction }: HopeMessageProps) {
  const messages = [
    "Cada vida importa. Vamos juntos mudar essa curva.",
    "Juntos podemos construir uma Salvador mais segura.",
    "A mudança começa com pequenos gestos de cuidado.",
    "Cada ação conta na construção de um futuro melhor.",
    "Salvador não esquece, Salvador transforma."
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 rounded-xl p-4 md:p-6 border border-blue-500/20 backdrop-blur-sm">
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
          <Heart className="h-5 w-5 md:h-6 md:w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-white text-base md:text-lg font-semibold mb-1">
            {randomMessage}
          </h3>
          {reduction && reduction > 0 && (
            <div className="flex items-center space-x-2 text-green-400">
              <TrendingDown className="h-4 w-4" />
              <p className="text-sm">
                São {reduction} famílias que não precisaram chorar este ano
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}