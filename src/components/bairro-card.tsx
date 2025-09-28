import { AlertTriangle, MapPin, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BairroInfo } from '@/types/bairros';

interface BairroCardProps {
  bairro: BairroInfo;
}

export function BairroCard({ bairro }: BairroCardProps) {
  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'alto':
        return 'bg-red-500';
      case 'medio':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getNivelLabel = (nivel: string) => {
    switch (nivel) {
      case 'alto':
        return 'Alto Risco';
      case 'medio':
        return 'Médio Risco';
      default:
        return 'Baixo Risco';
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-xl font-bold">{bairro.name}</h3>
          <Badge className={`${getNivelColor(bairro.nivel)} text-white mt-2`}>
            {getNivelLabel(bairro.nivel)}
          </Badge>
        </div>
        <MapPin className="h-6 w-6 text-gray-400" />
      </div>

      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
        {bairro.descricao}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-gray-400 text-sm">Homicídios</span>
          </div>
          <p className="text-white text-2xl font-bold">{bairro.homicidios}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-gray-400 text-sm">População</span>
          </div>
          <p className="text-white text-2xl font-bold">
            {bairro.populacao.toLocaleString('pt-BR')}
          </p>
        </div>

        <div className="space-y-2 col-span-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            <span className="text-gray-400 text-sm">Taxa por 100k habitantes</span>
          </div>
          <p className="text-white text-2xl font-bold">{bairro.taxa}</p>
        </div>
      </div>
    </div>
  );
}