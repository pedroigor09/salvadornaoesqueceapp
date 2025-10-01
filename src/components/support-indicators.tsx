"use client";

import { Shield, Phone, MapPin, Clock, Heart } from "lucide-react";

interface SupportIndicatorProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  count: number;
  description: string;
  color: string;
}

const SUPPORT_DATA: SupportIndicatorProps[] = [
  {
    icon: Shield,
    title: "CRAS Atendimentos",
    count: 1240,
    description: "famílias atendidas este mês",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Phone,
    title: "Linha de Apoio",
    description: "ligações de emergência atendidas",
    count: 850,
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: MapPin,
    title: "Pontos de Acolhimento",
    description: "locais de apoio ativos",
    count: 15,
    color: "from-green-500 to-emerald-500"
  }
];

export function SupportIndicators() {
  return (
    <div className="space-y-3 md:space-y-4">
      <h3 className="text-white text-base md:text-lg font-semibold flex items-center space-x-2">
        <Heart className="h-5 w-5 text-pink-400" />
        <span>Rede de Apoio Ativa</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {SUPPORT_DATA.map((item, index) => (
          <SupportCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

function SupportCard({ icon: Icon, title, count, description, color }: SupportIndicatorProps) {
  return (
    <div className="bg-gray-900/50 rounded-lg p-3 md:p-4 border border-gray-700/50 backdrop-blur-sm">
      <div className="flex items-center space-x-2 md:space-x-3 mb-2">
        <div className={`p-1.5 md:p-2 bg-gradient-to-r ${color} rounded-lg`}>
          <Icon className="h-3 w-3 md:h-4 md:w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-xs md:text-sm font-medium truncate">
            {title}
          </h4>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-lg md:text-xl font-bold text-white">
          {count.toLocaleString('pt-BR')}
        </p>
        <p className="text-gray-400 text-xs leading-tight">
          {description}
        </p>
      </div>
    </div>
  );
}