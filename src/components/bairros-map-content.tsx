"use client";

import { useState, useCallback, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

// Types
import { BairroData, BairroInfo, VictimLight } from '@/types/bairros';

// Components
import { MapComponent } from './map-component';
import { BairroCard } from './bairro-card';
import { BairrosList } from './bairros-list';
import { InfoPanel } from './info-panel';
import { MapHeader } from './map-header';

// Utils
import { fetchRealViolenceData, calculateBairrosData, generateVictimLights } from '@/utils/bairros-utils';

// Declaração dos tipos do Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

export function BairrosMapContent() {
  const [selectedBairro, setSelectedBairro] = useState<BairroInfo | null>(null);
  const [showVictimLights, setShowVictimLights] = useState(false);
  const [victimLights, setVictimLights] = useState<VictimLight[]>([]);
  const [bairrosData, setBairrosData] = useState<BairroData[]>(calculateBairrosData(161));

  const center = {
    lat: -12.9500,
    lng: -38.4800
  };

  // Carrega dados reais do CSV e atualiza os bairros
  useEffect(() => {
    const loadRealData = async () => {
      const totalHomicidios = await fetchRealViolenceData();
      const novosDados = calculateBairrosData(totalHomicidios);
      setBairrosData(novosDados);
      
      // Regenera os pontos de luz com os dados atualizados
      setVictimLights(generateVictimLights(novosDados));
    };

    loadRealData();
  }, []);

  const handleMarkerClick = useCallback((bairro: BairroInfo) => {
    setSelectedBairro(bairro);
  }, []);

  const toggleVictimLights = useCallback(() => {
    setShowVictimLights(prev => !prev);
  }, []);

  return (
    <div className="h-full space-y-6">
      {/* Header */}
      <MapHeader 
        showVictimLights={showVictimLights}
        onToggleVictimLights={toggleVictimLights}
      />

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-100px)]">
        {/* Mapa */}
        <div className="lg:col-span-2 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <Wrapper apiKey="AIzaSyCXlnYAEgr2kdEgSfE3nf2TpOUK90Aa4Xk">
            <MapComponent
              center={center}
              zoom={12}
              onMarkerClick={handleMarkerClick}
              selectedBairro={selectedBairro}
              showVictimLights={showVictimLights}
              victimLights={victimLights}
              bairrosData={bairrosData}
            />
          </Wrapper>
        </div>

        {/* Painel lateral */}
        <div className="space-y-6">
          {selectedBairro ? (
            <BairroCard bairro={selectedBairro} />
          ) : (
            <InfoPanel 
              showVictimLights={showVictimLights}
              victimLights={victimLights}
            />
          )}

          {/* Lista de bairros */}
          <BairrosList 
            bairrosData={bairrosData}
            selectedBairro={selectedBairro}
            onBairroSelect={setSelectedBairro}
          />
        </div>
      </div>
    </div>
  );
}