"use client";

import { Shield, Building, Clock } from "lucide-react";

export function ServicesStats() {
  const stats = [
    { 
      number: "15", 
      label: "Delegacias especializadas na Bahia", 
      icon: <Shield className="h-8 w-8" /> 
    },
    { 
      number: "31", 
      label: "Cidades com CRAM ativo", 
      icon: <Building className="h-8 w-8" /> 
    },
    { 
      number: "24h", 
      label: "Atendimento disponível", 
      icon: <Clock className="h-8 w-8" /> 
    }
  ];

  return (
    <div className="py-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-light mb-8 text-white">
          Você Não Está Sozinha
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:border-purple-400/50 transition-all duration-500">
                <div className="text-purple-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}