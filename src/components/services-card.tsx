"use client";

import { Users } from "lucide-react";

interface ServicesCardProps {
  onShowServices?: () => void;
}

export function ServicesCard({ onShowServices }: ServicesCardProps) {
  if (!onShowServices) return null;

  return (
    <div className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-red-900/50 rounded-2xl p-4 md:p-6 border border-purple-500/30 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="p-3 md:p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">
              Serviços de Apoio às Mulheres
            </h3>
            <p className="text-gray-300 text-sm md:text-base">
              Encontre ajuda jurídica e psicológica gratuita na Bahia
            </p>
          </div>
        </div>
        <button
          onClick={onShowServices}
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium hover:scale-105"
        >
          Ver Serviços
        </button>
      </div>
    </div>
  );
}