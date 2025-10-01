"use client";

import { HopeMessage } from "./hope-message";
import { PositiveStory } from "./positive-story";
import { SupportIndicators } from "./support-indicators";
import { ActionCall } from "./action-call";

interface HumanizedSectionProps {
  totalVictims: number;
  reduction?: number;
  onShowServices?: () => void;
}

export function HumanizedSection({ 
  totalVictims, 
  reduction, 
  onShowServices 
}: HumanizedSectionProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mensagem de esperança */}
      <HopeMessage totalVictims={totalVictims} reduction={reduction} />
      
      {/* Grid com história positiva e indicadores de apoio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <PositiveStory />
        </div>
        
        <div className="space-y-4">
          <SupportIndicators />
        </div>
      </div>
      
      {/* Chamado à ação */}
      <ActionCall onShowServices={onShowServices} />
    </div>
  );
}