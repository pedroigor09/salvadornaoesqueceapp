interface MapHeaderProps {
  showVictimLights: boolean;
  onToggleVictimLights: () => void;
}

export function MapHeader({ showVictimLights, onToggleVictimLights }: MapHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-white text-2xl font-bold">Mapa Emocional de Salvador</h1>
        <p className="text-gray-400 text-sm">
          Cada ponto de luz representa uma vida perdida - Salvador brilha, mas carrega dor
        </p>
        <p className="text-blue-400 text-xs mt-1">
          📊 Dados baseados em estatísticas oficiais da SSP-BA • Distribuição proporcional por bairro
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleVictimLights}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            showVictimLights 
              ? 'bg-yellow-500 text-black font-medium' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {showVictimLights ? '✨ Luzes Acesas' : '💡 Acender Luzes'}
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-400 text-sm">Alto Risco</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-400 text-sm">Médio Risco</span>
        </div>
        {showVictimLights && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-sm">Vidas Perdidas</span>
          </div>
        )}
      </div>
    </div>
  );
}