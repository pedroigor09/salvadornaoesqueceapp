"use client";

import { ArrowRight, Users, Hand } from "lucide-react";

interface ActionCallProps {
  onShowServices?: () => void;
}

const SOCIAL_INITIATIVES = [
  {
    title: "Apoie uma Família",
    description: "Conecte-se com organizações locais",
    action: "Saiba mais",
    href: "https://apoia.se/ajudeumafamilia"
  },
  {
    title: "Seja Voluntário",
    description: "Participe de projetos sociais",
    action: "Participar",
    href: "https://casaibahia.org/"
  },
  {
    title: "Denuncie Violência",
    description: "Ajude a proteger sua comunidade",
    action: "Canais oficiais"
  }
];

export function ActionCall({ onShowServices }: ActionCallProps) {
  return (
    <div className="bg-gradient-to-r from-amber-900/30 via-orange-900/30 to-red-900/30 rounded-xl p-4 md:p-6 border border-amber-500/20 backdrop-blur-sm">
      <div className="text-center mb-4 md:mb-6">
        <div className="flex justify-center mb-2 md:mb-3">
          <div className="p-2 md:p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
            <Hand className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
        </div>
        <h3 className="text-white text-base md:text-lg font-semibold mb-1 md:mb-2">
          Quer ajudar a virar essa estatística?
        </h3>
        <p className="text-gray-300 text-xs md:text-sm">
          Pequenas ações fazem grandes diferenças em nossa comunidade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {SOCIAL_INITIATIVES.map((initiative, index) => (
          <ActionCard 
            key={index} 
            {...initiative} 
            onShowServices={index === 2 ? onShowServices : undefined}
          />
        ))}
      </div>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
  action: string;
  href?: string;
  onShowServices?: () => void;
}

function ActionCard({ title, description, action, href, onShowServices }: ActionCardProps) {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (onShowServices) {
      onShowServices();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gray-900/50 rounded-lg p-3 md:p-4 border border-gray-700/50 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-200 text-left group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="text-white text-xs md:text-sm font-medium mb-1">
            {title}
          </h4>
          <p className="text-gray-400 text-xs leading-tight">
            {description}
          </p>
        </div>
        <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
      </div>
      
      <div className="mt-2 md:mt-3">
        <span className="text-amber-400 text-xs font-medium">
          {action}
        </span>
      </div>
    </button>
  );
}