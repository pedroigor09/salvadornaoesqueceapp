"use client";

import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, MapPin } from "lucide-react";
import { Victim } from "@/types";

interface EpicMemorialCardProps {
  victim: Victim;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  gradient: string;
}

export function EpicMemorialCard({ victim, isHovered, onHover, onLeave, gradient }: EpicMemorialCardProps) {
  return (
    <div
      className={`
        relative group cursor-pointer transition-all duration-700 ease-out
        ${isHovered ? 'transform scale-105 z-20' : 'transform scale-100 z-10'}
      `}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Card com efeito 3D estilo Polaroid - tom sóbrio */}
      <div
        className={`
          relative h-96 rounded-2xl overflow-hidden transition-all duration-700 ease-out
          bg-gray-100 p-2 shadow-2xl
          ${isHovered 
            ? 'transform translate-y-[-10px] rotate-1 shadow-[0_35px_60px_-12px_rgba(0,0,0,0.8),0_0_40px_rgba(0,0,0,0.2)]' 
            : 'transform translate-y-0 rotate-0 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)]'
          }
        `}
      >
        {/* Frame interno da Polaroid */}
        <div className="relative h-full rounded-xl overflow-hidden bg-black">
          {/* Imagem de fundo se disponível - estilo memorial sóbrio */}
          {victim.image && (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700"
                style={{ 
                  backgroundImage: `url(${victim.image})`,
                  filter: 'grayscale(30%) sepia(5%) contrast(0.9) brightness(0.7)'
                }}
              />
              {/* Efeito memorial com degradê preto sóbrio */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/70" />
            </>
          )}
          
          {/* Fundo gradiente sóbrio para cards sem imagem */}
          {!victim.image && (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-95`} />
          )}
          
          {/* Overlay sutil para harmonia e respeito */}
          <div className={`absolute inset-0 ${victim.image ? 'bg-black/40' : 'bg-black/30'}`} />
          
          {/* Efeito de vinheta para profundidade memorial */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
          
          {/* Efeito de brilho sutil no hover */}
          <div 
            className={`
              absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 
              transition-opacity duration-500
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `} 
          />
          
          {/* Borda interna estilo memorial */}
          <div className="absolute inset-2 border border-white/15 rounded-xl" />
        
          {/* Conteúdo do card */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 text-white">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold leading-tight">{victim.name}</h3>
                  <div className="flex items-center gap-4 text-sm opacity-90">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(victim.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {victim.neighborhood}
                    </span>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {victim.age} anos
                </Badge>
              </div>
            </div>

            {/* Tributo */}
            <div className="space-y-4">
              <div 
                className={`
                  transition-all duration-500 ease-out
                  ${isHovered ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-70'}
                `}
              >
                <p className="text-lg leading-relaxed font-medium">
                  "{victim.tribute}"
                </p>
                {victim.submittedBy && (
                  <p className="text-sm mt-3 opacity-80 italic">
                    — {victim.submittedBy}
                  </p>
                )}
              </div>

              {/* Coração decorativo */}
              <div className="flex justify-center">
                <div 
                  className={`
                    transition-all duration-500
                    ${isHovered 
                      ? 'transform scale-110 rotate-12 text-white' 
                      : 'transform scale-100 rotate-0 text-white/60'
                    }
                  `}
                >
                  <Heart className="h-6 w-6 fill-current" />
                </div>
              </div>
            </div>
          </div>

          {/* Border sutil para memorial */}
          <div 
            className={`
              absolute inset-0 rounded-xl border-2 transition-all duration-500
              ${isHovered ? 'border-white/30' : 'border-white/10'}
            `} 
          />
        </div>
      </div>
    </div>
  );
}