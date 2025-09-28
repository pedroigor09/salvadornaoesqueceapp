import { Info } from "lucide-react";
import { VictimLight } from '@/types/bairros';

interface InfoPanelProps {
  showVictimLights: boolean;
  victimLights: VictimLight[];
}

export function InfoPanel({ showVictimLights, victimLights }: InfoPanelProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
      <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-white text-lg font-semibold mb-2">
        {showVictimLights ? 'Luzes da Memória' : 'Selecione um Bairro'}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {showVictimLights 
          ? `${victimLights.length} pontos de luz iluminam Salvador. Cada luz representa uma vida que se apagou, mas sua memória permanece brilhando.`
          : 'Clique em um marcador no mapa para ver informações detalhadas sobre o bairro.'
        }
      </p>
      {showVictimLights && (
        <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <p className="text-yellow-300 text-xs italic">
            "Salvador se ilumina de pontos, mas cada ponto é uma vida apagada"
          </p>
        </div>
      )}
    </div>
  );
}