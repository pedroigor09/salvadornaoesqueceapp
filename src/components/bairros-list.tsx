import { BairroData, BairroInfo } from '@/types/bairros';

interface BairrosListProps {
  bairrosData: BairroData[];
  selectedBairro: BairroInfo | null;
  onBairroSelect: (bairro: BairroInfo) => void;
}

export function BairrosList({ bairrosData, selectedBairro, onBairroSelect }: BairrosListProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h3 className="text-white text-lg font-semibold mb-4">
        Bairros Monitorados
      </h3>
      <div className="space-y-3">
        {bairrosData.map((bairro) => (
          <button
            key={bairro.id}
            onClick={() => onBairroSelect(bairro)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
              selectedBairro?.id === bairro.id
                ? 'bg-blue-600/20 border border-blue-600/30'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{bairro.name}</p>
                <p className="text-gray-400 text-xs">
                  {bairro.homicidios} homicídios
                </p>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                bairro.nivel === 'alto' ? 'bg-red-500' : 
                bairro.nivel === 'medio' ? 'bg-yellow-500' : 'bg-green-500'
              }`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}