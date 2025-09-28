"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { AddVictimModal } from "@/components/add-victim-modal";
import { useVictims } from "@/hooks/useVictims";
import { EpicMemorialCard } from "@/components/epic-memorial-card";
import { MemorialHeader } from "@/components/memorial-header";
import { MemorialStats } from "@/components/memorial-stats";
import { MemorialControls } from "@/components/memorial-controls";
import { MemorialCollaboration } from "@/components/memorial-collaboration";
import { VICTIM_GRADIENTS } from "@/constants/memorial";



export function MemorialContent() {
  const { victims, loading, error, addVictim } = useVictims();
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredVictims = victims.filter(victim => 
    victim.date.startsWith(selectedYear) && victim.isApproved
  );

  const availableYears = [...new Set(victims.map(v => v.date.split('-')[0]))].sort().reverse();

  const neighborhoodStats = victims.reduce((acc, victim) => {
    const neighborhood = victim.neighborhood;
    acc[neighborhood] = (acc[neighborhood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleAddVictim = async (victimData: any) => {
    const success = await addVictim({
      name: victimData.name,
      age: victimData.age,
      date: victimData.date,
      location: victimData.location,
      description: victimData.description,
      author: victimData.author,
      image: victimData.image
    });
    
    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="h-full relative text-white w-full overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.jpg)',
          filter: 'grayscale(20%) sepia(10%)'
        }}
      />
      
      {/* Multiple overlay gradients for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      
      {/* Dynamic overlay com blur nos cards não hovereados */}
      <div 
        className={`
          absolute inset-0 transition-all duration-700 z-10
          ${hoveredCard ? 'backdrop-blur-sm bg-black/60' : 'backdrop-blur-none bg-transparent'}
        `}
      />

      <div className="relative z-20 py-8 px-6 w-full h-full overflow-y-auto">
        {/* Header */}
        <MemorialHeader />

        {/* Estatísticas */}
        <MemorialStats 
          victims={victims}
          filteredVictims={filteredVictims}
          selectedYear={selectedYear}
          neighborhoodStats={neighborhoodStats}
        />

        {/* Controles */}
        <MemorialControls
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          availableYears={availableYears}
          onAddClick={() => setIsModalOpen(true)}
        />

        {/* Grid de vítimas */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center space-x-3 text-white">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-lg">Carregando memorial...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center space-y-4">
                <p className="text-red-400 text-lg">Erro ao carregar o memorial</p>
                <p className="text-gray-300 text-sm">{error}</p>
              </div>
            </div>
          ) : filteredVictims.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredVictims.map((victim, index) => (
                <div
                  key={victim.id}
                  className={`
                    transition-all duration-700 ease-out
                    ${hoveredCard && hoveredCard !== victim.id 
                      ? 'opacity-30 blur-sm scale-95' 
                      : 'opacity-100 blur-none scale-100'
                    }
                  `}
                >
                  <EpicMemorialCard
                    victim={victim}
                    isHovered={hoveredCard === victim.id}
                    onHover={() => setHoveredCard(victim.id)}
                    onLeave={() => setHoveredCard(null)}
                    gradient={VICTIM_GRADIENTS[index % VICTIM_GRADIENTS.length]}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-gray-500 mx-auto mb-6" />
              <p className="text-xl text-gray-400">
                Nenhuma vítima registrada para {selectedYear}
              </p>
            </div>
          )}
        </div>

        {/* Colaboração */}
        <MemorialCollaboration />
      </div>

      {/* Modal para adicionar vítima */}
      <AddVictimModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddVictim}
      />
    </div>
  );
}